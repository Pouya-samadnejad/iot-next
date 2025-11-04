import { BatteryFull, BatteryMedium, BatteryLow } from "lucide-react";

function BatteryStatus({ battery }: { battery: number }) {
  let Icon = BatteryFull;
  let color = "text-green-500";

  if (battery < 20) {
    Icon = BatteryLow;
    color = "text-red-500";
  } else if (battery < 50) {
    Icon = BatteryMedium;
    color = "text-orange-500";
  } else {
    Icon = BatteryFull;
    color = "text-green-500";
  }

  return (
    <div className="flex items-center gap-1">
      <Icon className={`w-4 h-4 ${color}`} />
      <p>باتری: {battery}%</p>
    </div>
  );
}

export default BatteryStatus;
