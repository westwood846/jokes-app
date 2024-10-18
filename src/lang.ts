"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback } from "react";

export type CEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const langs = {
  en: "English",
  de: "German",
  ru: "Russian",
};

export type Lang = keyof typeof langs;

export const initForeignLang: Lang = "de";
export const initAppLang: Lang = "en";


export const useLangsUnsafe = () => {
  const [foreignLang, setForeignLang] = useLocalStorage<Lang | null>(
    "foreignLang",
    null,
  );
  const [appLang, setAppLang] = useLocalStorage<Lang | null>("appLang", null);

  return {
    foreignLang, setForeignLang, appLang, setAppLang,
  };
};

export const useLangs = () => {
  const {foreignLang, setForeignLang, appLang, setAppLang,} = useLangsUnsafe();

  if (!foreignLang) throw new Error("Foreign lang not set");
  if (!appLang) throw new Error("App lang not set");

  return {
    foreignLang, setForeignLang, appLang, setAppLang,
  };
};

export const useChangeLang = () => {
  const {
    foreignLang, setForeignLang, appLang, setAppLang,
  } = useLangsUnsafe();
  const changeLang = useCallback(
    (newLang: Lang, target: "foreign" | "app") => {
      const [setNewLang, setOtherLang] = target === "foreign"
        ? [setForeignLang, setAppLang]
        : [setAppLang, setForeignLang];
      const otherLang = target === "foreign" ? appLang : foreignLang;
      setNewLang(newLang);
      if (newLang !== otherLang) return;
      const dodgedLang = (Object.keys(langs) as Lang[]).find(
        (lang) => lang !== newLang,
      );
      if (!dodgedLang) throw new Error("No lang to dodge");
      setOtherLang(dodgedLang);
    },
    [foreignLang, setForeignLang, appLang, setAppLang],
  );
  return changeLang;
};
