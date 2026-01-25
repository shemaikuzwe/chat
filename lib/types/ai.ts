import { z } from "zod";

const uiMessageSchema = z.object({
  id: z.string(),
  parts: z.array(z.literal("string")),
  role: z.enum(["user", "assistant", "system"]),
  metadata: z.any().optional(),
});
const chatSchema = z.object({
  id: z.string(),
  message: z.any(),
  trigger: z.enum(["regenerate-message", "submit-message"]),
  messageId: z.string().optional(),
  search: z.boolean().optional(),
});

export { chatSchema };
