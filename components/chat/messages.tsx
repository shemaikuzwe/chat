"use client";
import { RegenerateFunc } from "~/lib/types";
import Message from "./message";
import { SpinnerMessage } from "../ai/spinner-message";
import ButtonRow from "../ai/button-row";
import { UIMessage } from "~/lib/ai/types";
import { AssistantMessage } from "../ai/assistant-message";

interface MessageProps {
  messages: UIMessage[];
  error: Error | undefined;
  isLoading: boolean;
  regenerate: RegenerateFunc;
  ref: React.Ref<HTMLDivElement>;
}

export default function Messages({
  messages,
  error,
  isLoading,
  regenerate,
  ref,
}: MessageProps) {
  return (
    <div
      ref={ref}
      className={
        "w-full max-w-full flex flex-col gap-4 p-1 sm:p-5 md:p-4 lg:p-1"
      }
    >
      {messages.map((message) => (
        <div key={message.id} className={"flex flex-col w-full"}>
          {error && messages[messages.length - 1]?.id === message.id ? (
            <div className="flex flex-col w-full">
              <AssistantMessage
                isLoading={isLoading}
                className="text-red-500"
                regenerate={regenerate}
              >
                Unable to generate response. Please try again
              </AssistantMessage>

              {!isLoading ? (
                <ButtonRow message={message} reload={regenerate} content={""} />
              ) : null}
            </div>
          ) : (
            <Message
              loading={isLoading}
              message={message}
              regenerate={regenerate}
            />
          )}
        </div>
      ))}
      {isLoading && messages[messages.length - 1].role === "user" && (
        <div className="flex flex-col w-full">
          <SpinnerMessage />
        </div>
      )}
    </div>
  );
}
