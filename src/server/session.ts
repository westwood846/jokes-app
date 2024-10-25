"use server";

import { cookies } from "next/headers";

import { Client, Account, Databases } from "node-appwrite";
import { getServerEnv } from "./env";

export async function createSessionClientMaybe() {
  const client = new Client()
    .setEndpoint(getServerEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"))
    .setProject(getServerEnv("NEXT_PUBLIC_APPWRITE_PROJECT"));

  const jwtEncoded = cookies().get("jwt")?.value;

  if (!jwtEncoded) return null;
  const jwtDecoded = decodeURIComponent(jwtEncoded);
  const { jwt } = JSON.parse(jwtDecoded);

  client.setJWT(jwt);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export async function createSessionClient() {
  const client = await createSessionClientMaybe();
  if (!client) throw new Error("Not logged in");
  return client;
}

// export async function signUpWithEmail(formData) {
//   const email = formData.get("email");
//   const password = formData.get("password");

//   const { account } = await createAdminClient();

//   await account.create(ID.unique(), email, password);
//   const session = await account.createEmailPasswordSession(email, password);

//   cookies().set("my-custom-session", session.secret, {
//     path: "/",
//     httpOnly: false,
//     sameSite: "strict",
//     secure: true,
//   });

//   redirect("/ssr-test/account");
// }

// export async function signIn(formData) {
//   const email = formData.get("email");
//   const password = formData.get("password");

//   const { account } = await createAdminClient();

//   const session = await account.createEmailPasswordSession(email, password);

//   cookies().set("my-custom-session", session.secret, {
//     path: "/",
//     httpOnly: false,
//     sameSite: "strict",
//     secure: true,
//   });

//   redirect("/ssr-test/account");
// }

// export async function getLoggedInUserSafely() {
//   try {
//     const { account } = await createSessionClient();
//     return await account.get();
//   } catch (error) {
//     return null;
//   }
// }

// export async function getLoggedInUser() {
//   const account = await getLoggedInUserSafely();
//   if (!account) throw new Error("Not logged in");
//   return account;
// }

// export async function signOut() {
//   const { account } = await createSessionClient();

//   cookies().delete("my-custom-session");
//   await account.deleteSession("current");

//   redirect("/ssr-test/signup");
// }
