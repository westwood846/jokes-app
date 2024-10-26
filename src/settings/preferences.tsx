import { initAppLang, initForeignLang } from "@/lang";
import { Lang } from "@models/lang";
import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";

export interface LangPrefs {
  appLang: Lang;
  foreignLang: Lang;
}

export const usePreferences = () => {
  const [cookie, setCookie] = useCookies(["lang-prefs"]);

  const prefs = cookie["lang-prefs"] as LangPrefs | undefined;

  useEffect(() => {
    if (prefs) return;
    setCookie("lang-prefs", {
      appLang: initAppLang,
      foreignLang: initForeignLang,
    });
  }, [prefs, setCookie]);

  const setPrefs = useCallback(
    (newPrefs: LangPrefs) => {
      setCookie("lang-prefs", newPrefs);
    },
    [setCookie]
  );

  return {
    prefs: prefs || { appLang: initAppLang, foreignLang: initForeignLang },
    setPrefs,
  };
};
