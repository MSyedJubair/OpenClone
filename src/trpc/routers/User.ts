import { baseProcedure, createTRPCRouter } from '../init';

export const userRouter = createTRPCRouter({
  getUser: baseProcedure.query(({ ctx }) => {
    return ctx.user
  })
});