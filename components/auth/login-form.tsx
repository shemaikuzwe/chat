"use client";
import { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

import { LoginCard } from "./login-card";

export function LoginForm({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <LoginCard setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
