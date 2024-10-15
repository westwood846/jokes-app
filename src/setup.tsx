"use client";

import { useEffect } from "react";
import { IJoke, jokes } from "./jokes";

const migrateLocalStorageJokes = () => {
  if (!localStorage) {
    console.warn("localStorage is not available");
    return;
  }

  const oldState = JSON.parse(localStorage.getItem("jokes") || "[]") as IJoke[];
  const newState = [...oldState];

  for (const joke of jokes) {
    const jokeExists = newState.some((j) => j.id === joke.id);
    if (jokeExists) continue;
    newState.push(joke);
  }

  console.log(
    `Added ${newState.length - oldState.length} jokes to localStorage`
  );

  localStorage.setItem("jokes", JSON.stringify(newState));
};

export const Setup = () => {
  useEffect(migrateLocalStorageJokes, []);
  return null;
};
