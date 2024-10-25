"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Client, Account, ID, AppwriteException, Databases } from "appwrite";
import Cookies from "universal-cookie";

export const client = new Client();
client.setEndpoint("http://localhost/v1").setProject("jokes-app");

const cookies = new Cookies(null, { path: "/" });

export const account = new Account(client);
export const databases = new Databases(client);

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

  const init = useCallback(async () => {
    // https://github.com/appwrite/appwrite/discussions/3938#discussioncomment-3746725
    // Dumm, aber okay
    try {
      const user = await account.get();
      setUser(user);

      const jwt = await account.createJWT();
      cookies.set("jwt", jwt);
    } catch (e) {
      if (e instanceof AppwriteException) {
        if (e.type === "general_unauthorized_scope") {
          return; // do nothing, not logged in
        }
      }
      throw e;
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const login = useCallback(
    async (email: string, password: string) => {
      await account.createEmailPasswordSession(email, password);
      init();
    },
    [init]
  );

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
    cookies.remove("jwt");
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
