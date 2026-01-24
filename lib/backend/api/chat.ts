import { protectedProcedure, router } from "~/lib/backend/trpc/trpc";
import { getChatById, getChats } from "~/lib/server";
import { z } from "zod";
import { db } from "~/lib/drizzle";
import { chats } from "~/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { generateChatId } from "~/lib/ai/utis";
import { chatStatus } from "~/lib/constants/chat";

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
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(chatStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id, status } = input;
      await db
        .update(chats)
        .set({ status })
        .where(and(eq(chats.id, id), eq(chats.userId, auth.user.id)));
    }),
  branchChat: protectedProcedure
    .input(z.object({ id: z.string(), messageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id, messageId } = input;

      const chat = await getChatById(id);
      if (!chat || chat.userId !== auth.user.id) {
        throw new Error("Chat not found");
      }

      const messageIndex = chat.messages.findIndex((m) => m.id === messageId);
      if (messageIndex === -1) {
        throw new Error("Message not found");
      }

      const branchedMessages = chat.messages.slice(0, messageIndex + 1);
      const newChatId = generateChatId();

      await db.insert(chats).values({
        id: newChatId,
        title: chat.title,
        userId: auth.user.id,
        messages: branchedMessages,
        parentChatId: id,
      });

      return { id: newChatId };
    }),
});
