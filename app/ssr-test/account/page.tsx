import { createSessionClient } from "@/server/session";

export default async function HomePage() {
  const { account } = await createSessionClient();
  const user = await account.get();

  return (
    <ul>
      <li>
        <strong>Email:</strong> {}
      </li>
      <li>
        <strong>ID: </strong> {user.email}
      </li>
      <li>
        <strong>Preferences: </strong> {JSON.stringify(user.prefs)}
      </li>
    </ul>
  );
}
