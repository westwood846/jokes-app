"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Client, Account, ID } from "appwrite";

export const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("jokes-app");

export const account = new Account(client);

export type AppwriteUser = Awaited<ReturnType<typeof account.get>>;

interface AppwriteContext {
  user: AppwriteUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const appwriteContext = createContext<AppwriteContext | null>(null);

export function AppwriteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AppwriteUser | null>(null);

  useEffect(() => {
    const init = async () => {
      const user = await account.get();
      setUser(user);
    };
    init();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    setUser(user);
  }, []);

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      await account.create(ID.unique(), email, password, name);
      login(email, password);
    },
    [login]
  );

  const logout = useCallback(async () => {
    await account.deleteSession("current");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );

  return (
    <appwriteContext.Provider value={value}>
      {children}
    </appwriteContext.Provider>
  );
}

export const useAppwrite = () => {
  const context = useContext(appwriteContext);
  if (!context)
    throw new Error("useAppwrite must be used within AppwriteProvider");
  return context;
};

export const useLoggedInUser = () => {
  const { user } = useAppwrite();
  if (!user) throw new Error("User not logged in");
  return user;
};
