"use client";
import InfoCard from "@/components/InfoCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import WarningCard from "@/components/WarningCard";
import { useState, useEffect } from "react";

// تابع ساده برای تولید هشدار تصادفی
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const severities = ["Low", "Medium", "High"];
const badgeMap: Record<string, string> = {
  Low: "neutral",
  Medium: "warning",
  High: "destructive",
};

function uniqueId(prefix = "dev") {
  return prefix + Math.floor(Math.random() * 90000 + 1000);
}

function formatTimeOffset(minutesAgo: number) {
  const d = new Date(Date.now() - minutesAgo * 60000);
  return d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
}

function generateAlerts(count = 5) {
  return Array.from({ length: count }, () => {
    const severity = severities[randInt(0, severities.length - 1)];
    const nSensors = randInt(1, 12);
    const id = uniqueId();
    const minutesAgo = randInt(1, 720);

    return {
      id,
      severity,
      badgeVariant: badgeMap[severity],
      title: `آفلاین شد ${nSensors} Sensor`,
      time: formatTimeOffset(minutesAgo),
      description: `اخیراً پاسخ نداده است ${id} - شناسه`,
      count: nSensors,
    } as const;
  });
}

export default function WarningList() {
  const [warningData, setWarningData] = useState(generateAlerts(7));

  const severityOrder: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newCount = randInt(1, 5);
      const newAlerts = generateAlerts(newCount);

      setWarningData((prev) => {
        const merged = [...newAlerts, ...prev];

        const seen = new Set<string>();
        const dedup: typeof merged = [];
        for (const a of merged) {
          if (!seen.has(a.id)) {
            seen.add(a.id);
            dedup.push(a);
          }
        }

        const MAX_ITEMS = 50;
        const limited = dedup.slice(0, MAX_ITEMS);

        return limited;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const sortedAlert = [...warningData].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <InfoCard title="هشدارها" description="اولویت بندی خودکار">
      <ScrollArea className="h-96">
        {sortedAlert.map((warning) => (
          <WarningCard
            key={warning.id}
            severity={warning.severity}
            title={warning.title}
            time={warning.time}
            description={warning.description}
          />
        ))}
      </ScrollArea>
    </InfoCard>
  );
}
