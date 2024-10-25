"use server";

import { createAdminClient } from "./admin";
import { getLoggedInUser } from "./session";

export async function getPreferences() {
  const account = await getLoggedInUser();
  return account?.prefs;
}

export async function setPreferences(prefs: object) {
  const account = await getLoggedInUser();
  const { users } = await createAdminClient();
  users.updatePrefs(account.$id, prefs);
}
