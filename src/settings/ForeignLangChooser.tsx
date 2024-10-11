import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useLangs, useChangeLang, Lang, langs } from "../lang";

export const ForeignLangChooser = () => {
  const { foreignLang } = useLangs();
  const changeLang = useChangeLang();

  return (
    <FormControl fullWidth>
      <InputLabel id="lang-foreign">Choose target language</InputLabel>
      <Select
        labelId="lang-foreign"
        value={foreignLang}
        label="Foreign Language"
        onChange={(e) => changeLang(e.target.value as Lang, "foreign")}
      >
        {Object.entries(langs).map(([langId, langName]) => (
          <MenuItem key={langId} value={langId}>
            {langName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
