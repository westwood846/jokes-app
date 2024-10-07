import {
  Chip,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useLangs, useChangeLang, langs, Lang } from "./lang";
import { useCurrentPage } from "./routing";

export const Settings = () => {
  const { appLang, foreignLang } = useLangs();
  const changeLang = useChangeLang();
  const { setPage } = useCurrentPage();

  return (
    <Container component={Stack} spacing={4} maxWidth="xs">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component="h1">
          Settings
        </Typography>
        <IconButton onClick={() => setPage("read")}>
          <Close />
        </IconButton>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Which language would you like to learn?
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="lang-foreign">Foreign Language</InputLabel>
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
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          App Language
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="lang-app">App Language</InputLabel>
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
      </Stack>
    </Container>
  );
};
