import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "../sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 mmd:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-sm:w-72">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
