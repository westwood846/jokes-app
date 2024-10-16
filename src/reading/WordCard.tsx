"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Word } from "../jokes";
import { useLangs } from "../lang";
import { FitnessCenterOutlined } from "@mui/icons-material";
import Image from "next/image";

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word }: WordCardProps) => {
  const { foreignLang, appLang } = useLangs();
  const termInAppLang = word.term[appLang];
  const termInForeignLang = word.term[foreignLang];

  if (!termInAppLang) throw new Error("Term is missing in app language.");

  return (
    <Stack direction={"row"} sx={{ minHeight: 80, flex: 1 }} spacing={2}>
      <Stack justifyContent={"center"}>
        <IconButton variant="texty">
          <FitnessCenterOutlined />
        </IconButton>
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
          <Image
            src={word.image}
            alt={termInAppLang}
            width={100}
            height={100}
          />
        </Box>
      )}
    </Stack>
  );
};
