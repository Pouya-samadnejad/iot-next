"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  closestCenter,
} from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import { SheetSection } from "./SheetSection";
import { DroppableItem } from "./DroppableItem"; // ⬅️ وارد کردن اینترفیس

// تابع کمکی برای تقسیم آرایه به ردیف‌های ۲تایی (برای مرتب‌سازی ردیف‌ها)
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export default function PageBuilder() {
  const [widgets, setWidgets] = useState<DroppableItem[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleRemoveWidget = (idToRemove: string) => {
    // به‌روزرسانی State با فیلتر کردن ویجت مورد نظر
    setWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== idToRemove),
    );
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // ۱. اضافه کردن ویجت جدید به منطقه دراپ (Droppable)
    if (over?.id === "droppable") {
      setWidgets((prev) => [
        ...prev,
        {
          id: `${active.id}-${Date.now()}`, // ساخت یک ID یونیک
          type: active.id as string, // active.id همان نوع ویجت است
        },
      ]);
    }
    // ۲. مرتب‌سازی (Sorting) ردیف‌ها
    else if (active.id !== over?.id) {
      const activeId = active.id.toString();
      const overId = over?.id.toString();

      // ایجاد ساختار ردیفی فعلی
      const chunkedWidgets = chunkArray(widgets, 2);

      // پیدا کردن ID اولین ویجت در هر ردیف (که به عنوان ID ردیف در SortableItem استفاده شده)
      const rowIds = chunkedWidgets
        .map((row) => row[0]?.id)
        .filter((id) => id !== undefined);

      const oldRowIndex = rowIds.indexOf(activeId);
      const newRowIndex = rowIds.indexOf(overId);

      // تنها در صورتی که IDها در لیست IDهای ردیف وجود داشته باشند، مرتب‌سازی ردیف‌ها انجام می‌شود.
      if (oldRowIndex !== -1 && newRowIndex !== -1) {
        // جابه‌جایی ردیف‌ها
        const newChunkedWidgets = arrayMove(
          chunkedWidgets,
          oldRowIndex,
          newRowIndex,
        );

        // برگرداندن به آرایه تخت widgets
        const newWidgets = newChunkedWidgets.flat().filter((w) => w); // فیلتر کردن null/undefined

        setWidgets(newWidgets);
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className=" space-y-2 min-h-screen ">
        <SheetSection />
        <main className="flex-1 rounded-xl h-svh ">
          <Droppable widgets={widgets} onRemoveWidget={handleRemoveWidget} />
        </main>
      </div>
    </DndContext>
  );
}
