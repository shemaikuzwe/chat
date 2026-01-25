import Chat from "~/components/chat";
import { generateChatId } from "~/lib/ai/utils";

export default function Home() {
  const chatId = generateChatId();
  return (
    <div className={"flex h-full w-full justify-center "}>
      <Chat chatId={chatId} initialMessages={[]} />
    </div>
  );
}
