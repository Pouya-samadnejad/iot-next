// SortableItem.tsx

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1, // کمی ویجت را محو می‌کند
    // اضافه کردن پدینگ یا مارجین برای بهبود تجربه Drag
    padding: "0px",
    zIndex: isDragging ? 100 : "auto", // برای اینکه ویجت کشیده شده بالای بقیه قرار گیرد
    boxSizing: "border-box",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
