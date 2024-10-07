import { Lang } from "./lang";

export type Translations = { [key in Lang]?: string };

export interface IJoke {
  id: string;
  tags: string[];
  image?: string;
  title: Translations;
  translations: Translations;
}

// export const jokes = [
//   {
//     de: "Wie viele Deutsche braucht es um eine Glühbirne zu wechseln? -- Nur einen. Wir sind effizient und mögen keine Witze.",
//     en: "How many Germans does it take to change a lightbulb? -- Only one. We are an efficient people, and we don't like jokes.",
//     ru: null,
//   },
//   {
//     de: 'Gehen zwei Zahnstocher in den Wald und sehen einen Igel. Sagt der eine: „Ich wusste gar nicht, dass hier ein Bus fährt."',
//     en: "Two toothpicks are walking in the forest and meet a hedgehog. One says: „I didn't even know there was a bus here.\"",
//   },
//   {
//     de: "Was haben ein Router und mein Opa gemeinsam? -- Eine SSID.",
//     en: "What do a router and my grandpa have in common? -- An SSID.",
//   },
//   {
//     de: "Es gibt nur 10 Arten von Leuten auf der Welt: Die, die Binär verstehen, und die, die's nicht verstehen.",
//     en: "There are only 10 kinds of people in the world: Those who understand binary, and those who don't.",
//   },
//   {
//     de: "Chuck Norris haut sich zum Frühstück zwei Pfannen in die Eier.",
//     en: "???",
//   },
//   {
//     de: "Sagt der Kamikaze Ausbilder zu seinen Schülern: Passen Sie gut auf, denn dies kann ich Ihnen nur einmal zeigen!",
//     en: "The kamikaze instructor says to his students: Pay attention, I can only show this to you once!",
//   },
//   {
//     de: "Was ist das beste an der Schweiz? Keine Ahnung, aber die Flagge ist schon mal ein großes Plus.",
//     en: "What's the best thing about Switzerland? No idea, but the flag is a big plus.",
//   },
//   {
//     ru: `
//       Что вы будете делать, если увидите зеленого человечка?
//       60% ответили – брошу пить!
//       30% – начну пить!
//       9% – пойду на прием к психиатру!
//       И только одна девушка сказала: «Начну переходить дорогу!
//       `,
//     en: `
//       What will you do if you see a green man?
//       60% answered - I will stop drinking!
//       30% - I will start drinking!
//       9% - I will go to a psychiatrist!
//       And only one girl said: I will cross the road!`,
//   },
//   {
//     ru: `
//       „Ну сколько там ещё?“
//       „50%“
//       „Осталось или загрузилось?“`,
//     en: `
//       "How much is left?"
//       "50%"
//       "Remaining or downloaded?"`,
//   },
//   {
//     ru: `
//       Муж говорит жене:
//       „Милая, должен признаться, я тебе
//       изменил!“
//       Жена:
//       „я тебе тоже!“
//       Муж:
//       „1 апреля!“
//       Жена:
//       „а я в июне“`,
//     en: `
//       Husband says to wife:
//       "Honey, I gotta tell you, I cheated on you!"
//       Wife:
//       "I cheated, too!"
//       Husband:
//       "April 1st!"
//       Wife:
//       "and me in June."`,
//   },
// ] as Joke[];

export const jokes: IJoke[] = [
  {
    id: "2",
    tags: ["animals"],
    image: "penguins.png",
    title: {
      de: "Zahnstocher im Wald",
      en: "Toothpicks in the Forest",
    },
    translations: {
      de: 'Gehen zwei Zahnstocher in den Wald und sehen einen Igel. Sagt der eine: „Ich wusste gar nicht, dass hier ein Bus fährt."',
      en: "Two toothpicks are walking in the forest and meet a hedgehog. One says: „I didn't even know there was a bus here.\"",
    },
  },
  {
    id: "1",
    tags: ["animals", "stereotypes"],
    image: "irishman.png",
    title: {
      de: "Deutsche Effizienz",
      en: "German Efficiency",
    },
    translations: {
      de: "Wie viele Deutsche braucht es um eine Glühbirne zu wechseln? -- Nur einen. Wir sind effizient und mögen keine Witze.",
      en: "How many Germans does it take to change a lightbulb? -- Only one. We are an efficient people, and we don't like jokes.",
    },
  },
  {
    id: "3",
    tags: ["animals", "family"],
    title: {
      de: "Router und Opa",
      en: "Router and Grandpa",
    },
    translations: {
      de: "Was haben ein Router und mein Opa gemeinsam? -- Eine SSID.",
      en: "What do a router and my grandpa have in common? -- An SSID.",
    },
  },
  {
    id: "4",
    tags: ["animals"],
    title: {
      de: "Binär",
      en: "Binary",
    },
    translations: {
      de: "Es gibt nur 10 Arten von Leuten auf der Welt: Die, die Binär verstehen, und die, die's nicht verstehen.",
      en: "There are only 10 kinds of people in the world: Those who understand binary, and those who don't.",
    },
  },
  {
    id: "5",
    tags: ["animals", "family"],
    image: "irishman.png",
    title: {
      de: "Chuck Norris",
      en: "Chuck Norris",
    },
    translations: {
      de: "Chuck Norris haut sich zum Frühstück zwei Pfannen in die Eier.",
    },
  },
  {
    id: "6",
    tags: ["animals"],
    image: "penguins.png",
    title: {
      de: "Kamikaze",
      en: "Kamikaze",
    },
    translations: {
      de: "Sagt der Kamikaze Ausbilder zu seinen Schülern: Passen Sie gut auf, denn dies kann ich Ihnen nur einmal zeigen!",
      en: "The kamikaze instructor says to his students: Pay attention, I can only show this to you once!",
    },
  },
  {
    id: "7",
    tags: ["animals"],
    image: "penguins.png",
    title: {
      de: "Schweiz",
      en: "Switzerland",
    },
    translations: {
      de: "Was ist das beste an der Schweiz? Keine Ahnung, aber die Flagge ist schon mal ein großes Plus.",
      en: "What's the best thing about Switzerland? No idea, but the flag is a big plus.",
    },
  },
];

export const tags = Array.from(new Set(jokes.flatMap((joke) => joke.tags)));

export const tagLabels: { [tag: string]: Translations } = {
  animals: {
    de: "Tiere",
    en: "Animals",
  },
  stereotypes: {
    de: "Klischees",
    en: "Stereotypes",
  },
  family: {
    de: "Familie",
    en: "Family",
  },
};
