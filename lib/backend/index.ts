import { baseProcedure, createTRPCRouter } from "./trpc/trpc";
import { getModels } from "../server/ai";
import { chatRouter } from "./api/chat";
import { userRouter } from "./api/user";
export const appRouter = createTRPCRouter({
  models: baseProcedure.query(() => {
    return getModels();
  }),
  chat: chatRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
