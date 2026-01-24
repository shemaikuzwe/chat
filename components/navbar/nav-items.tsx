import NavItem from "~/components/navbar/nav-item";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { groupChats } from "~/lib/utils";
import { ChevronRight, MessageSquarePlus } from "lucide-react";
import { ChatsSkeleton } from "../skeletons";
import { trpc } from "~/lib/backend/trpc/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function NavItems() {
  const { data: chats, isLoading } = trpc.chat.getUserChats.useQuery();
  const groupedChats = groupChats(chats || []);

  return (
    <>
      {isLoading ? (
        <SidebarGroup>
          <SidebarGroupContent className="list-none">
            <ChatsSkeleton />
          </SidebarGroupContent>
        </SidebarGroup>
      ) : chats && chats.length > 0 ? (
        <>
          {groupedChats.archived.length > 0 && (
            <Collapsible className="group/collapsible">
              <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full flex items-center gap-2">
                    Archived
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent className="list-none">
                    <SidebarMenu>
                      {groupedChats.archived.map((chat) => (
                        <NavItem key={chat.id} chat={chat} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )}
          {groupedChats.pinned.length > 0 && (
            <Collapsible className="group/collapsible">
              <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full flex items-center gap-2">
                    Pinned
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent className="list-none">
                    <SidebarMenu>
                      {groupedChats.pinned.map((chat) => (
                        <NavItem key={chat.id} chat={chat} />
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )}
          {groupedChats.today.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Today</SidebarGroupLabel>
              <SidebarGroupContent className="list-none">
                {groupedChats?.today
                  .sort(
                    (a, b) =>
                      new Date(b.updatedAt).getTime() -
                      new Date(a.updatedAt).getTime(),
                  )
                  .map((chat) => (
                    <NavItem key={chat.id} chat={chat} />
                  ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.yesterday.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Yesterday</SidebarGroupLabel>
              <SidebarGroupContent className="list-none">
                {groupedChats.yesterday.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.lastWeek.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Previous 7 Days</SidebarGroupLabel>
              <SidebarGroupContent className="list-none">
                {groupedChats.lastWeek.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.lastMonth.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Last Month</SidebarGroupLabel>
              <SidebarGroupContent className="list-none">
                {groupedChats.lastMonth.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          {groupedChats.older.length > 0 && (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Older Chats</SidebarGroupLabel>
              <SidebarGroupContent className="list-none">
                {groupedChats.older.map((chat) => (
                  <NavItem key={chat.id} chat={chat} />
                ))}
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </>
      ) : (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent className="list-none">
            <SidebarMenuItem>
              <SidebarMenuButton>
                <MessageSquarePlus size={20} />
                <span className="ml-2">No recent chats</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  );
}
