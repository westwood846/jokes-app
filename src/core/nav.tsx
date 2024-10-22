"use client";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import {
  AdminPanelSettings,
  CategoryOutlined,
  FitnessCenterOutlined,
  Login,
  NewspaperOutlined,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppwrite } from "@/appwrite";

const routes = {
  stream: { label: "Stream", icon: <NewspaperOutlined /> },
  categories: { label: "Categories", icon: <CategoryOutlined /> },
  workout: { label: "Workout", icon: <FitnessCenterOutlined /> },
  admin: { label: "Admin", icon: <AdminPanelSettings /> },
};

const defaultRoute = Object.keys(routes)[0];

export function DesktopNav() {
  const pathname = usePathname();
  const { user } = useAppwrite();

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ display: { xs: "none", md: "inherit" } }}
    >
      <Container maxWidth="sm" disableGutters>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Tabs value={pathname.split("/")[1] || defaultRoute}>
              {Object.entries(routes).map(([route, { label }]) => (
                <Tab
                  key={route}
                  label={label}
                  value={route}
                  LinkComponent={Link}
                  href={`/${route}`}
                />
              ))}
              {user ? (
                <Tab
                  label="You"
                  value="settings"
                  LinkComponent={Link}
                  href="/settings"
                />
              ) : (
                <Tab
                  label="Login"
                  value="login"
                  LinkComponent={Link}
                  href="/login"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAppwrite();

  return (
    <AppBar
      position="sticky"
      color="default"
      sx={{ bottom: 0, display: { xs: "inherit", md: "none" } }}
    >
      <Container disableGutters>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Tabs value={pathname.split("/")[1] || defaultRoute}>
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
            {user ? (
              <Tab
                icon={<Avatar>{user.email}</Avatar>}
                value="settings"
                title="Settings"
                LinkComponent={Link}
                href="/settings"
                sx={{ minWidth: 70 }}
              />
            ) : (
              <Tab
                icon={<Login />}
                value="login"
                title="Login or signup"
                LinkComponent={Link}
                href="/login"
                sx={{ minWidth: 70 }}
              />
            )}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
