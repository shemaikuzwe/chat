"use client";

import { Streamdown } from "streamdown";

interface Props {
  isAnimating?: boolean;
  children: string;
}
export default function Markdown({ children, isAnimating }: Props) {
  return (
    <div>
      <Streamdown
        controls={{
          mermaid: {
            download: false,
          },
        }}
        isAnimating={isAnimating}
        className="max-w-3xl space-y-2"
      >
        {children}
      </Streamdown>
    </div>
  );
}
