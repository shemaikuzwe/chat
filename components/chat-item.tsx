"use client";
import { Ellipsis } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Chat, User } from "~/lib/drizzle";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { IconUser } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { formatTime } from "~/lib/utils";

import ChatOptions from "./chat-options";
import { DeleteDialog, RenameDialog, ShareDialog } from "./dialogs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  chat: Chat & { user: User };
}
export default function ChatItem({ chat }: Props) {
  const formatedDate = formatTime(new Date(chat.updatedAt));
  const firstMessage = chat.messages[0].parts
    .map((part) => part.type === "text" && part.text)
    .join("")
    .slice(0, 200);
  const content = typeof firstMessage === "string" ? firstMessage : chat.title;
  const router = useRouter();
  return (
    <Card className="w-full rounded-md">
      <CardTitle className="px-2 py-1.5 text-base">{chat.title}</CardTitle>
      <CardContent className="cursor-pointer p-2 " onClick={() => router.push(`chat/${chat.id}`)}>
        <span className="text-sm text-muted-foreground">{content}</span>
      </CardContent>
      <Separator />
      <CardFooter className="mx-0 flex items-start justify-between px-2 pt-2 pb-0">
        <div className="flex items-center gap-1 text-sm">
          <IconUser className="h-6 w-6" /> {chat.user.name}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Last Updated {formatedDate}</span>
          <ChatOptions chat={chat} />
        </div>
      </CardFooter>
    </Card>
  );
}
