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

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word }: WordCardProps) => {
  const { foreignLang, appLang } = useLangs();
  const termInAppLang = word.term[appLang];
  const termInForeignLang = word.term[foreignLang];
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
        <CardMedia
          component="img"
          sx={{ maxWidth: 100 }}
          src={word.image}
          alt={termInAppLang}
        />
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
