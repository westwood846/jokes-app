import { styled, Switch, SwitchProps } from "@mui/material";

export const SquarishSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: 60,
  height: 44,
  padding: 0,
  border: `2px solid ${theme.palette.background.default}`,
  borderRadius: 8,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.light,
        opacity: 1,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.text.primary,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb, & .MuiSvgIcon-root": {
    boxSizing: "border-box",
    width: 36,
    height: 36,
    borderRadius: 4,
    boxShadow: "none",
    backgroundColor: "#fff",
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(["color"], {
      duration: 500,
    }),
    padding: 6,
  },
  "& .MuiSwitch-track": {
    borderRadius: 0,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));
