import { z } from "zod";
import { UIMessage as TUIMessage,UITools } from "ai";
import { GenerateImageUIToolInvocation } from "./tools/generate-image";

export const messageMetadataSchema = z.object({
  createdAt: z.number().optional(),
  model: z.string().optional(),
  totalTokens: z.number().optional(),
});
export type MessageMetadata = z.infer<typeof messageMetadataSchema>;
export type UIMessage = TUIMessage<MessageMetadata>;
export type Chat = {
  title: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  isPending?: boolean;
};
