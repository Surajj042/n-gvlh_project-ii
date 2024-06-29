import { Metadata } from "next";

//Made this layout just to add metadata outside client component
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
  title: "N-GVLH | Create New Course",
  description: "Next-Gen Virtual Learning Hub",
  icons: {
    icon: "/icons/favicon.svg",
  },
};
const CreateLayout = async ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CreateLayout;
