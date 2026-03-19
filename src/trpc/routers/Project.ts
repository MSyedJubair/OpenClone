import z from "zod";
import { createTRPCRouter } from "../init";
import { protectedProcedure } from "./ProtectedProcedure";

export const projectRouter = createTRPCRouter({
  newProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          files: {
            "/App.js": `export default function App() {
                    return (
                        <div className="flex flex-col items-center justify-center min-h-screen bg-[#09090b] text-white p-4">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25"></div>
                            <h1 className="relative text-5xl font-bold mb-4 tracking-tighter">lovable.ai</h1>
                        </div>
                        <p className="text-zinc-400 font-medium">Resizable & Collapsible Sidebar Ready.</p>
                        </div>
                    );
                }`,
          },
          authorId: ctx.user.id,
        },
      });
      // 2. Initialize an empty chat for this project
      await ctx.prisma.chat.create({
        data: {
          projectId: project.id,
        },
      });

      return project
    }),
  
  getProject: protectedProcedure
  .input(
    z.object({
      projectId: z.number()
    })
  )
  .query(async ({ ctx, input }) => {
    const project = await ctx.prisma.project.findUnique({
      where: {
        id: input.projectId
      }
    })

    return project
  })
});
