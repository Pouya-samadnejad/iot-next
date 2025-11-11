"use client";

import { useDroppable } from "@dnd-kit/core";
import { Fragment } from "react";
import MqttSection from "./MqttSection";
import WarningList from "./WarningList";
import { TempChart } from "./TempChart";
import { TraficChart } from "./TraficChart";
import DeviceList from "./DeviceList";
import InfoCard from "./InfoCard";
import { ScrollAreaSection } from "./ui/ScrollAreaSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { useWidgetStore } from "@/store/useWidgetStore";

// —————————————————————————————
// تابع کمکی برای تقسیم آرایه به ردیف‌های ۲تایی
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// —————————————————————————————
const Droppable = () => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const { widgets, removeWidget } = useWidgetStore(); // از Zustand

  const renderWidget = (widget: { id: string; type: string }) => {
    const removeButton = (
      <Button
        className="w-5 h-5 rounded-full"
        variant="ghost"
        onClick={() => removeWidget(widget.id)}
      >
        <XIcon size={14} />
      </Button>
    );

    switch (widget.type) {
      case "mqtt":
        return (
          <InfoCard
            title="اتصال MQTT"
            description="WebSocket حالت نمایشی"
            className="h-full"
            action={removeButton}
          >
            <MqttSection />
          </InfoCard>
        );

      case "temp/humidity":
        return (
          <InfoCard
            title="تله‌متری محیط"
            description="دما و رطوبت آخرین ۵۰ نمونه"
            className="w-full h-full"
            action={removeButton}
          >
            <TempChart />
          </InfoCard>
        );

      case "trafficChart":
        return (
          <InfoCard
            title="ترافیک شبکه"
            description="پیام در دقیقه"
            className="w-full h-full"
            action={removeButton}
          >
            <TraficChart />
          </InfoCard>
        );

      case "deviceList":
        return (
          <InfoCard
            title="لیست دستگاه‌ها"
            className="w-full h-full"
            action={removeButton}
          >
            <DeviceList />
          </InfoCard>
        );

      case "warningList":
        return (
          <InfoCard
            title="هشدارها"
            description="اولویت‌بندی خودکار"
            className="w-full h-full"
            action={removeButton}
          >
            <WarningList />
          </InfoCard>
        );

      case "latestActivities":
        return (
          <InfoCard
            title="فعالیت اخیر"
            description="آخرین رویدادها"
            className="h-full"
            action={removeButton}
          >
            <ScrollAreaSection />
          </InfoCard>
        );

      default:
        return (
          <div className="p-3 bg-gray-200 rounded-lg text-center">
            ویجت ناشناخته: {widget.type}
          </div>
        );
    }
  };

  // —————————————————————————————
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] border-2 border-dashed rounded-xl transition-colors ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      {widgets.length === 0 ? (
        <p className="text-gray-400 text-center">
          ویجت‌ها را از پنل بکشید و در اینجا رها کنید
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {chunkArray(widgets, 2).map((rowWidgets, rowIndex) => (
            <ResizablePanelGroup
              key={rowIndex}
              direction="horizontal"
              className="min-h-[250px] rounded-lg"
            >
              {rowWidgets.map((w, widgetIndex) => (
                <Fragment key={w.id}>
                  <ResizablePanel
                    defaultSize={100 / rowWidgets.length}
                    minSize={25}
                    className="p-2"
                  >
                    {renderWidget(w)}
                  </ResizablePanel>
                  {widgetIndex < rowWidgets.length - 1 && (
                    <ResizableHandle className="mx-1" />
                  )}
                </Fragment>
              ))}
            </ResizablePanelGroup>
          ))}
        </div>
      )}
    </div>
  );
};

export default Droppable;
