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
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import { SheetSection } from "./SheetSection";
import { useWidgetStore } from "@/store/useWidgetStore";

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export default function PageBuilder() {
  const { widgets, addWidget, reorderWidgets } = useWidgetStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // ۱. اضافه کردن ویجت جدید به Droppable
    if (over?.id === "droppable") {
      addWidget(active.id as string);
    }
    // ۲. مرتب‌سازی (Sorting)
    else if (active.id !== over?.id) {
      const activeId = active.id.toString();
      const overId = over?.id.toString();

      const chunkedWidgets = chunkArray(widgets, 2);
      const rowIds = chunkedWidgets
        .map((row) => row[0]?.id)
        .filter((id) => id !== undefined);

      const oldRowIndex = rowIds.indexOf(activeId);
      const newRowIndex = rowIds.indexOf(overId);

      if (oldRowIndex !== -1 && newRowIndex !== -1) {
        const newChunkedWidgets = arrayMove(
          chunkedWidgets,
          oldRowIndex,
          newRowIndex,
        );

        reorderWidgets(newChunkedWidgets.flat().filter(Boolean));
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2 min-h-screen">
        <SheetSection />
        <main className="flex-1 rounded-xl h-svh">
          <Droppable />
        </main>
      </div>
    </DndContext>
  );
}
