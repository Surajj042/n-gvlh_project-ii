"use client";

import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

export const SliderToggle = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="relative flex h-8 w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          mode === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setMode("light");
          localStorage.theme = "light";
        }}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        {/* <span className="relative z-10">Light</span> */}
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          mode === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setMode("dark");
          localStorage.theme = "dark";
        }}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        {/* <span className="relative z-10">Dark</span> */}
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          mode === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};
