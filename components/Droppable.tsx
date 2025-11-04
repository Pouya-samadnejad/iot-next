"use client";

import { useDroppable } from "@dnd-kit/core";
import { forwardRef, useImperativeHandle, useState, Fragment } from "react";
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

interface DroppableItem {
  id: string;
  type: string;
}

export interface DroppableRef {
  addWidget: (type: string) => void;
}

const Droppable = forwardRef<DroppableRef>((_, ref) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const [widgets, setWidgets] = useState<DroppableItem[]>([]);

  useImperativeHandle(ref, () => ({
    addWidget(type: string) {
      setWidgets((prev) => [...prev, { id: `${type}-${Date.now()}`, type }]);
    },
  }));

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
      className={`h-fit p-6 border-2 border-dashed rounded-xl transition-colors  ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
    >
      {widgets.length === 0 ? (
        <p className="text-gray-400 text-center">
          ویجت‌ها را از پنل بکشید و در اینجا رها کنید
        </p>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] grid grid-cols-2 rounded-lg"
        >
          {widgets.map((w, index) => (
            <Fragment key={w.id}>
              <ResizablePanel
                defaultSize={100 / widgets.length}
                minSize={25}
                className="p-2"
              >
                {renderWidget(w)}
              </ResizablePanel>
              {index < widgets.length - 1 && (
                <ResizableHandle className="mx-1" />
              )}
            </Fragment>
          ))}
        </ResizablePanelGroup>
      )}
    </div>
  );
});

Droppable.displayName = "Droppable";
export default Droppable;
