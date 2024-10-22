import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { langs } from "@/lang";
import { usePreferences } from "@/core/preferences";

interface LangChooserProps {
  prefKey: "appLang" | "foreignLang";
  label: string;
}

function LangChooser({ prefKey, label }: LangChooserProps) {
  const { prefsQuery, prefsMutation } = usePreferences();

  const labelId = `lang-chooser-${prefKey}`;

  if (!prefsQuery.data) return <Typography>Loading...</Typography>;

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        labelId={labelId}
        value={prefsQuery.data[prefKey]}
        label={label}
        onChange={(e) =>
          prefsMutation.mutate({
            ...prefsQuery.data,
            [prefKey]: e.target.value as string,
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
