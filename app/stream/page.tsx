"use client";

import { Stream } from "@/reading/Stream";
import { useIsClient } from "@uidotdev/usehooks";

export default function Page() {
  // TODO: This is horrible
  const isClient = useIsClient();
  if (isClient === false) return null;

  return <Stream />;
}
