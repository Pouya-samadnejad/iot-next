import DashborderGrid from "@/components/DashboardGrid";
import InfoCard from "@/components/InfoCard";
import PageBuilder from "@/components/PageBuilder";
import { BellDot, Gauge, Server, Wifi } from "lucide-react";

export default function page() {
  const items = [
    {
      title: "آنلاین",
      icon: Wifi,
      value: 4,
      status: "green",
      updated: "10:45",
      online: 4,
      valueColor: "default",
    },
    {
      title: "آفلاین",
      icon: Server,
      value: 2,
      status: "red",
      updated: "10:45",
      valueColor: "error",
    },
    {
      title: "میانکین خطا (ms)",
      icon: Gauge,
      value: 1,
      status: "yellow",
      updated: "10:45",
      valueColor: "warning",
    },
    {
      title: "هشدار  فعال  ",
      icon: BellDot,
      value: 3,
      status: "blue",
      updated: "10:45",
      valueColor: "default",
    },
  ];
  return (
    <main className="p-4">
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {items.map((item) => (
          <InfoCard
            key={item.title}
            icon={<item.icon />}
            title={item.title}
            online={item.online}
            valueColor={item.valueColor}
            footer={`به‌روزشده: ${item.updated}`}
            className="w-full h-full"
          >
            <div className="text-3xl font-bold">{item.value}</div>
          </InfoCard>
        ))}
      </div>
      <DashborderGrid />
    </main>
  );
}
