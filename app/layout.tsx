import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { DesktopNav, MobileNav } from "@/core/nav";
import { theme } from "@/core/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Setup } from "@/setup";

export const metadata: Metadata = {
  title: "Jokes App",
  description: "Name still pending",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DesktopNav />
            {children}
            <MobileNav />
            <Setup />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
