import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

import { appRouter } from "~/lib/backend";
import { createTRPCContext } from "~/lib/backend/trpc/trpc";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
