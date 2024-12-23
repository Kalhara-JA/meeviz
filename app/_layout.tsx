import React from "react";
import { Slot, usePathname, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ClickCountProvider } from "@/contexts/ClickCountContext";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const currentPath = usePathname();

  React.useEffect(() => {
    const currentRoute = currentPath.split("/")[1];

    if (
      !isAuthenticated &&
      currentRoute !== "signin" &&
      currentRoute !== "signup"
    ) {
      router.replace("/signin");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

const Layout = () => {
  return (
    <AuthProvider>
      <AuthGuard>
        <ClickCountProvider>
          <Slot />
        </ClickCountProvider>
      </AuthGuard>
    </AuthProvider>
  );
};

export default Layout;