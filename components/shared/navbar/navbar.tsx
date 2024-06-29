"use client";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-white">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
