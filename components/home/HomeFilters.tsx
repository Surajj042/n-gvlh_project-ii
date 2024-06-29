"use client";
import { HomePageFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLocaleLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-2 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleTypeClick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "lyellow2lpink"
              : "text-custom-low bg-light-800 hover:bg-light-900 dark:bg-dark-200 dark:hover:bg-dark-400"
          }`}
        >
          <p
            className={`bg-pink2blue dark:bg-dark-gradient bg-clip-text text-transparent ${
              active === item.value && "dark:bg-pink2blue"
            }`}
          >
            {item.name}
          </p>
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
