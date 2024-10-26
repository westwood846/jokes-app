import { AppBar, Box, Container, Tab, Tabs, Toolbar } from "@mui/material";
import {
  AdminPanelSettings,
  CategoryOutlined,
  FitnessCenterOutlined,
  NewspaperOutlined,
  Settings,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const routes = {
  stream: { label: "Stream", icon: <NewspaperOutlined /> },
  categories: { label: "Categories", icon: <CategoryOutlined /> },
  workout: { label: "Workout", icon: <FitnessCenterOutlined /> },
  settings: { label: "You", icon: <Settings /> },
  admin: { label: "Admin", icon: <AdminPanelSettings /> },
};

const defaultRoute = Object.keys(routes)[0];

export function DesktopNav() {
  const { pathname } = useLocation();

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
                  component={Link}
                  to={`/${route}`}
                />
              ))}
            </Tabs>
          </Box>
          {/* <IconButton onClick={() => router.push("/settings")} title="Settings">
            <Settings />
          </IconButton> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export function MobileNav() {
  const { pathname } = useLocation();

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
                component={Link}
                to={`/${route}`}
                sx={{ minWidth: 70 }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
