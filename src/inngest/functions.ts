import prisma from "@/lib/db";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Pusher from "pusher";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

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
          id: Number(projectId),
        },
        data: {
          status: "failed",
        },
      });
    },
  },
  { event: "project/generate" },
  async ({ event, step }) => {
    const { userReq, projectId } = event.data;

    const systemPrompt = `
      You are an expert React developer. 
      Generate a project structure for Sandpack using Tailwind CSS. 
      Make sure the design is modern and the code is responsive across all devices.

      IMPORTANT: Return ONLY a valid JSON object. 
      Do not include explanations or markdown outside the JSON block.

      Return ONLY a JSON object with:
      1. "name": project name
      2. "description": A descriptive summary of the project
      3. "files": an object where keys are filenames (e.g., "/App.js") and values are the code strings.

      Rules:
      - Only use React
      - Only use Tailwind
      - Don't use ./src directory
      - Only use Tailwind
      
      Structure:
      {
        "name": "string",
        "description": "string",
        "files": {
            "/App.jsx": "source code string",
            "/components/header.jsx": "header code string"
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
          text: "Created " + response.description,
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

    await pusher.trigger(`project-${projectId}`, "refetch-code", {
      message: "Generation complete",
    })
    

    return { success: true };
  },
);

export const editCode = inngest.createFunction(
  {
    id: "editCode",
    retries: 2,
    onFailure: async ({ event, error }) => {
      const originalEvent = event.data.event;
      const projectId = originalEvent.data.projectId;

      await prisma.project.update({
        where: {
          id: Number(projectId),
        },
        data: {
          status: "failed",
        },
      });
    },
  },
  { event: "project/edit" },
  async ({ event, step }) => {
    const { userReq, projectId } = event.data;

    const systemPrompt = `
      You are an expert React developer. 
      Your task is to edit existing code based on user requirements. Maintain the existing code's style and logic unless the user explicitly asks to change it.

      Generate a project structure for Sandpack using Tailwind CSS. 
      Make sure the design is modern and the code is responsive across all devices.

      IMPORTANT: Return ONLY a valid JSON object. 
      Do not include explanations or markdown outside the JSON block.
      
      Rules:
      - Only use React
      - Only use Tailwind
      - Only use Tailwind

      Return ONLY a JSON object with:
      1. "summary": short summary of what you have done
      2. "files": an object where keys are filenames (e.g., "/App.js") and values are the code strings.
      
      Structure:
      {
        "summary": "string",
        "files": {
            "/App.jsx": "source code string",
            "/components/header.jsx": "header code string"
          }
      }

      Note: Ensure all code strings are properly escaped for JSON. Use double quotes for JSON keys/values and escape internal quotes in the code.
    `;

    const response = await step.run("generate-gemini-content", async () => {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt,
      });

      const project = await prisma.project.findUnique({
        where: {
          id: Number(projectId),
        },
      });

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Current Code:\n${JSON.stringify(project?.files)}\n\nUser Request:\n${userReq}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const response = await JSON.parse(result.response.text());
      return response;
    });

    // Edit the Project
    await step.run("update-project-status", async () => {
      await prisma.project.update({
        where: {
          id: Number(projectId),
        },
        data: {
          files: response.files,
          status: "completed",
        },
      });
    });

    // Create the msg
    await step.run("create-chat-message", async () => {
      const chat = await prisma.chat.findUnique({
        where: { projectId: Number(projectId) },
      });

      await prisma.message.create({
        data: {
          chatId: chat!.id,
          text: response.summary,
          role: "Ai",
        },
      });
    });

    // Testing....
    // await step.run("update-project-status", async () => {
    //   await prisma.project.update({
    //     where: {
    //       id: Number(projectId),
    //     },
    //     data: {
    //       status: "completed",
    //     },
    //   });
    // });

    // // Create the msg
    // await step.run("create-chat-message", async () => {
    //   const chat = await prisma.chat.findUnique({
    //     where: { projectId: Number(projectId) },
    //   });

    //   await prisma.message.create({
    //     data: {
    //       chatId: chat!.id,
    //       text: 'Yoooo',
    //       role: "Ai",
    //     },
    //   });
    // });

    await pusher.trigger(`project-${projectId}`, "refetch-code", {
      message: "Generation complete",
    })

    return { success: true };
  },
);
