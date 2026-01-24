"use client";
import Link from "next/link";
import React, { Suspense } from "react";

import { useSession } from "~/lib/auth/auth-client";

import { LoginForm } from "../auth/login-form";
import UserSkelton from "../skeletons";
import { Button } from "../ui/button";
import { AssitantIcon } from "../ui/icons";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

import NavItems from "./nav-items";
import NavLinks from "./nav-links";
import UserButton from "./user";

export default function NavContent() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const session = useSession();
  const isPending = session.isPending;
  const isLoggedIn = !!session?.data;
  return (
    <Sidebar
      data-collapsed={collapsed}
      variant="sidebar"
      collapsible={"icon"}
      className="group px-0"
    >
      <SidebarHeader className="space-y-2 border-b p-2">
        <Link href={"/"} className="flex items-center gap-1">
          <div className="size rounded-md bg-primary p-0.5 text-primary-foreground">
            <AssitantIcon size={28} />
          </div>

          <span className="text-center text-xl font-semibold group-data-[collapsible=icon]:hidden">
            Chat
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {isPending ? null : isLoggedIn ? (
          <ScrollArea className="grow">
            <NavLinks />
            <NavItems />
          </ScrollArea>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem className="mt-5 text-center">Login to save chats</SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarContent>
      <SidebarFooter className="gap-2 border-t">
        {isPending ? (
          <UserSkelton />
        ) : isLoggedIn ? (
          <Suspense fallback={null}>
            <UserButton session={session?.data} />
          </Suspense>
        ) : (
          <div className="flex w-full gap-2">
            <LoginForm>
              <Button className="w-full max-w-xs" variant={"outline"}>
                Login
              </Button>
            </LoginForm>
            <LoginForm>
              <Button className="w-full max-w-xs">Register</Button>
            </LoginForm>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
