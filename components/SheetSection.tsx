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
import MqttSection from "./MqttSection";
import WarningList from "./WarningList";
import { TempChart } from "./TempChart";
import { TraficChart } from "./TraficChart";
import DeviceList from "./DeviceList";
import { ScrollAreaSection } from "./ui/ScrollAreaSection";

export function SheetSection() {
  const COMPONENTS = [
    { id: "mqtt", label: "MQtt", component: MqttSection },
    { id: "warningList", label: "لیست هشدار ها", component: WarningList },
    {
      id: "temp/humidity",
      label: "چارت دما و رطوبت",
      component: TempChart,
    },
    {
      id: "trafficChart",
      label: "چارت ترافیک",
      component: TraficChart,
    },
    { id: "deviceList", label: "لیست دستگاه ها", component: DeviceList },
    {
      id: "latestActivites",
      label: "آخرین فعالیت ها",
      component: ScrollAreaSection,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">ویجت ها</Button>
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
