import { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, NavigateNext } from "@mui/icons-material";
import "./styles.css";

type Joke = {
  [lang: string]: string;
};

const jokes = [
  {
    de: "Wie viele Deutsche braucht es um eine Glühbirne zu wechseln? -- Nur einen. Wir sind effizient und mögen keine Witze.",
    en: "How many Germans does it take to change a lightbulb? -- Only one. We are an efficient people, and we don't like jokes.",
    ru: null,
  },
  {
    de: 'Gehen zwei Zahnstocher in den Wald und sehen einen Igel. Sagt der eine: „Ich wusste gar nicht, dass hier ein Bus fährt."',
    en: "Two toothpicks are walking in the forest and meet a hedgehog. One says: „I didn't even know there was a bus here.\"",
  },
  {
    de: "Was haben ein Router und mein Opa gemeinsam? -- Eine SSID.",
    en: "What do a router and my grandpa have in common? -- An SSID.",
  },
  {
    de: "Es gibt nur 10 Arten von Leuten auf der Welt: Die, die Binär verstehen, und die, die's nicht verstehen.",
    en: "There are only 10 kinds of people in the world: Those who understand binary, and those who don't.",
  },
  {
    de: "Chuck Norris haut sich zum Frühstück zwei Pfannen in die Eier.",
    en: "???",
  },
  {
    de: "Sagt der Kamikaze Ausbilder zu seinen Schülern: Passen Sie gut auf, denn dies kann ich Ihnen nur einmal zeigen!",
    en: "The kamikaze instructor says to his students: Pay attention, I can only show this to you once!",
  },
  {
    de: "Was ist das beste an der Schweiz? Keine Ahnung, aber die Flagge ist schon mal ein großes Plus.",
    en: "What's the best thing about Switzerland? No idea, but the flag is a big plus.",
  },
  {
    ru: `
    Что вы будете делать, если увидите зеленого человечка?
    60% ответили – брошу пить!
    30% – начну пить!
    9% – пойду на прием к психиатру!
    И только одна девушка сказала: «Начну переходить дорогу!
    `,
    en: `
    What will you do if you see a green man?
    60% answered - I will stop drinking!
    30% - I will start drinking!
    9% - I will go to a psychiatrist!
    And only one girl said: I will cross the road!`,
  },
  {
    ru: `
    „Ну сколько там ещё?“
    „50%“
    „Осталось или загрузилось?“`,
    en: `
    "How much is left?"
    "50%"
    "Remaining or downloaded?"`,
  },
  {
    ru: `
    Муж говорит жене: 
    „Милая, должен признаться, я тебе
    изменил!“
    Жена: 
    „я тебе тоже!“
    Муж: 
    „1 апреля!“
    Жена: 
    „а я в июне“`,
    en: `
    Husband says to wife: 
    "Honey, I gotta tell you, I cheated on you!"
    Wife: 
    "I cheated, too!"
    Husband: 
    "April 1st!"
    Wife: 
    "and me in June."`,
  },
] as Joke[];

const langs = Object.keys(jokes[0]);
const initForeignLang = langs[0];
const initKnownLang = langs[1];

export default function App() {
  const [foreignLang, setForeignLang] = useState(initForeignLang);
  const [knownLang, setKnownLang] = useState(initKnownLang);

  const [index, setIndex] = useState(0);
  const availableJokes = jokes.filter((joke) => joke[foreignLang]);
  const joke = availableJokes[index];
  if (!joke) throw new Error("Joke index out of bounds!!! xDDD");

  const [revealed, setRevealed] = useState(false);

  const handleLangChange = (newLang: string, target: "foreign" | "known") => {
    const [setNewLang, setOtherLang] =
      target === "foreign"
        ? [setForeignLang, setKnownLang]
        : [setKnownLang, setForeignLang];
    const otherLang = target === "foreign" ? knownLang : foreignLang;
    setNewLang(newLang);
    if (newLang !== otherLang) return;
    const dodgedLang = langs.find((lang) => lang !== newLang);
    if (!dodgedLang) throw new Error("No lang to dodge");
    setOtherLang(dodgedLang);
  };

  const action = () => {
    if (revealed) {
      const nextIndex = index + 1 === availableJokes.length ? 0 : index + 1;
      setIndex(nextIndex);
      setRevealed(false);
    } else {
      setRevealed(true);
    }
  };
  const actionIcon = revealed ? <NavigateNext /> : <Visibility />;

  return (
    <Container component={Stack} spacing={4}>
      <Stack>
        <Typography variant="h1">Joke Buddies</Typography>
        <Typography variant="subtitle1">
          ✨ Where languages become friends ✨
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="lang-foreign">Buddy Language</InputLabel>
          <Select
            labelId="lang-foreign"
            value={foreignLang}
            label="Foreign Language"
            onChange={(e) => handleLangChange(e.target.value, "foreign")}
          >
            {langs.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="lang-foreign">Your Language</InputLabel>
          <Select
            labelId="lang-foreign"
            value={knownLang}
            label="Foreign Language"
            onChange={(e) => handleLangChange(e.target.value, "known")}
          >
            {langs.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Card onClick={action}>
        <CardHeader subheader={`${index + 1}/${availableJokes.length}`} />
        <CardContent component={Stack} spacing={1}>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">
              <code>{foreignLang.toUpperCase()}</code>:
            </Typography>
            <Typography>{joke[foreignLang]}</Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">
              <code>{knownLang.toUpperCase()}</code>:
            </Typography>
            {revealed ? (
              <Typography color={joke[knownLang] ? "info" : "error"}>
                {joke[knownLang] || "Missing translation ¯\\_(ツ)_/¯"}
              </Typography>
            ) : (
              <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>
                Click to reveal
              </Typography>
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "end" }}>
          <IconButton onClick={action} color="primary">
            {actionIcon}
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
}
