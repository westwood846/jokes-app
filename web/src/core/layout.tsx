import { Outlet } from "react-router-dom";
import { DesktopNav, MobileNav } from "./nav";

export const RootLayout = () => {
  return <Outlet />;
};

interface Layout {
  children: React.ReactNode;
}

export const NavvyLayout = ({ children }: Layout) => {
  return (
    <>
      <DesktopNav />
      {children}
      <MobileNav />
    </>
  );
};
