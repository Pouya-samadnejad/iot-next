import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface InfoCardSkeletonProps {
  className?: string;
  showFooter?: boolean;
  showAction?: boolean;
}

export default function InfoCardSkeleton({
  className = "",
  showFooter = false,
  showAction = true,
}: InfoCardSkeletonProps) {
  return (
    <Card className={`my-2 lg:my-0 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-md" />
            <CardTitle>
              <Skeleton className="h-5 w-28" />
            </CardTitle>
          </div>
          {showAction && (
            <CardAction>
              <Skeleton className="h-8 w-20 rounded-md" />
            </CardAction>
          )}
        </div>
        <CardDescription>
          <Skeleton className="h-4 w-40" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-8 w-2/3" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardContent>

      {showFooter && (
        <CardFooter>
          <Skeleton className="h-3 w-24" />
        </CardFooter>
      )}
    </Card>
  );
}


