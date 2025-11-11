// Droppable.js
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
// 💡 اضافه کردن آیکون برای Drag Handle
import { XIcon, MoreVertical } from "lucide-react";
import { useWidgetStore } from "@/store/useWidgetStore";
import { SortableItem } from "./SortableItem";

// تابع کمکی برای تقسیم آرایه به ردیف‌های ۲تایی
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

const Droppable = () => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const { widgets, removeWidget } = useWidgetStore();

  // 💡 این تابع اکنون sortProps را برای اعمال listeners می‌پذیرد
  const renderWidget = (
    widget: { id: string; type: string },
    sortProps: { attributes: any; listeners: any },
  ) => {
    // --- دکمه حذف (با توقف رویداد) ---
    const removeButton = (
      <Button
        className="w-5 h-5 rounded-full"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation(); // 👈🏼 توقف انتشار به SortableItem
          e.preventDefault(); // 👈🏼 جلوگیری از تداخل با شروع Drag
          removeWidget(widget.id);
        }}
      >
        <XIcon size={14} />
      </Button>
    );

    // --- Drag Handle (فقط برای شروع درگ) ---
    const dragHandle = (
      <Button
        className="w-5 h-5 rounded-full touch-none"
        variant="ghost"
        {...sortProps.attributes} // 👈🏼 اعمال attributes برای Accessibility
        {...sortProps.listeners} // 👈🏼 اعمال listeners برای شروع Drag (فقط با کلیک روی این دکمه)
      >
        <MoreVertical size={14} className="cursor-grab" />
      </Button>
    );

    // ترکیب دکمه‌ها در یک Action بار
    const combinedActions = (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {dragHandle}
        {removeButton}
      </div>
    );

    switch (widget.type) {
      case "mqtt":
        return (
          <InfoCard
            title="اتصال MQTT"
            description="WebSocket حالت نمایشی"
            className="h-full"
            action={combinedActions}
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
            action={combinedActions}
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
            action={combinedActions}
          >
            <TraficChart />
          </InfoCard>
        );

      case "deviceList":
        return (
          <InfoCard
            title="لیست دستگاه‌ها"
            className="w-full h-full"
            action={combinedActions}
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
            action={combinedActions}
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
            action={combinedActions}
          >
            <ScrollAreaSection />
          </InfoCard>
        );

      default:
        return (
          <InfoCard action={combinedActions}>
            ویجت ناشناخته: {widget.type}
          </InfoCard>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[400px] border-2 border-dashed rounded-xl transition-colors ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      {widgets.length === 0 ? (
        <p className="text-gray-400 text-center p-8">
          ویجت‌ها را از پنل بکشید و در اینجا رها کنید
        </p>
      ) : (
        <div className="flex flex-col gap-4 p-4">
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
                    className="p-1" // کمی فضای داخلی کمتر
                  >
                    {/* 👈🏼 استفاده از SortableItem به عنوان Render Prop */}
                    <SortableItem id={w.id}>
                      {({ attributes, listeners }) =>
                        // 👈🏼 ارسال attributes و listeners به renderWidget
                        renderWidget(w, { attributes, listeners })
                      }
                    </SortableItem>
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
