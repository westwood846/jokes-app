import { redirect } from "next/navigation";
import { createSessionClientMaybe } from "@/server/session";

export default async function Home() {
  const client = await createSessionClientMaybe();
  if (client) redirect("/ssr-test/account");
  else redirect("/login");
}
