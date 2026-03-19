import { baseProcedure } from "../init";

export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});