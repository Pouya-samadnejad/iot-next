// components/ui/rssi-status.tsx
import { Wifi, WifiOff, WifiLow } from "lucide-react";

export function RSSIStatus({ rssi }: { rssi: number }) {
  let Icon = Wifi;
  let color = "text-green-500";

  if (rssi < 40) {
    Icon = WifiOff;
    color = "text-red-500";
  } else if (rssi < 70) {
    Icon = WifiLow;
    color = "text-orange-500";
  } else {
    Icon = Wifi;
    color = "text-green-500";
  }

  return (
    <div className="flex items-center gap-1">
      <Icon className={`w-4 h-4 ${color}`} />
      <p>قدرت سیگنال: {rssi}%</p>
    </div>
  );
}
