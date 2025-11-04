import { Progress } from "./ui/progress";

interface SourceUsageBarProps {
  name: string;
  icon: React.ReactNode;
  value: number;
}

export default function SourceUsageBar({
  name,
  icon,
  value,
}: SourceUsageBarProps) {
  return (
    <div className="my-5">
      <div className="flex items-center  justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm">{name}</p>
        </div>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
