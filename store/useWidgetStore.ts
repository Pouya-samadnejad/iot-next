import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DroppableItem {
  id: string;
  type: string;
  x?: number;
  y?: number;
  w?: number; // عرض
  h?: number; // ارتفاع
}

interface WidgetStore {
  widgets: DroppableItem[];
  addWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (newWidgets: DroppableItem[]) => void;
  clearWidgets: () => void;
}

export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set) => ({
      widgets: [],
      addWidget: (type) =>
        set((state) => ({
          widgets: [...state.widgets, { id: `${type}-${Date.now()}`, type }],
        })),
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
      reorderWidgets: (newWidgets) => set({ widgets: newWidgets }),
      clearWidgets: () => set({ widgets: [] }),
    }),
    {
      name: "widget-storage", // کلید ذخیره در localStorage
    },
  ),
);
