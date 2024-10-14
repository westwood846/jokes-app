"use client";

import {
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
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
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        background: "#1A1B300F",
        border: "1px solid #1A1B301F",
        height: 100,
      }}
    >
      {word.image && (
        <CardMedia sx={{ width: 100, height: 100, position: "relative" }}>
          <Image
            src={word.image}
            alt={termInAppLang}
            width={100}
            height={100}
          />
        </CardMedia>
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {termInForeignLang}
        </Typography>
        <Typography variant="body2" color="primary.dark">
          {termInAppLang}
        </Typography>
      </CardContent>
      <ButtonBase
        sx={{
          background: "#1A1B300F",
          padding: 2,
          color: ({ palette }) => palette.text.secondary,
        }}
      >
        <FitnessCenterOutlined />
      </ButtonBase>
    </Card>
  );
};
