import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Cpu, MoreHorizontal, PenBox, Server, Trash2Icon } from "lucide-react";
import BatteryStatus from "./BatteryStatus";
import { RSSIStatus } from "./RssiStatus";
import { useDeviceStore } from "@/store/deviceStore";
import DialogSection from "@/components/DialogSection";
import DeviceForm from "@/components/DeviceForm";

interface DeviceCardProps {
  name: string;
  id: string;
  type: string;
  version: string;
  battery: number;
  rssi: number;
  last_seen: string;
  status: boolean;
  power?: boolean;
}

export default function DeviceCard({
  name,
  id,
  type,
  version,
  battery,
  rssi,
  last_seen,
  status,
  power = false,
}: DeviceCardProps) {
  const [isPowerOn, setIsPowerOn] = useState(power);
  const [loading, setLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // شبیه‌سازی تغییر وضعیت سرور
  const simulateServerToggle = () => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 600); // شبیه‌سازی 600ms تاخیر
    });
  };

  const handlePowerToggle = async () => {
    const newState = !isPowerOn;
    setIsPowerOn(newState);
    try {
      await simulateServerToggle();
    } catch (err) {
      setIsPowerOn(!newState);
      console.error("Simulated toggle failed:", err);
    }
  };

  const { deleteDevice } = useDeviceStore();

  return (
    <Card className="animate-in fade-in zoom-in-95 duration-300 my-3 lg:my-0">
      <CardHeader>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {status ? (
              <Badge
                variant="secondary"
                className="bg-green-500 text-white ml-2 my-1.5"
              >
                آنلاین
              </Badge>
            ) : (
              <Badge variant="destructive" className="ml-2 my-1.5">
                آفلاین
              </Badge>
            )}
            <span className="text-muted-foreground text-sm ml-2">{id}</span>
          </CardDescription>
        </div>

        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-muted transition">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsEditOpen(true);
                }}
              >
                <PenBox className="w-4 h-4 " />
                ویرایش
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteOpen(true);
                }}
              >
                <Trash2Icon className="w-4 h-4 " />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="md:grid grid-cols-2 gap-4 text-sm space-y-2.5">
          <div className="flex items-center gap-1">
            <Cpu className="w-4 h-4" />
            <p>نوع: {type}</p>
          </div>

          <div className="flex items-center gap-1">
            <Server className="w-4 h-4" />
            <p>Firmware: {version}</p>
          </div>

          <BatteryStatus battery={battery} />

          <div className="flex items-center gap-1">
            <RSSIStatus rssi={rssi} />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="md:flex justify-between w-full items-center text-sm">
          <p>آخرین مشاهده: {last_seen}</p>
          <div className="flex items-center gap-2">
            <p>قدرت</p>
            <Switch
              checked={isPowerOn}
              onCheckedChange={handlePowerToggle}
              disabled={loading}
              dir="rtl"
            />
          </div>
        </div>
      </CardFooter>
      <DialogSection
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="ویرایش دستگاه"
        description="اطلاعات دستگاه را ویرایش کنید"
      >
        <DeviceForm
          device={{
            device_id: id,
            device_name: name,
            status,
            type,
            firmware_version: version,
            battery_level: battery,
            rssi,
            last_seen,
            power: power ?? false,
          }}
          onSubmitSuccess={() => setIsEditOpen(false)}
        />
      </DialogSection>

      {/* Delete Confirmation Dialog */}
      <DialogSection
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="حذف دستگاه"
        description="آیا از حذف این دستگاه اطمینان دارید؟"
      >
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">dev-{id}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            این عملیات غیرقابل بازگشت است و تمام اطلاعات دستگاه حذف خواهد شد.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              انصراف
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteDevice(id);
                setIsDeleteOpen(false);
              }}
            >
              حذف دستگاه
            </Button>
          </div>
        </div>
      </DialogSection>
    </Card>
  );
}
