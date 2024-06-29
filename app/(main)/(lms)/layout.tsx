import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  authors: [
    {
      name: "CMRegmi | Github",
      url: "https://github.com/LowkeyGud",
    },
    {
      name: "CMRegmi | Wakatime",
      url: "https://wakatime.com/@lowkeygud",
    },
  ],
  title: "N-GVLH | Dashboard",
  description: "Next-Gen Virtual Learning Hub",
  icons: {
    icon: "/icons/favicon.svg",
  },
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="dark:bg-slate-900">{children}</main>
    </div>
  );
};

export default DashboardLayout;
