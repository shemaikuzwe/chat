import { saveUserPreferences } from "~/lib/server";
import { protectedProcedure, router } from "../trpc/trpc";
import { customizationSchema } from "~/lib/types/schema";
import { db } from "~/lib/drizzle";
import { eq } from "drizzle-orm";
import { userPreferences } from "~/lib/drizzle/schema";

export const userRouter = router({
  saveUserPreferences: protectedProcedure
    .input(customizationSchema)
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      await saveUserPreferences(auth.user.id, input);
    }),
  getUserPreferences: protectedProcedure.query(async ({ ctx }) => {
    const auth = ctx.auth;
    const preferences = await db.query.userPreferences.findFirst({
      where: eq(userPreferences.userId, auth.user.id),
    });
    return preferences;
  }),
});
