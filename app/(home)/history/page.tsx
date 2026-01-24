import { Suspense } from "react";

import ChatHistory from "~/components/chat-history";
import { ChatHistorySkeleton } from "~/components/skeletons";

import { getUserChats } from "../../../lib/server";

export const metadata = {
  title: "Chats History",
  description: "Recent chats",
};

export default function Page() {
  const chats = getUserChats();

  return (
    <Suspense fallback={<ChatHistorySkeleton />}>
      <ChatHistory chatsPromise={chats} />
    </Suspense>
  );
}
