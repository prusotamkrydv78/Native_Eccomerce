import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      setIsLoading(true);
      // Dummy bootstrap (later: SecureStore + backend /me)
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    boot();
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isAuthenticated: !!user,
      isLoading,
      login: async (email: string, _password: string) => {
        setIsLoading(true);
        // Dummy login (later: call backend)
        await new Promise((r) => setTimeout(r, 400));
        setUser({ id: "1", name: "Nova User", email });
        setIsLoading(false);
      },
      logout: async () => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 200));
        setUser(null);
        setIsLoading(false);
      },
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
