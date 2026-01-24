import { MessageSquarePlus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center  p-4 ">
      <Card className="mx-auto w-full  max-w-lg rounded-md border-0 bg-transparent shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="mb-2 text-4xl font-bold text-primary">404</CardTitle>
          <CardDescription className="text-2xl font-semibold">Not Found</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground">
            Oops! The chat you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link href="/">
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Start New Chat
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
