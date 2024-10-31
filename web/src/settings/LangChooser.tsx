import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { usePreferences } from "./preferences";
import { Lang } from "@models/lang";

const langs: Record<Lang, string> = {
  en: "English",
  de: "German",
  ru: "Russian",
};

interface LangChooserProps {
  prefKey: "appLang" | "foreignLang";
  label: string;
}

function LangChooser({ prefKey, label }: LangChooserProps) {
  const { setPrefs, prefs } = usePreferences();
  const langPrefs = prefs.lang;

  const labelId = `lang-chooser-${prefKey}`;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        labelId={labelId}
        value={langPrefs[prefKey]}
        label={label}
        onChange={(e) =>
          setPrefs({
            ...prefs,
            lang: {
              ...langPrefs,
              [prefKey]: e.target.value as Lang,
            },
          })
        }
      >
        {Object.entries(langs).map(([langId, langName]) => (
          <MenuItem key={langId} value={langId}>
            {langName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function AppLangChooser() {
  return <LangChooser prefKey="appLang" label="App Language" />;
}

export function ForeignLangChooser() {
  return <LangChooser prefKey="foreignLang" label="Foreign Language" />;
}
