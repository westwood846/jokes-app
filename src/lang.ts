"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback } from "react";

export type CEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const langs = {
  en: "English",
  de: "German",
  es: "Spanish",
  ru: "Russian",
};

export type Lang = keyof typeof langs;

export const initForeignLang: Lang = "de";
export const initAppLang: Lang = "en";

export const useLangs = () => {
  const [foreignLang, setForeignLang] = useLocalStorage<Lang>(
    "foreignLang",
    initForeignLang
  );
  const [appLang, setAppLang] = useLocalStorage<Lang>("appLang", initAppLang);
  return { foreignLang, setForeignLang, appLang, setAppLang };
};

export const useChangeLang = () => {
  const { foreignLang, setForeignLang, appLang, setAppLang } = useLangs();
  const changeLang = useCallback(
    (newLang: Lang, target: "foreign" | "app") => {
      const [setNewLang, setOtherLang] =
        target === "foreign"
          ? [setForeignLang, setAppLang]
          : [setAppLang, setForeignLang];
      const otherLang = target === "foreign" ? appLang : foreignLang;
      setNewLang(newLang);
      if (newLang !== otherLang) return;
      const dodgedLang = (Object.keys(langs) as Lang[]).find(
        (lang) => lang !== newLang
      );
      if (!dodgedLang) throw new Error("No lang to dodge");
      setOtherLang(dodgedLang);
    },
    [foreignLang, setForeignLang, appLang, setAppLang]
  );
  return changeLang;
};
