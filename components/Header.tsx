import { Bell } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { ModeToggle } from "./ui/ModeButton";

export default function Header() {
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
          </PopoverTrigger>
          <PopoverContent className="mt-2.5">
            هیچ هشداری وجود ندارد
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
