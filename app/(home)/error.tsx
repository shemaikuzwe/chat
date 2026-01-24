"use client";
import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={"flex h-screen items-center justify-center"}>
      <div className="flex w-full max-w-xl  flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <Alert variant={"destructive"}>
            <AlertTitle className={"flex justify-center rounded-md"}>
              <TriangleAlert size={60} />
            </AlertTitle>
            <AlertDescription className={"mt-3 flex justify-center"}>
              <span className={"text-md"}>
                {"something went wrong our team is already notified"}
              </span>
            </AlertDescription>
          </Alert>

          <Button onClick={() => reset()} variant={"outline"}>
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
