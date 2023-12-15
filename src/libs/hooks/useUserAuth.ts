import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type UseUserAuth = {
    status: "authenticated" | "loading" | "unauthenticated";
    session: Session | null;
    isAuthenticated: boolean;
};

function useUserAuth(): UseUserAuth {
    const { status, data: session } = useSession();

    const isAuthenticated = status === "authenticated";

    return {
        status,
        session,
        isAuthenticated,
    };
}

export default useUserAuth;
