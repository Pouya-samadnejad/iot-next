import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDeviceStore } from "@/store/deviceStore";
import type { Device } from "@/store/deviceStore";

interface DeviceFormProps {
  device?: Device;
  onSubmitSuccess?: () => void;
}

export default function DeviceForm({ device, onSubmitSuccess }: DeviceFormProps) {
  const { addDevice, editDevice } = useDeviceStore();

  // تابع ارسال فرم
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // تبدیل مقادیر به نوع مناسب
    const payload = {
      device_name: (data.device_name as string) ?? "",
      type: (data.type as string) ?? "",
      firmware_version: (data.firmware_version as string) ?? "",
      battery_level: Number(data.battery_level ?? 0),
      rssi: Number(data.rssi ?? 0),
      status: !!data.status,
      power: !!data.power,
    };

    if (device) {
      editDevice(device.device_id, payload);
    } else {
      addDevice({ ...payload, last_seen: new Date().toISOString() });
      e.currentTarget.reset(); // پاک کردن فرم بعد از ثبت
    }

    // فراخوانی تابع callback در صورت وجود
    onSubmitSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 mt-4">
      <Field>
        <FieldLabel>نام دستگاه</FieldLabel>
        <Input
          name="device_name"
          placeholder="مثلاً: سنسور دما"
          required
          defaultValue={device?.device_name}
        />
      </Field>

      <Field>
        <FieldLabel>نوع دستگاه</FieldLabel>
        <Input name="type" placeholder="مثلاً: ESP32" defaultValue={device?.type} />
      </Field>

      <Field>
        <FieldLabel>نسخه فریمور</FieldLabel>
        <Input name="firmware_version" placeholder="مثلاً: v1.2.0" defaultValue={device?.firmware_version} />
      </Field>

      <Field>
        <FieldLabel>باتری (%)</FieldLabel>
        <Input name="battery_level" type="number" placeholder="0-100" defaultValue={device?.battery_level}
        />
      </Field>

      <Field>
        <FieldLabel>RSSI</FieldLabel>
        <Input name="rssi" type="number" placeholder="مثلاً: -65" defaultValue={device?.rssi}
        />
      </Field>

      <Field>
        <FieldLabel>وضعیت</FieldLabel>
        <FieldGroup className="gap-2">
          <label className="flex items-center gap-2">
            <Checkbox name="status" defaultChecked={device?.status} />
            <span>فعال</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox name="power" defaultChecked={device?.power} />
            <span>پاور روشن</span>
          </label>
        </FieldGroup>
      </Field>

      <div className="col-span-2 flex justify-end gap-2 mt-4">
        <Button type="submit">{device ? "ذخیره" : "ثبت"}</Button>
      </div>
    </form>
  );
}

