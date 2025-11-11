// SortableItem.js
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

// تعریف نوع Props برای Render Prop
interface SortableItemProps {
  id: string;
  // children اکنون یک تابع است که Propsهای dnd-kit را دریافت و المان فرزند را رندر می‌کند
  children: (sortProps: {
    attributes: any;
    listeners: any;
    style: React.CSSProperties;
  }) => React.ReactNode;
}

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // استایل‌های Transform و Transition برای جابجایی انیمیشنی
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    // رفرنس (ref) و استایل‌ها به عنصر والد SortableItem اعمال می‌شود
    <div ref={setNodeRef} style={style} className="h-full w-full">
      {/* 👈🏼 فراخوانی تابع children و ارسال propsهای dnd-kit */}
      {children({ attributes, listeners, style })}
    </div>
  );
};
