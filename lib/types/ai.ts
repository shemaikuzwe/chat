import { z } from "zod";

const chatSchema = z.object({
  id: z.string(),
  message: z.any(),
  trigger: z.enum(["regenerate-message", "submit-message"]),
  messageId: z.string().optional(),
  search: z.boolean().optional(),
});

export { chatSchema };
