"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
// ۱. وارد کردن useState
import { useState } from "react";
// ۲. وارد کردن کامپوننت ساده شده و اینترفیس آن
import Droppable, { DroppableItem } from "./Droppable";
import { SheetSection } from "./SheetSection";

export default function PageBuilder() {
  // ۳. استیت ویجت‌ها به اینجا منتقل شد
  const [widgets, setWidgets] = useState<DroppableItem[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over?.id === "droppable") {
      // ۵. به جای صدا زدن ref، مستقیماً استیت را آپدیت می‌کنیم
      setWidgets((prev) => [
        ...prev,
        {
          id: `${active.id}-${Date.now()}`, // ساخت یک ID یونیک
          type: active.id as string, // active.id همان نوع ویجت است
        },
      ]);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className=" space-y-2  min-h-screen ">
        <SheetSection />
        <main className="flex-1 bg-white rounded-xl h-svh ">
          {/* ۶. کامپوننت Droppable حالا widgets را به عنوان prop می‌گیرد */}
          <Droppable widgets={widgets} />
        </main>
      </div>
    </DndContext>
  );
}
