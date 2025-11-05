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

// ۱. این اینترفیس را export می‌کنیم تا PageBuilder هم از آن استفاده کند
export interface DroppableItem {
  id: string;
  type: string;
}

// تابع کمکی برای تقسیم آرایه به ردیف‌های ۲تایی
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// ۲. کامپوننت به یک فانکشن ساده تبدیل شد
// دیگر نه از forwardRef خبری هست و نه از useImperativeHandle
const Droppable = ({ widgets }: { widgets: DroppableItem[] }) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  // ۳. استیت (useState) از اینجا حذف شد

  function renderWidget(widget: DroppableItem) {
    switch (widget.type) {
      case "mqtt":
        return (
          <InfoCard title=" MQTT اتصال " description="WebSocket حالت نمایشی">
            <MqttSection />
          </InfoCard>
        );
      case "temp/humidity":
        return (
          <InfoCard
            title="تله متری محیط"
            description="دما و رطوبت آخرین ۵۰ نمونه"
            className="w-full"
          >
            <TempChart />
          </InfoCard>
        );
      case "trafficChart":
        return (
          <InfoCard title="ترافیک شبکه" description="پیام دقیقه">
            <TraficChart />
          </InfoCard>
        );
      case "deviceList":
        return <DeviceList />;
      case "warningList":
        return <WarningList />;
      case "latestActivites":
        return (
          <InfoCard
            title="فعالیت اخیر"
            description="آخرین رویدادها"
            className="h-full"
          >
            <ScrollAreaSection />
          </InfoCard>
        );
      default:
        return (
          <div className="p-3 bg-gray-200 rounded-lg">
            ویجت ناشناخته: {widget.type}
          </div>
        );
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={`h-fit min-h-[100px] p-6 border-2 border-dashed rounded-xl transition-colors  ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      {/* ۴. کامپوننت حالا از props.widgets استفاده می‌کند */}
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
              className="min-h-[200px] rounded-lg border"
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
