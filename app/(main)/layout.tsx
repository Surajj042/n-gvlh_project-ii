"use client";
import { Navbar } from "@/components/shared/navbar/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const hideSidebarRoutes = ["/courses/", "/chapters", "/meeting/"]; // Add routes where the sidebar should be hidden

  const shouldHideSidebar = hideSidebarRoutes.some((str) =>
    pathname.includes(str),
  );

  return (
    <div className="dark:bg-slate-900">
      {userId && (
        <div className="fixed inset-y-0 z-50 h-[80px] w-full mmd:pl-56">
          <Navbar />
        </div>
      )}

      {userId && !shouldHideSidebar && (
        <div className="fixed inset-y-0 z-50 flex w-64 flex-col max-mmd:hidden">
          <Sidebar />
        </div>
      )}

      <main
        className={`h-[100vh] pt-[80px] dark:bg-slate-900 ${!shouldHideSidebar && "mmd:ml-8 mmd:pl-56"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
