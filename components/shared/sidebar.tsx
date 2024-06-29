"use client";

import { Logo } from "../../app/(main)/(lms)/_components/logo";
import SidebarRoutes from "../../app/(main)/(lms)/_components/sidebar-routes";

export const Sidebar = () => {
  return (
    <div
      className={`custom-scrollbar flex h-full flex-col items-center overflow-y-auto bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
    >
      <div className="flex-center p-6">
        <Logo />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
