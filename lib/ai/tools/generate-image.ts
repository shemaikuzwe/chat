import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { UIToolInvocation, tool, generateImage } from 'ai';
import { z } from 'zod';

export const generateImageTool = tool({
  description: 'Generate an image',
  inputSchema: z.object({
    prompt:z.string().min(1),
  }),
  async execute({prompt}) {
    const result = await generateImage({
      model:google("gemini-2.5-flash-image-preview"),
      prompt,
    });

    return {
      mediaType: result.image.mediaType,
      base64: result.image.base64,
    };
  },
  toModelOutput: ({ output: { mediaType, base64 } }) => ({
    type: 'content',
    value: [{ type: 'image-data', data: base64, mediaType }],
  }),
});

export type GenerateImageUIToolInvocation = UIToolInvocation<
  typeof generateImageTool
>;