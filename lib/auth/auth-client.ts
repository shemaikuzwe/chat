import { createAuthClient } from "better-auth/react";
import { lastLoginMethodClient } from "better-auth/client/plugins";

const { useSession, signIn, signOut, $Infer,getLastUsedLoginMethod } = createAuthClient({
  plugins: [lastLoginMethodClient()],
});
type Session = typeof $Infer.Session;

export { useSession, signIn, signOut, type Session,getLastUsedLoginMethod };
