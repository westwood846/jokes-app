import { IJoke } from "@models/stories";
import { useMutation, useQuery } from "@tanstack/react-query";

export const PARAGRAPH_DIVIDER = "</ja:p>";

// export const jokes: IJoke[] = [
//   {
//     id: "2",
//     tags: ["animals"],
//     image: "/hedgehog.webp",
//     lang: null,
//     title: {
//       de: "Zahnstocher im Wald",
//       en: "Toothpicks in the Forest",
//     },
//     translations: {
//       de: [
//         "Gehen zwei Zahnstocher in den Wald und sehen einen Igel.",
//         "Sagt der eine:",
//         '"Ich wusste gar nicht, dass hier ein Bus fährt."',
//       ],
//       en: [
//         "Two toothpicks are walking in the forest and meet a hedgehog.",
//         "One says:",
//         '"I didn\'t even know there was a bus here."',
//       ],
//     },
//     terms: [
//       {
//         term: {
//           de: "Zahnstocher",
//           en: "Toothpick",
//         },
//         difficulty: "A1",
//         definitions: {
//           de: "Ein kleiner Stab aus Holz oder Plastik oder Metall, das zum Reinigen der Zähne verwendet wird.",
//           en: "A small stick made of wood or plastic used for cleaning teeth.",
//         },
//       },
//       {
//         term: {
//           de: "Igel",
//           en: "Hedgehog",
//         },
//         difficulty: "A1",
//         definitions: {
//           de: "Ein kleines Tier mit Stacheln auf dem Rücken.",
//           en: "A small animal with spikes on its back.",
//         },
//         image: "/words/hedgehog.png",
//       },
//       {
//         term: {
//           de: "Bus",
//           en: "Bus",
//         },
//         difficulty: "A1",
//         definitions: {
//           de: "Ein großes Fahrzeug, das viele Menschen transportieren kann.",
//           en: "A large vehicle that can transport many people.",
//         },
//         image: "/words/forest.png",
//       },
//     ],
//     explanations: {
//       de: "Der Igel hat Stacheln auf dem Rücken, die wie die Sitze in einem Bus aussehen.",
//       en: "The hedgehog has spikes on its back that look like the seats in a bus.",
//     },
//   },
//   {
//     id: "1",
//     tags: ["animals", "stereotypes"],
//     image: "/irishman.png",
//     lang: null,
//     title: {
//       de: "Deutsche Effizienz",
//       en: "German Efficiency",
//     },
//     translations: {
//       de: [
//         "Wie viele Deutsche braucht es um eine Glühbirne zu wechseln?",
//         PARAGRAPH_DIVIDER,
//         "Nur einen.",
//         "Wir sind effizient und mögen keine Witze.",
//       ],
//       en: [
//         "How many Germans does it take to change a lightbulb?",
//         PARAGRAPH_DIVIDER,
//         "Only one.",
//         "We are an efficient people, and we don't like jokes.",
//       ],
//     },
//     terms: [
//       {
//         term: {
//           de: "Deutsche",
//           en: "Germans",
//         },
//         difficulty: "A1",
//         definitions: {
//           de: "Menschen aus Deutschland.",
//           en: "People from Germany.",
//         },
//       },
//       {
//         term: {
//           de: "Glühbirne",
//           en: "Lightbulb",
//         },
//         difficulty: "A1",
//         definitions: {
//           de: "Ein Gerät, das Licht macht.",
//           en: "A device that makes light.",
//         },
//       },
//     ],
//   },
//   {
//     id: "3",
//     tags: ["animals", "family"],
//     image: "/grandpas-wifi.webp",
//     lang: "de",
//     title: {
//       de: "Router und Opa",
//       en: "Router and Grandpa",
//     },
//     translations: {
//       de: [
//         "Was haben ein Router und mein deutscher Opa gemeinsam?",
//         "Eine SSID.",
//       ],
//       en: [
//         "What do a router and my German grandpa have in common?",
//         "An SSID.",
//       ],
//     },
//   },
//   {
//     id: "4",
//     tags: ["animals"],
//     lang: null,
//     title: {
//       de: "Binär",
//       en: "Binary",
//     },
//     translations: {
//       de: [
//         "Es gibt nur 10 Arten von Leuten auf der Welt:",
//         "Die, die Binär verstehen, und die, die's nicht verstehen.",
//       ],
//       en: [
//         "There are only 10 kinds of people in the world:",
//         "Those who understand binary, and those who don't.",
//       ],
//     },
//     explanations: {
//       de: "Im Binärsystem gibt es nur die Ziffern 0 und 1.",
//       en: "In the binary system, there are only the digits 0 and 1.",
//     },
//   },
//   {
//     id: "5",
//     tags: ["animals", "family"],
//     image: "/irishman.png",
//     lang: "de",
//     title: {
//       de: "Chuck Norris",
//       en: "Chuck Norris",
//     },
//     translations: {
//       de: ["Chuck Norris haut sich zum Frühstück zwei Pfannen in die Eier."],
//     },
//     explanations: {
//       de: "Chuck Norris ist ein Schauspieler und Kampfkünstler.",
//       en: "Chuck Norris is an actor and martial artist.",
//     },
//   },
//   {
//     id: "6",
//     tags: ["animals"],
//     image: "/japanese.webp",
//     lang: null,
//     title: {
//       de: "Kamikaze",
//       en: "Kamikaze",
//     },
//     translations: {
//       de: [
//         "Sagt der Kamikaze Ausbilder zu seinen Schülern:",
//         "Passen Sie gut auf, denn dies kann ich Ihnen nur einmal zeigen!",
//       ],
//       en: [
//         "The kamikaze instructor says to his students:",
//         "Pay attention, I can only show this to you once!",
//       ],
//     },
//     terms: [
//       {
//         term: {
//           de: "Kamikaze",
//           en: "Kamikaze",
//         },
//         difficulty: "B2",
//         definitions: {
//           de: "Ein japanischer Selbstmordpilot.",
//           en: "A Japanese suicide pilot.",
//         },
//       },
//     ],
//   },
//   {
//     id: "7",
//     tags: ["animals"],
//     image: "/penguins.png",
//     lang: null,
//     title: {
//       de: "Schweiz",
//       en: "Switzerland",
//     },
//     translations: {
//       de: [
//         "Was ist das beste an der Schweiz?",
//         "Keine Ahnung, aber die Flagge ist schon mal ein großes Plus.",
//       ],
//       en: [
//         "What's the best thing about Switzerland?",
//         "No idea, but the flag is a big plus.",
//       ],
//     },
//     explanations: {
//       de: "Die Flagge der Schweiz hat ein weißes Kreuz auf rotem Hintergrund, was als Pluszeichen interpretiert werden kann.",
//       en: "The flag of Switzerland has a white cross on a red background, which can be interpreted as a plus sign.",
//     },
//   },
//   {
//     id: "dab76be1-f257-445b-a92c-8bec1627a1d2",
//     title: {
//       en: "My little piglet",
//       de: "Mein kleines Schwein",
//       ru: "",
//     },
//     translations: {
//       en: ["I think my pig is whistling </ja:p>", "</ja:p>"],
//       de: ["Ich glaub mein Schwein pfeift </ja:p>", "</ja:p>"],
//       ru: ["</ja:p>", "</ja:p>"],
//     },
//     explanations: {
//       en: "It's a very common idiom",
//       de: "Ein typischer Sprichwort",
//       ru: "",
//     },
//     terms: [],
//     tags: [],
//     lang: null,
//     image: "/penguins.png",
//   },
// ];

