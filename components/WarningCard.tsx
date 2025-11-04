import { Badge } from "./ui/badge";
import { Card, CardDescription } from "./ui/card";

interface WarningCardProps {
  severity: string;
  title: string;
  time: string;
  description: string;
}

export default function WarningCard({
  severity,
  title,
  time,
  description,
}: WarningCardProps) {
  const badge = (severity: string) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return (
          <Badge variant="secondary" className="bg-yellow-500 text-white">
            Medium
          </Badge>
        );
      case "Low":
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="px-4 py-2 my-2 animate-in slide-in-from-right-10 fade-in duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {badge(severity)}
          <p>{title}</p>
        </div>
        <div>
          <span>{time}</span>
        </div>
      </div>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}
