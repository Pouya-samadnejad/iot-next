"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useRef } from "react";
import Droppable, { DroppableRef } from "./Droppable";
import { SheetSection } from "./SheetSection";

export default function PageBuilder() {
  const droppableRef = useRef<DroppableRef>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over?.id === "droppable") {
      droppableRef.current?.addWidget(active.id);
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className=" space-y-2  min-h-screen ">
        <SheetSection />
        <main className="flex-1 bg-white rounded-xl h-svh ">
          <Droppable ref={droppableRef} />
        </main>
      </div>
    </DndContext>
  );
}
