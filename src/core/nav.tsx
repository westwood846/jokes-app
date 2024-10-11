import {
  AppBar,
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import { useCurrentPage } from "./routing";
import {
  CategoryOutlined,
  FitnessCenterOutlined,
  NewspaperOutlined,
  Settings,
  Tune,
} from "@mui/icons-material";

export const DesktopNav = () => {
  const { setPage, page } = useCurrentPage();

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="sm" disableGutters>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Tabs value={page} onChange={(e, tab) => setPage(tab)}>
              <Tab label="Stream" value="stream" />
              <Tab label="Themes" value="settings" />
              <Tab label="Train" value="train" />
              <Tab label="You" value="profile" />
            </Tabs>
          </Box>
          <IconButton onClick={() => setPage("settings")} title="Settings">
            <Settings />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const MobileNav = () => {
  const { setPage, page } = useCurrentPage();

  return (
    <AppBar position="sticky" color="default" sx={{ bottom: 0 }}>
      <Container disableGutters>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Tabs value={page} onChange={(e, tab) => setPage(tab)}>
            <Tab icon={<NewspaperOutlined />} value="stream" />
            <Tab icon={<CategoryOutlined />} value="settings" />
            <Tab icon={<FitnessCenterOutlined />} value="train" />
            <Tab icon={<Tune />} value="profile" />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
