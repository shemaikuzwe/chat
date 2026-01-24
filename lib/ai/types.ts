import { UIMessage as TUIMessage } from "ai";
import { z } from "zod";

import { chatStatus } from "../constants/chat";

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
  status: (typeof chatStatus)[number] | null;
  isPending?: boolean;
  parentChatId?: string | null;
  parentChatTitle?: string | null;
};
