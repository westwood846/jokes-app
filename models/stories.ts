import { CEFR, Lang } from "./lang";

export type LangMap = { [key in Lang]?: string };
export type LangArray = { [key in Lang]?: string[] };

export interface Word {
  term: LangMap;
  difficulty: CEFR;
  definitions: LangMap;
  image?: string;
}

export interface IJoke {
  id: string;
  tags: string[];
  image?: string;
  lang: Lang | null;
  title: LangMap;
  translations: LangMap;
  terms?: Word[];
  explanations?: LangMap;
}
