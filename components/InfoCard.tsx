import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction, // فرض بر این است که این در ui/card شما وجود دارد
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils"; // اگر cn ندارید، می‌توانید دستی کلاس‌ها را ترکیب کنید

interface InfoCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: string;
  action?: ReactNode;
  online?: number;
  valueColor?: "default" | "success" | "warning" | "error";
  className?: string;
}

export default function InfoCard({
  title = "",
  description = "",
  icon,
  children,
  footer,
  action,
  online,
  valueColor = "default",
  className = "",
}: InfoCardProps) {
  const valueColorClass = {
    default: "text-foreground",
    success: "text-green-600",
    warning: "text-yellow-500",
    error: "text-red-600",
  }[valueColor];

  return (
    <Card
      // حذف مارجین‌های عمودی پیش‌فرض و اضافه کردن shadow-sm برای سبکی بیشتر در ویجت
      className={cn(
        "w-full h-full shadow-sm border-gray-200 animate-in fade-in zoom-in-95 duration-300",
        className,
      )}
    >
      {/* استفاده از p-3 برای کاهش فضای خالی هدر */}
      <CardHeader className="p-3 pb-1 space-y-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            {/* آیکون کمی کوچک‌تر شود */}
            <div className="[&>svg]:w-4 [&>svg]:h-4">{icon}</div>
            <CardTitle>{title}</CardTitle>
          </div>

          {/* اکشن‌ها (مثل آنلاین بودن) */}
          <div>
            {action ? (
              <CardAction>{action}</CardAction>
            ) : online !== undefined ? (
              <CardAction>
                <Badge variant="outline" className="text-[10px] px-1 h-5 gap-1">
                  <span className="bg-green-600 w-2 h-2 rounded-full inline-block"></span>
                  {online}
                </Badge>
              </CardAction>
            ) : null}
          </div>
        </div>

        {description && (
          <CardDescription className="text-xs mt-1">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      {/* محتوای اصلی با فونت درشت و فضای مناسب */}
      <CardContent className={cn("p-3 pt-1", valueColorClass)}>
        <div className="text-lg font-bold tracking-tight">{children}</div>
      </CardContent>

      {footer && (
        <CardFooter className="p-3 pt-0 text-[10px] text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
