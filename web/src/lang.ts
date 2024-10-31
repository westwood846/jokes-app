import { Lang } from "@models/lang";
import { usePreferences } from "./settings/preferences";

export const langs: Record<Lang, string> = {
  en: "English",
  de: "German",
  ru: "Russian",
};

export const initForeignLang: Lang = "de";
export const initAppLang: Lang = "en";

export const useLangsUnsafe = () => {
  const { prefs } = usePreferences();

  const foreignLang = prefs.lang.foreignLang;
  const appLang = prefs.lang.appLang;

  return {
    foreignLang,
    appLang,
  };
};

export const useLangs = () => {
  const { foreignLang, appLang } = useLangsUnsafe();

  if (!foreignLang) throw new Error("Foreign lang not set");
  if (!appLang) throw new Error("App lang not set");

  return {
    foreignLang: (foreignLang || initForeignLang) as Lang,
    appLang: (appLang || initAppLang) as Lang,
  };
};
