import { initTRPC, TRPCError } from "@trpc/server";

import { getSession } from "~/lib/auth";

const t = initTRPC.create();
export const createTRPCContext = () => ({});
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await getSession();
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }
  return next({ ctx: { ...ctx, auth: session } });
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
