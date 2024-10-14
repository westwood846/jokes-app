"use client";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useLangs, useChangeLang, Lang, langs } from "../lang";

export const AppLangChooser = () => {
  const { appLang } = useLangs();
  const changeLang = useChangeLang();
  return (
    <FormControl fullWidth>
      <InputLabel id="lang-app">App language</InputLabel>
      <Select
        labelId="lang-app"
        value={appLang}
        label="App Language"
        onChange={(e) => changeLang(e.target.value as Lang, "app")}
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
