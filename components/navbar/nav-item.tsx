"use client";
import Link from "next/link";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useAnimatedText, useLocalStorage } from "~/lib/hooks";
import { Chat } from "~/lib/ai/types";
import { Loader2 } from "lucide-react";
import ChatOptionsMenu from "../chat-options";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "../dialogs";

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const pathname = usePathname();
  const path = `/chat/${chat.id}`;
  const isActive = pathname === path;
  const [newChat, setNewChat] = useLocalStorage<string | null>("chatId", null);
  const animate = chat.id === newChat;

  const [text] = useAnimatedText(chat?.title || "New chat", {
    shouldAnimate: animate,
    duration: 1,
    onComplete() {
      setNewChat(null);
    },
  });
  return (
    <SidebarMenuItem>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            className="group/chat-item"
          >
            <Link href={path}>
              <span className="truncate">{text}</span>
              {chat?.isPending && (
                <Loader2 className="w-4 h-4 animate-spin ml-auto" />
              )}
            </Link>
          </SidebarMenuButton>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-32 mx-3">
          <ContextMenuItem asChild>
            <RenameDialog chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <ShareDialog chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <DeleteDialog chat={chat} />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <ChatOptionsMenu chat={chat} />
    </SidebarMenuItem>
  );
}
