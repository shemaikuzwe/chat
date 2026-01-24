import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool as any, schema });

type Chat = typeof schema.chats.$inferSelect;
type User = typeof schema.user.$inferSelect;
type Account = typeof schema.account.$inferSelect;
type Model = typeof schema.model.$inferSelect;
type UserPreferences = typeof schema.userPreferences.$inferSelect;

export { db, type Chat, type User, type Account, type Model, type UserPreferences };
