"use client";

import type { SocialProvider } from "better-auth";
import { Github, Loader2 } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { signIn } from "~/lib/auth/auth-client";

import { Badge } from "../ui/badge";

type Props = {
  name: SocialProvider;
  lastUsed?: boolean;
};
export default function Provider({ name, lastUsed }: Props) {
  const [isPending, startTransition] = useTransition();
  const login = () => {
    startTransition(async () => {
      await signIn.social({ provider: name });
    });
  };
  return (
    <div className="relative w-full">
      <Card className="flex w-full gap-2 rounded-md shadow-none">
        <input type={"hidden"} name={"provider"} value={name} />
        <Button
          onClick={login}
          disabled={isPending}
          variant={"outline"}
          size={"lg"}
          className={"flex w-full gap-2 p-3"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {name === "google" ? (
            <Image src={"/Google.png"} width={35} alt={"google"} height={35} />
          ) : (
            <Github className="size-14" />
          )}
          Continue with {name}
        </Button>
      </Card>
      {lastUsed && (
        <Badge className="absolute -top-2.5 -right-2 z-10 rounded-full border-2 border-background px-2 py-0.5 text-[10px] font-medium shadow-sm">
          Last
        </Badge>
      )}
    </div>
  );
}
