"use client";

import { useDroppable } from "@dnd-kit/core";
import { Fragment, useState } from "react";
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
import { Badge } from "./ui/badge";

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
const Droppable = ({
  widgets,
  onRemoveWidget,
}: {
  widgets: DroppableItem[];
  onRemoveWidget: (id: string) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  const handleClose = (id: string) => {
    onRemoveWidget(id);
  };

  // ۳. استیت (useState) از اینجا حذف شد

  function renderWidget(widget: DroppableItem) {
    switch (widget.type) {
      case "mqtt":
        return (
          <InfoCard
            title=" MQTT اتصال "
            description="WebSocket حالت نمایشی"
            className="h-full"
            action={
              <Button
                className="w-5 h-5 rounded-full"
                variant="ghost"
                onClick={() => handleClose(widget.id)}
              >
                <XIcon />
              </Button>
            }
          >
            <MqttSection />
          </InfoCard>
        );
      case "temp/humidity":
        return (
          <InfoCard
            title="تله متری محیط"
            description="دما و رطوبت آخرین ۵۰ نمونه"
            className="w-full h-full"
            action={
              <Button
                className="w-5 h-5 rounded-full"
                variant="ghost"
                onClick={() => handleClose(widget.id)}
              >
                <XIcon />
              </Button>
            }
          >
            <TempChart />
          </InfoCard>
        );
      case "trafficChart":
        return (
          <InfoCard
            title="ترافیک شبکه"
            description="پیام دقیقه"
            className="w-full h-full"
            action={
              <Button
                className="w-5 h-5 rounded-full"
                variant="ghost"
                onClick={() => handleClose(widget.id)}
              >
                <XIcon />
              </Button>
            }
          >
            <TraficChart />
          </InfoCard>
        );
      case "deviceList":
        return (
          <InfoCard
            title="لیست دستگاه ها"
            className="w-full h-full"
            action={
              <Button
                className="w-5 h-5 rounded-full"
                variant="ghost"
                onClick={() => handleClose(widget.id)}
              >
                <XIcon />
              </Button>
            }
          >
            <DeviceList />
          </InfoCard>
        );
      case "warningList":
        return (
          <InfoCard
            title="هشدارها"
            description="اولویت بندی خودکار"
            className="w-full h-full"
            action={
              <Button
                className="w-5 h-5 rounded-full"
                variant="ghost"
                onClick={() => handleClose(widget.id)}
              >
                <XIcon />
              </Button>
            }
          >
            <WarningList />
          </InfoCard>
        );
      case "latestActivites":
        return (
          <InfoCard
            title="فعالیت اخیر"
            description="آخرین رویدادها"
            className="h-full"
            action={
              <Button
                className="w-5 h-5 rounded-full"
                variant="ghost"
                onClick={() => handleClose(widget.id)}
              >
                <XIcon />
              </Button>
            }
          >
            <ScrollAreaSection />
          </InfoCard>
        );
      default:
        return (
          <div className="p-3 bg-gray-200 h-1/2 rounded-lg">
            ویجت ناشناخته: {widget.type}
          </div>
        );
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={` min-h-1/2 p-6 border border-dashed rounded-xl  transition-colors  ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200 h-fit"
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
              className="min-h-[200px] rounded-lg "
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
