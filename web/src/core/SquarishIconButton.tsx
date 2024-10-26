import { styled, IconButton, IconButtonProps } from "@mui/material";

export const SquarishIconButton = styled((props: IconButtonProps) => (
  <IconButton {...props} />
))(({ theme, color }) => ({
  borderRadius: 8,
  background: theme.palette.grey[100],
  border: `2px solid ${theme.palette.background.default}`,
  color: theme.palette.text.primary,
  ...(color === "primary" && {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  }),
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));
