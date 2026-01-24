import { webSearch } from "@exalabs/ai-sdk";
import { convertToModelMessages, generateId, stepCountIs, streamText } from "ai";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { after, NextResponse } from "next/server";
import { createResumableStreamContext } from "resumable-stream/ioredis";

import { modelProvider } from "~/lib/ai/models";
import { systemPrompt } from "~/lib/ai/prompt";
import { generateImageTool } from "~/lib/ai/tools/generate-image";
import { generateMessageId } from "~/lib/ai/utis";
import { getSession } from "~/lib/auth";
import { getChatById, getUserPreferences, saveChatData } from "~/lib/server";
import { getModelByIdOrDefault } from "~/lib/server/ai";
import { chatSchema } from "~/lib/types/ai";

export const maxDuration = 300;
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedBody = chatSchema.parse(body);
    const session = await getSession();

    const { id, message, trigger, messageId, search } = parsedBody;

    console.log("search", search);
    const cookieStore = await cookies();
    const modelId = cookieStore.get("model.id")?.value;
    const model = await getModelByIdOrDefault(modelId);
    if (!model) return NextResponse.json("Unimplemented", { status: 405 });

    const chat = await getChatById(id);
    const userPreferences = await getUserPreferences(session?.user.id);
    let messages = chat?.messages ?? [];
    if (trigger === "submit-message") {
      messages = [...messages, message];
    }
    if (trigger === "regenerate-message") {
      const messageIndex =
        messageId == null
          ? messages.length - 1
          : messages.findIndex((message) => message.id === messageId);

      if (messageIndex === -1) {
        throw new Error(`message ${messageId} not found`);
      }
      messages = messages.slice(
        0,
        messages[messageIndex].role === "assistant" ? messageIndex : messageIndex + 1,
      );
    }
    const coreMessage = await convertToModelMessages(messages);

    await saveChatData({
      id: id,
      messages: messages,
      streamId: null,
    });
    const result = streamText({
      model: modelProvider[model.provider](model.model),
      messages: coreMessage,
      system: systemPrompt({
        tools: [
          { name: "web_search", description: "Search the web for information" },
          { name: "generate_image", description: "Generate an image" },
        ],
        userPreferences,
      }),
      tools: {
        web_search: webSearch({ numResults: 5 }),
        generate_image: generateImageTool,
      },
      stopWhen: stepCountIs(10),
      activeTools: ["web_search", "generate_image"],
    });

    return result.toUIMessageStreamResponse({
      generateMessageId: generateMessageId,
      originalMessages: messages,
      messageMetadata: ({ part }) => {
        if (part.type === "start") {
          return {
            createdAt: Date.now(),
            model: model?.name,
          };
        }
        if (part.type === "finish") {
          console.log("total tokens:", part.totalUsage.totalTokens);
          console.log("output tokens:", part.totalUsage.outputTokens);
          console.log("Input tokens:", part.totalUsage.inputTokens);
          console.log("reasoning tokens:", part.totalUsage.outputTokenDetails);
          console.log("finish reason", part.finishReason);

          return {
            totalTokens: part.totalUsage.outputTokens,
          };
        }
      },
      onFinish: async ({ messages }) => {
        //generete title when model is done
        await saveChatData({
          id,
          messages,
          streamId: null,
          generateTitle: true,
        });
      },
      async consumeSseStream({ stream }) {
        const streamId = generateId();
        const streamContext = createResumableStreamContext({
          waitUntil: after,
        });
        await streamContext.createNewResumableStream(streamId, () => stream);
        await saveChatData({ id, streamId: streamId });
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
