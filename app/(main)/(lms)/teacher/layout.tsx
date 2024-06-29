import { isTeacher } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
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
  title: "N-GVLH | Teacher Abode",
  description: "Next-Gen Virtual Learning Hub",
  icons: {
    icon: "/icons/favicon.svg",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const checkTeacher = isTeacher({ userId: userId });
  if (!checkTeacher) redirect("/get-started");
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
