import { Outlet } from "react-router-dom";
import { DesktopNav, MobileNav } from "./core/nav";

export const RootLayout = () => {
  return (
    <>
      <DesktopNav />
      <Outlet />
      <MobileNav />
    </>
  );
};
