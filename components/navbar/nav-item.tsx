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
import { GitBranch, Loader2 } from "lucide-react";
import ChatOptionsMenu from "../chat-options";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import {
  ArchiveAction,
  DeleteDialog,
  PinAction,
  RenameDialog,
  ShareDialog,
} from "~/components/dialogs";
import { trpc, useTRPC } from "~/lib/backend/trpc/client";

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
              {chat.parentChatId && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 shrink-0"
                      asChild
                    >
                      <Link
                        href={`/chat/${chat.parentChatId}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitBranch className="w-3 h-3" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Branched from: {chat.parentChatTitle || "Untitled chat"}
                  </TooltipContent>
                </Tooltip>
              )}
              <span className="truncate">{text}</span>
              {chat?.isPending && (
                <Loader2 className="w-4 h-4 animate-spin ml-auto" />
              )}
            </Link>
          </SidebarMenuButton>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40 mx-3">
          <ContextMenuItem asChild>
            <PinAction chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <ArchiveAction chat={chat} />
          </ContextMenuItem>
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
