import prisma from "@/lib/db";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const generateSummary = inngest.createFunction(
  {
    id: "generateSummary", 
    retries: 2, 
    onFailure: async ({ event, error }) => {
      const originalEvent = event.data.event;
      const projectId = originalEvent.data.projectId;

      await prisma.project.update({
        where: {
          id: Number(projectId)
        },
        data: {
          status: 'failed'
        }
      })
    }
  },
  { event: "project/generate" },
  async ({ event, step }) => {
    const { userReq, projectId } = event.data;

    const systemPrompt = `
      You are an expert React developer. 
      Generate a project structure for Sandpack using Tailwind CSS. 

      IMPORTANT: Return ONLY a valid JSON object. 
      Do not include explanations or markdown outside the JSON block.

      Return ONLY a JSON object with:
      1. "name": project name
      2. "description": A descriptive summary of the project
      3. "files": an object where keys are filenames (e.g., "/App.js") and values are the code strings.
      
      Structure:
      {
        "name": "string",
        "description": "string",
        "files": {
            "/App.js": "source code string",
            "/components/header.ts": "header code string"
          }
      }

      Note: Ensure all code strings are properly escaped for JSON. Use double quotes for JSON keys/values and escape internal quotes in the code.
    `;

    const response = await step.run("generate-gemini-content", async () => {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", // Double check your model string too!
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userReq }] }],
        generationConfig: { responseMimeType: "application/json" },
      });

      console.log(result);

      return JSON.parse(result.response.text());
    });

    await step.run("update-db-project", async () => {
      return await prisma.project.update({
        where: { id: Number(projectId) },
        data: {
          name: response.name,
          description: response.description,
          files: response.files,
          status: "completed",
        },
      });
    });

    // 3. Create Message
    await step.run("create-chat-message", async () => {
      const chat = await prisma.chat.findUnique({
        where: { projectId: Number(projectId) },
      });

      await prisma.message.create({
        data: {
          chatId: chat!.id,
          text: response.description,
          role: "Ai",
        },
      });
    });
    
    // Testing....
    // await step.run("update-db-project", async () => {
    //   return await prisma.project.update({
    //     where: { id: Number(projectId) },
    //     data: {
    //       status: "completed",
    //     },
    //   });
    // });

    // // 3. Create Message
    // await step.run("create-chat-message", async () => {
    //   const chat = await prisma.chat.findUnique({
    //     where: { projectId: Number(projectId) },
    //   });

    //   await prisma.message.create({
    //     data: {
    //       chatId: chat!.id,
    //       text: 'Hell yeah...',
    //       role: "Ai",
    //     },
    //   });
    // });

    return { success: true };
  },
);
