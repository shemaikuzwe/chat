import { openai } from '@ai-sdk/openai';
import { UIToolInvocation } from 'ai';
import Image from 'next/image';

export default function ImageGenerationView({
  invocation,
}: {
  invocation: UIToolInvocation<ReturnType<typeof openai.tools.imageGeneration>>;
}) {
  switch (invocation.state) {
    case 'input-available':
      return (
        <div className="mb-2 bg-gray-900 rounded-xl border border-gray-600 shadow-lg">
          Generating image...
        </div>
      );
    case 'output-available':
      return (
        <div className="mb-2 bg-gray-900 rounded-xl border border-gray-600 shadow-lg">
          <Image alt={"image"} width={500} height={500} src={`data:image/png;base64,${invocation.output.result}`} />
        </div>
      );
  }
}