import { TriangleAlert } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AssitantIcon } from "~/components/ui/icons";
export const metadata: Metadata = {
  title: "ChatBot-Error",
  description: "error page",
};
export default async function Page(props: { searchParams: Promise<{ error: string }> }) {
  const searchParams = await props.searchParams;
  const { error } = searchParams;
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto w-full max-w-xl rounded-md">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl">
            <div className="rounded-md bg-primary text-primary-foreground">
              <AssitantIcon size={50} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Alert variant={"destructive"}>
                  <AlertTitle className={"flex justify-center rounded-md"}>
                    <TriangleAlert size={60} />
                  </AlertTitle>
                  <AlertDescription className={"mt-3 flex justify-center"}>
                    <span className={"text-md"}>{error || "something went wrong"} Error</span>
                  </AlertDescription>
                </Alert>
                <div className="flex w-full justify-center">
                  <Button asChild variant={"outline"} className="w-full max-w-sm">
                    <Link href="/?login=true">Login Again</Link>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
