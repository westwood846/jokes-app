"use client";

import { usePreferences } from "./core/preferences";

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
  const { prefsQuery } = usePreferences();
  const appLang = prefsQuery.data?.appLang as Lang | null;
  const foreignLang = prefsQuery.data?.foreignLang as Lang | null;
  return { appLang, foreignLang };
};

export const useLangs = () => {
  const { appLang, foreignLang } = useLangsUnsafe();
  return {
    appLang: appLang || initAppLang,
    foreignLang: foreignLang || initForeignLang,
  };
};
