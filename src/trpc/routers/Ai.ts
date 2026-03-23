import z from "zod";
import { createTRPCRouter } from "../init";
import { protectedProcedure } from "./ProtectedProcedure";
import { inngest } from "@/inngest/client";

export const aiRouter = createTRPCRouter({
  editCode: protectedProcedure
    .input(
      z.object({
        userReq: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.project.update({
        where: { id: Number(input.projectId) },
        data: { status: "processing" },
      });

      await inngest.send({
        name: "project/create",
        data: {
          userReq: input.userReq,
          projectId: input.projectId,
        },
      });

      return { status: "processing" };
    }),
  // Get summary when running the project for the first time. This will be done based on the first prompt of the user
  // This will generate name, desc and the basic file
  getAiSum: protectedProcedure
    .input(
      z.object({
        userReq: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 👇 mark as processing
      await ctx.prisma.project.update({
        where: { id: Number(input.projectId) },
        data: { status: "processing" },
      });

      // 👇 send background event
      await inngest.send({
        name: "project/generate",
        data: {
          userReq: input.userReq,
          projectId: input.projectId,
        },
      });

      // 👇 return immediately
      return { status: "processing" };
    }),

  getAiResponse: protectedProcedure
    .input(
      z.object({
        userReq: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // mark project as processing
      await ctx.prisma.project.update({
        where: { id: Number(input.projectId) },
        data: { status: "processing" },
      });

      // get messages
      const chat = await ctx.prisma.chat.findUnique({
        where: {
          projectId: Number(input.projectId),
        },
      });
      const messages = await ctx.prisma.message.findMany({
        where: {
          chatId: chat?.id,
        },
      });

      // send background event
      if (messages.length > 2) {
        // edit code
        await inngest.send({
          name: "project/edit",
          data: {
            userReq: input.userReq,
            projectId: input.projectId,
          },
        });
      } else {
        // generate the initial
        await inngest.send({
          name: "project/generate",
          data: {
            userReq: input.userReq,
            projectId: input.projectId,
          },
        });
      }

      return { status: "processing" };
    }),
});
