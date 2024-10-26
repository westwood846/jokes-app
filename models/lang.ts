export type CEFR = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const langs = {
  en: "English",
  de: "German",
  ru: "Russian",
};

export type Lang = keyof typeof langs;
