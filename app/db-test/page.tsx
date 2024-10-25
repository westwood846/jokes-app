// import { databases } from "@/appwrite";
import { createSessionClient } from "@/server/session";
import { Query } from "node-appwrite";
// import { useSuspenseQuery } from "@tanstack/react-query";

// const getStories = async () => {
//   databases.listDocuments("maindb", "stories");
// };

export default async function Page() {
  // const stories = useSuspenseQuery({
  //   queryKey: ["stories"],
  //   queryFn: getStories,
  // });
  const { databases } = await createSessionClient();
  const stories = databases.listDocuments("maindb", "stories", [
    Query.select(["*"]),
  ]);
  return <div>{JSON.stringify(stories)}</div>;
}
