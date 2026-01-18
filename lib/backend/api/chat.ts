import { protectedProcedure, router } from "~/lib/backend/trpc/trpc";
import { getChatById, getChats } from "~/lib/server";
import { z } from "zod";
import { db } from "~/lib/drizzle";
import { chats } from "~/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const chatRouter = router({
  getUserChats: protectedProcedure.query(async ({ ctx }) => {
    const auth = ctx.auth;
    const chats = await getChats(auth.user.id);
    return chats;
  }),
  getChatById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const chat = await getChatById(id);
      return chat;
    }),
  deleteChat: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id } = input;
      await db
        .delete(chats)
        .where(and(eq(chats.id, id), eq(chats.userId, auth.user.id)));
    }),
  updateTitle: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id, title } = input;
      await db
        .update(chats)
        .set({ title })
        .where(and(eq(chats.id, id), eq(chats.userId, auth.user.id)));
    }),
});
