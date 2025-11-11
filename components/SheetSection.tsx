import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Draggable } from "./Draggable";

export function SheetSection() {
  const COMPONENTS = [
    { id: "mqtt", label: "MQtt" },
    { id: "warningList", label: "لیست هشدار ها" },
    {
      id: "temp/humidity",
      label: "چارت دما و رطوبت",
    },
    {
      id: "trafficChart",
      label: "چارت ترافیک",
    },
    { id: "deviceList", label: "لیست دستگاه ها" },
    {
      id: "latestActivites",
      label: "آخرین فعالیت ها",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>ویجت ها</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader dir="rtl">
          <SheetTitle> ویجت ها</SheetTitle>
          <SheetDescription>
            ویجت مورد نیاز را انتخاب کنید بکشید و در صفحه بیاندازید{" "}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3"></div>
          {COMPONENTS.map((comp) => (
            <Draggable key={comp.id} id={comp.id}>
              <div className="p-2 border rounded-lg text-center cursor-grab hover:bg-gray-50">
                {comp.label}
              </div>
            </Draggable>
          ))}
          <div className="grid gap-3"></div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">بستن</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
