import { Loader2 } from "lucide-react";

import { AssitantIcon } from "~/components/ui/icons";

import { Button } from "../ui/button";
export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="animate-fade-in  flex w-full flex-row items-center space-x-2  opacity-100 transition-opacity delay-500 duration-1000">
        <div className="flex size-[24px] shrink-0 animate-pulse items-center justify-center rounded-md bg-primary  text-primary-foreground shadow-xs select-none">
          <AssitantIcon />
        </div>
        <div className="ml-2 flex h-[24px] flex-1 animate-pulse flex-row items-center space-y-2 overflow-hidden px-1">
          Chat is thinking...
        </div>
      </div>
    </div>
  );
}

interface LoadingButtonProps {
  stop: () => void;
}

export function LoadingButton({ stop }: LoadingButtonProps) {
  return (
    <Button
      variant={"default"}
      onClick={stop}
      className="flex h-9 w-9  cursor-pointer items-center justify-center rounded-lg  shadow-none"
    >
      <Loader2 className="h-4 w-4 animate-spin" />
    </Button>
  );
}
