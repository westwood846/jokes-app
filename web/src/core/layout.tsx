import { Outlet } from "react-router-dom";
import { DesktopNav, MobileNav } from "./nav";

export const RootLayout = () => {
  return <Outlet />;
};

interface LayoutProps {
  children: React.ReactNode;
}

export const NavvyLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <DesktopNav />
      {children}
      <MobileNav />
    </>
  );
};

export const FullscreenLayout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};
