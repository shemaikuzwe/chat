import "server-only";
import { cacheTag } from "next/cache";
import { db } from "../drizzle";
import { eq, or } from "drizzle-orm";
import { model as modelSchema } from "../drizzle/schema";

export async function getModels() {
  "use cache";
  cacheTag("models");
  const models = await db.query.model.findMany();
  return models;
}
export async function getModelByIdOrDefault(id: string | undefined) {
  const model = await db.query.model.findFirst({
    where: or(eq(modelSchema.id, id ?? ""), eq(modelSchema.isDefault, true)),
  });
  return model;
}
