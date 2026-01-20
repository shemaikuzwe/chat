"use client";
import { Fragment } from "react";
import { SidebarMenuSkeleton } from "./ui/sidebar";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Separator } from "~/components/ui/separator";
import SearchInput from "./search";
export function ChatsSkeleton() {
  return (
    <Fragment>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuSkeleton key={index} />
      ))}
    </Fragment>
  );
}
function ChatItemSkeleton() {
  return (
    <Card className="rounded-md w-full">
      <CardTitle className="text-base py-1.5 px-2">
        <Skeleton className="h-6 w-3/4" />
      </CardTitle>
      <CardContent className="p-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between items-start mx-0 pb-0 px-2 pt-2">
        <div className="flex gap-1 text-sm items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-1 items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChatHistorySkeleton() {
  return (
    <div className="w-full flex flex-col gap-3  p-4 h-full overflow-auto">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-sm">
          <SearchInput
            searchTerm={""}
            setSearchTerm={() => {
              return;
            }}
            placeholder="Search Chat..."
            searchParams="chat"
            className="w-full"
          />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <ChatItemSkeleton key={index} />
      ))}
    </div>
  );
}

export default function UserSkelton() {
  return (
    <div className="w-full flex gap-2">
      <Skeleton className={"w-10 h-10 rounded-full"} />
      <div className="flex flex-col justify-center items-start  gap-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

export function ModelSelectorSkelton() {
  return <Skeleton className="h-10 w-30" />;
}

export function ImageSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-70 w-70" />
    </div>
  );
}

export function SessionSkeleton() {
  return (
    <div className="mt-4 rounded-lg border border-border/50 bg-card/50 p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

export function SessionsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <SessionSkeleton key={i} />
      ))}
    </div>
  );
}
