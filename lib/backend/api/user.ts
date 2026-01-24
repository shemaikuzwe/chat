import { eq } from "drizzle-orm";

import { db } from "~/lib/drizzle";
import { userPreferences } from "~/lib/drizzle/schema";
import { saveUserPreferences } from "~/lib/server";
import { customizationSchema } from "~/lib/types/schema";

import { protectedProcedure, router } from "../trpc/trpc";

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
