import { createAuthClient } from "better-auth/react";
import { lastLoginMethodClient } from "better-auth/client/plugins";

const {
  useSession,
  signIn,
  signOut,
  $Infer,
  getLastUsedLoginMethod,
  listSessions,
  revokeSession,
  revokeOtherSessions,
} = createAuthClient({
  plugins: [lastLoginMethodClient()],
});
type Session = typeof $Infer.Session;
type TSession = typeof $Infer.Session.session;

export {
  useSession,
  signIn,
  signOut,
  type Session,
  getLastUsedLoginMethod,
  listSessions,
  type TSession,
  revokeSession,
  revokeOtherSessions,
};
