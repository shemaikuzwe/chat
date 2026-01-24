import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { LanguageModel, extractReasoningMiddleware, gateway, wrapLanguageModel } from "ai";
import React from "react";

import { DeepSeek, OpenAI, Anthropic, Google, OpenRouter } from "~/components/ui/icons";

import { modelTypes, providers } from "../constants/models";

export interface Model {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  model: LanguageModel;
  isDefault?: boolean;
  isPremium?: boolean;
}

function withMiddleware<T extends Exclude<LanguageModel, string>>(model: T) {
  return wrapLanguageModel({
    model: model,
    middleware: [extractReasoningMiddleware({ tagName: "think" })],
  });
}
export const ModelIcons = {
  open_ai: OpenAI,
  google: Google,
  anthropic: Anthropic,
  deepseek: DeepSeek,
  grok: OpenRouter,
  mini_max: OpenRouter,
  moonshot: OpenRouter,
  zai: OpenRouter,
} satisfies Record<(typeof modelTypes)[number], React.FC>;

export const modelProvider = {
  google: (name: string) => withMiddleware(google(name)),
  qroq: (name: string) => withMiddleware(groq(name)),
  anthropic: (name: string) => openrouter.chat(name), // TODO:add anthropic ai sdk
  open_router: (name: string) => withMiddleware(openrouter.chat(name)),
  open_ai: (name: string) => gateway(name),
  vercel: (name: string) => gateway(name),
  bedrock: (name: string) => gateway(name),
  qrok: (name: string) => gateway(name),
} satisfies Record<(typeof providers)[number], (name: string) => LanguageModel>;
