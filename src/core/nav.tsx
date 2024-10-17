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
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const routes = {
  stream: { label: "Stream", icon: <NewspaperOutlined /> },
  categories: { label: "Categories", icon: <CategoryOutlined /> },
  workout: { label: "Workout", icon: <FitnessCenterOutlined /> },
  settings: { label: "You", icon: <Settings /> },
  admin: { label: "Admin", icon: <AdminPanelSettings /> },
};

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
            <Tabs value={pathname.split("/")[1]}>
              {Object.entries(routes).map(([route, { label }]) => (
                <Tab
                  key={route}
                  label={label}
                  value={route}
                  LinkComponent={Link}
                  href={`/${route}`}
                />
              ))}
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
  const pathname = usePathname();

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{ bottom: 0, display: { xs: "inherit", md: "none" } }}
    >
      <Container disableGutters>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Tabs value={pathname.split("/")[1]}>
            {Object.entries(routes).map(([route, { label, icon }]) => (
              <Tab
                key={route}
                icon={icon}
                value={route}
                title={label}
                LinkComponent={Link}
                href={`/${route}`}
                sx={{ minWidth: 70 }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
