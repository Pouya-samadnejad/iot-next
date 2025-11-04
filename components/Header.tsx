"use client";
import { useState, useEffect } from "react";

import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";

export default function DashboardHeader() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="flex items-center justify-between gap-4 w-full py-2 px-4 border-b bg-background mb-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger />

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">اپراتور</span>
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            IO
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <Bell className="h-5 w-5 cursor-pointer" />
          </PopoverTrigger>{" "}
          <PopoverContent className="mt-2.5">
            هیچ هشداری وجود ندارد
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
