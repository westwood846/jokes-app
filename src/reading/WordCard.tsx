import { Box, Stack, Typography } from "@mui/material";
import { FitnessCenterOutlined } from "@mui/icons-material";
import { SquarishIconButton } from "../core/SquarishIconButton";
import { Word } from "@models/stories";
import { useLangs } from "@/lang";

interface WordCardProps {
  word: Word;
}

export function WordCard({ word }: WordCardProps) {
  const { foreignLang, appLang } = useLangs();
  const termInAppLang = word.term[appLang];
  const termInForeignLang = word.term[foreignLang];

  if (!termInAppLang) throw new Error("Term is missing in app language.");

  return (
    <Stack direction="row" sx={{ minHeight: 80, flex: 1 }} spacing={2}>
      <Stack justifyContent="center">
        <SquarishIconButton>
          <FitnessCenterOutlined />
        </SquarishIconButton>
      </Stack>
      <Stack sx={{ justifyContent: "center", flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {termInForeignLang}
        </Typography>
        <Typography variant="body2" color="primary.dark">
          {termInAppLang}
        </Typography>
      </Stack>
      {word.image && (
        <Box sx={{ width: 100, height: 100, position: "relative" }}>
          <img src={word.image} alt={termInAppLang} width={100} height={100} />
        </Box>
      )}
    </Stack>
  );
}
