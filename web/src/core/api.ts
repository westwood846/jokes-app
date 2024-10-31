import { env } from "@/env";
import { initAppLang, initForeignLang } from "@/lang";
import { merge } from "lodash";

type TInput = Parameters<typeof fetch>[0];
type TInit = Parameters<typeof fetch>[1];

const defaultLangPrefs = {
  appLang: initAppLang,
  foreignLang: initForeignLang,
};

const getLangPrefs = () => {
  const prefs = localStorage?.getItem("prefs");
  if (!prefs) return defaultLangPrefs;
  try {
    const parsed = JSON.parse(prefs);
    console.log({ ...defaultLangPrefs, ...parsed.lang });
    return { ...defaultLangPrefs, ...parsed.lang };
  } catch (e) {
    console.warn(e);
    return defaultLangPrefs;
  }
};

export const fetchFromAPI = async <TReturn = any>(
  input: TInput,
  init?: TInit
) => {
  const { appLang, foreignLang } = getLangPrefs();
  const defaultInit = {
    headers: {
      "x-app-lang": appLang,
      "x-foreign-lang": foreignLang,
    },
  };
  const finalInit = merge(defaultInit, init);
  const response = await fetch(`${env().API_URL}${input}`, finalInit);
  return response.json() as TReturn;
};
