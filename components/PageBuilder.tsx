"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Droppable from "./Droppable";
import { SheetSection } from "./SheetSection";
import { useWidgetStore } from "@/store/useWidgetStore";

export default function PageBuilder() {
  const { widgets, addWidget, reorderWidgets } = useWidgetStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const validTypes = [
    "mqtt",
    "temp/humidity",
    "trafficChart",
    "deviceList",
    "warningList",
    "latestActivities",
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // اضافه کردن ویجت جدید
    if (over.id === "droppable" && validTypes.includes(active.id as string)) {
      addWidget(active.id as string);
      return;
    }

    // جابه‌جایی ویجت‌های موجود
    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updated = arrayMove(widgets, oldIndex, newIndex);
      reorderWidgets(updated);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2 min-h-screen">
        <SheetSection />
        <main className="flex-1 rounded-xl h-svh">
          <SortableContext
            items={widgets.map((w) => w.id)}
            strategy={verticalListSortingStrategy}
          >
            <Droppable />
          </SortableContext>
        </main>
      </div>
    </DndContext>
  );
}
