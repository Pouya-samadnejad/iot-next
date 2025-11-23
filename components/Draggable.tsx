"use client";

import React, { DragEvent } from "react";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    // ست کردن داده‌ها
    e.dataTransfer.setData("widget-id", id);
    e.dataTransfer.effectAllowed = "copy";
    console.log("Drag Started:", id); // برای تست
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      className="cursor-grab mb-3 p-2 border rounded bg-white shadow-sm hover:bg-gray-50"
      style={{ zIndex: 1000 }}
    >
      {children}
    </div>
  );
};
