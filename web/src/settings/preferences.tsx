import { initAppLang, initForeignLang } from "@/lang";
import { Lang } from "@models/lang";
import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, ReactNode, useContext } from "react";

export interface LangPrefs {
  appLang: Lang;
  foreignLang: Lang;
}

interface Preferences {
  lang: LangPrefs;
}

interface PreferencesContext {
  prefs: Preferences;
  setPrefs: (prefs: Preferences) => void;
}

export const preferencesContext = createContext<PreferencesContext | null>(
  null
);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [prefs, setPrefs] = useLocalStorage("prefs", {
    lang: {
      appLang: initAppLang,
      foreignLang: initForeignLang,
    },
  });

  return (
    <preferencesContext.Provider value={{ prefs, setPrefs }}>
      {children}
    </preferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(preferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
