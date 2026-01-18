import { baseProcedure, createTRPCRouter } from "./trpc/trpc";
import { getModels } from "../server/ai";
import { chatRouter } from "./api/chat";
export const appRouter = createTRPCRouter({
  models: baseProcedure.query(() => {
    return getModels();
  }),
  chat:chatRouter
});

export type AppRouter = typeof appRouter;
