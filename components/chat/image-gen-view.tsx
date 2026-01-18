import Image from 'next/image';
import { GenerateImageUIToolInvocation } from '~/lib/ai/tools/generate-image';
import { ImageSkeleton } from '../skeletons';

export default function ImageGenerationView({
  invocation,
}: {
  invocation: GenerateImageUIToolInvocation;
}) {
  switch (invocation.state) {
    case 'input-available':
      return (
        <ImageSkeleton />
      );
    case "output-error":
      return (
        <div className="mb-2 text-red-500">
          Error generating image
        </div>
      );
    case 'output-available':
      return (
        <div className="mb-2">
          <Image alt={"image"} width={500} height={500} src={invocation.output[0]?.url ?? ""} />
        </div>
      );
  }
} 