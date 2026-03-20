import z from "zod";
import { createTRPCRouter } from "../init";
import { protectedProcedure } from "./ProtectedProcedure";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const aiRouter = createTRPCRouter({
  // Get summary when running the project for the first time. This will be done based on the first prompt of the user
  // This will generate name, desc and the basic file
  getSummary: protectedProcedure
    .input(
      z.object({
        userReq: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `
          You are an expert React developer. 
          Generate a project structure for Sandpack. 

          IMPORTANT: Return ONLY a valid JSON object. 
          Do not include explanations or markdown outside the JSON block.

          Return ONLY a JSON object with:
          1. "name": project name
          2. "description": short summary
          3. "files": an object where keys are filenames (e.g., "/App.js") and values are the code strings.
          
          Structure:
          {
            "name": "string",
            "description": "string",
            "files": {
                "/App.js": "source code string",
                "/styles.css": "css string"
              }
          }

          Note: Ensure all code strings are properly escaped for JSON. Use double quotes for JSON keys/values and escape internal quotes in the code.
        `,
      });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: input.userReq }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const response = await JSON.parse(result.response.text());

      // Edit the Project
      const project = await ctx.prisma.project.update({
        where: {
          id: Number(input.projectId),
        },
        data: {
          name: response.name,
          description: response.description,
          files: response.files,
        },
      });

      console.log(response);

      return response;
    }),

  editCode: protectedProcedure
    .input(
      z.object({
        prevCode: z.string(),
        userReq: z.string(),
        projectId: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: `
          You are an expert React developer. 
          Your task is to edit existing code based on user requirements. Maintain the existing code's style and logic unless the user explicitly asks to change it.

          IMPORTANT: Return ONLY a valid JSON object. 
          Do not include explanations or markdown outside the JSON block.

          Return ONLY a JSON object with:
          1. "summary": short summary of what you have done
          2. "files": an object where keys are filenames (e.g., "/App.js") and values are the code strings.
          
          Structure:
          {
            "summary": "string",
            "files": {
                "/App.js": "source code string",
                "/styles.css": "css string"
              }
          }

          Note: Ensure all code strings are properly escaped for JSON. Use double quotes for JSON keys/values and escape internal quotes in the code.
        `,
      });
      const result = await model.generateContent({
        contents: [{
          role: "user", 
          parts: [{
              text: `Current Code:\n${input.prevCode}\n\nUser Request:\n${input.userReq}`
            }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const response = await JSON.parse(result.response.text());

      // Edit the Project
      const project = await ctx.prisma.project.update({
        where: {
          id: Number(input.projectId),
        },
        data: {
          files: response.files,
        },
      });

      return response
    }),
});
