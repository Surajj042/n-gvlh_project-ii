"use client";

import { SafeProfile } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { SearchInput } from "./search-input";
import { SliderToggle } from "./ui/toggle-mode";

interface NavbarRoutesProps {
  currentProfile?: SafeProfile | null;
}

export const NavbarRoutes: React.FC<NavbarRoutesProps> = () => {
  const pathname = usePathname();

  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex-center ml-auto gap-x-2">
        <SliderToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
