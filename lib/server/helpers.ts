import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { fileTypeFromBuffer } from "file-type";
import { UIMessage, convertToModelMessages, generateText, Output } from "ai";
import { z } from "zod";
import { UTApi } from "uploadthing/server";
import { google } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const utpapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, "5h"),
});

async function getChatTitle(messages: UIMessage[]) {
  const modelMessages = await convertToModelMessages(messages);
  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    system: `you are a chat title generator assistant  based The main context in chat messages.
    if you are given a chat message generate a small title for it`,
    messages: modelMessages,
    output: Output.text(),
  });
  return output;
}
async function getFileType(buffer: ArrayBuffer) {
  const fileType = await fileTypeFromBuffer(buffer);
  return fileType;
}

export { getChatTitle, getFileType };
