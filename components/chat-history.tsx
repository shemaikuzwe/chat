"use client";
import { MoveRight, Search } from "lucide-react";
import Link from "next/link";
import { use } from "react";

import ChatItem from "~/components/chat-item";
import { Chat, User } from "~/lib/drizzle";
import useSearch from "~/lib/hooks/use-search";

import SearchInput from "./search";
import { Button } from "./ui/button";
interface Props {
  chatsPromise: Promise<Array<Chat & { user: User }>>;
}
export default function ChatHistory({ chatsPromise }: Props) {
  const initialChats = use(chatsPromise);

  const [searchText, setSearchText, chats] = useSearch(initialChats, {
    predicate: (item, query) => {
      return item.title.toLocaleLowerCase().includes(query);
    },
    debounce: 400,
    searchParams: "chat",
  });

  return (
    <div className="flex h-full w-full flex-col  gap-3 overflow-auto p-4">
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <SearchInput
            searchTerm={searchText}
            setSearchTerm={setSearchText}
            placeholder="Search Chat..."
            searchParams="chat"
            className="w-full"
          />
        </div>
      </div>
      {chats && chats.length > 0 ? (
        chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)
      ) : (
        <div className="flex h-full max-h-50 w-full flex-col items-center justify-center">
          <Search className="h-12 w-12" />
          <span className="mt-2 text-lg font-semibold">No Recent Chats Found </span>
          <Button variant={"default"} className="mt-2" asChild>
            <Link href={"/"} className="flex items-center gap-1">
              Start New Chat <MoveRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
