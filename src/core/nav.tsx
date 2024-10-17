"use client";

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import {
  AdminPanelSettings,
  CategoryOutlined,
  FitnessCenterOutlined,
  NewspaperOutlined,
  Settings,
  Tune,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

export function DesktopNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ display: { xs: "none", md: "inherit" } }}
    >
      <Container maxWidth="sm" disableGutters>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={pathname.split("/")[1]}
              onChange={(e, tab) => router.push(`/${tab}`)}
            >
              <Tab label="Stream" value="stream" />
              <Tab label="Themes" value="settings" />
              <Tab label="Train" value="train" />
              <Tab label="You" value="profile" />
              <Tab label="Admin" value="admin" />
            </Tabs>
          </Box>
          <IconButton onClick={() => router.push("/settings")} title="Settings">
            <Settings />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{ bottom: 0, display: { xs: "inherit", md: "none" } }}
    >
      <Container disableGutters>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Tabs
            value={pathname.split("/")[1]}
            onChange={(e, tab) => router.push(`/${tab}`)}
          >
            <Tab icon={<NewspaperOutlined />} value="stream" />
            <Tab icon={<CategoryOutlined />} value="settings" />
            <Tab icon={<FitnessCenterOutlined />} value="train" />
            <Tab icon={<Tune />} value="profile" />
            <Tab icon={<AdminPanelSettings />} value="admin" />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
