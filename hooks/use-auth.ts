import { signIn, signOut, signUp, useSession } from "@/lib/auth-client";

/**
 * Custom hook to access authentication state and methods
 * Usage: const { session, user, isAuthenticated, isLoading } = useAuth();
 */
export function useAuth() {
  const { data: session, isPending: isLoading } = useSession();

  return {
    session,
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading,
    signIn,
    signOut,
    signUp,
  };
}
