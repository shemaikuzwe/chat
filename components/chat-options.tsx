"use client";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "./dialogs";
import type { Chat } from "~/lib/ai/types";
import { useTRPC } from "~/lib/backend/trpc/client";
import { SidebarMenuAction } from "./ui/sidebar";

export default function ChatOptionsMenu({ chat }: { chat: Chat }) {
  const trpc = useTRPC();

  const onSuccess = () => {
    trpc.chat.getUserChats.invalidate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <Ellipsis />
          <span className="sr-only">More</span>
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg w-32 mx-3 ">
        <DropdownMenuItem asChild>
          <ShareDialog chat={chat} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RenameDialog chat={chat} onSuccess={onSuccess} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteDialog chat={chat} onSuccess={onSuccess} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