// export const tags = Array.from(new Set(jokes.flatMap((joke) => joke.tags)));

// export const tagLabels: { [tag: string]: LangMap } = {
//   animals: {
//     de: "Tiere",
//     en: "Animals",
//   },
//   stereotypes: {
//     de: "Klischees",
//     en: "Stereotypes",
//   },
//   family: {
//     de: "Familie",
//     en: "Family",
//   },
// };

// const isDividerFragment = (fragment: string) => fragment === PARAGRAPH_DIVIDER;
// const isRegularFragment = (fragment: string) => !isDividerFragment(fragment);

export const isShort = (joke: IJoke) => {
  if (!joke.translations.en) return false;
  return joke.translations.en.length <= 100;
  // return joke.translations.en.filter(isRegularFragment).length === 1;
};

const fetchJokes = async () => {
  const response = await fetch("http://localhost:3001");
  return response.json() as Promise<IJoke[]>;
};

export const useJokes = () => {
  const query = useQuery({
    queryKey: ["jokes"],
    queryFn: fetchJokes,
  });
  return { query };
};

const deleteJoke = async (id: string) => {
  const response = await fetch(`http://localhost:3001/jokes/${id}`, {
    method: "DELETE",
  });
  return response.json() as Promise<string>;
};

export const useDeleteJoke = () => {
  const mutation = useMutation({
    mutationFn: deleteJoke,
  });
  return { mutation };
};

export const createJoke = async (joke: IJoke) => {
  const response = await fetch("http://localhost:3001/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  });
  return response.json() as Promise<IJoke>;
};

export const useCreateJoke = () => {
  const mutation = useMutation({
    mutationFn: createJoke,
  });
  return { mutation };
};
