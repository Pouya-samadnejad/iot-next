import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

/* --------------------------------------------
   🧩 ۱. تعریف Type مربوط به Device
--------------------------------------------- */
export interface Device {
  device_id: string;
  device_name: string;
  status: boolean;
  type: string;
  firmware_version: string;
  battery_level: number;
  rssi: number;
  last_seen: string;
  power: boolean;
}

/* --------------------------------------------
   ⚙️ ۲. تعریف نوع Store (State + Actions)
--------------------------------------------- */
interface DeviceStore {
  devices: Device[];
  addDevice: (device: Omit<Device, "device_id">) => void;
  editDevice: (device_id: string, updatedDevice: Partial<Device>) => void;
  deleteDevice: (device_id: string) => void;
}

/* --------------------------------------------
   💾 ۳. ساخت استور Zustand با persist
--------------------------------------------- */
export const useDeviceStore = create<DeviceStore>()(
  persist(
    (set) => ({
      devices: [
        {
          device_id: "dev-1000",
          device_name: "Sensor 1",
          status: true,
          type: "Temp/Humidity",
          firmware_version: "v2.5.4",
          battery_level: 66,
          rssi: 20,
          last_seen: "2025-10-14T01:43:00Z",
          power: true,
        },
        {
          device_id: "dev-1001",
          device_name: "Sensor 2",
          status: true,
          type: "Temp/Humidity",
          firmware_version: "v2.5.4",
          battery_level: 81,
          rssi: 59,
          last_seen: "2025-10-14T01:42:30Z",
          power: true,
        },
        {
          device_id: "dev-1002",
          device_name: "Sensor 3",
          status: false,
          type: "Temp/Humidity",
          firmware_version: "v2.5.3",
          battery_level: 40,
          rssi: 85,
          last_seen: "2025-10-14T00:58:14Z",
          power: false,
        },
        {
          device_id: "dev-1003",
          device_name: "Sensor 4",
          status: true,
          type: "Temp/Humidity",
          firmware_version: "v2.5.5",
          battery_level: 92,
          rssi: 63,
          last_seen: "2025-10-14T01:44:10Z",
          power: true,
        },
        {
          device_id: "dev-1004",
          device_name: "Sensor 5",
          status: true,
          type: "Temp/Humidity",
          firmware_version: "v2.5.4",
          battery_level: 57,
          rssi: 72,
          last_seen: "2025-10-14T01:41:25Z",
          power: true,
        },
      ],

      addDevice: (device) =>
        set((state) => ({
          devices: [...state.devices, { ...device, device_id: nanoid() }],
        })),

      editDevice: (device_id, updatedDevice) =>
        set((state) => ({
          devices: state.devices.map((d) =>
            d.device_id === device_id ? { ...d, ...updatedDevice } : d
          ),
        })),

      deleteDevice: (device_id) =>
        set((state) => ({
          devices: state.devices.filter((d) => d.device_id !== device_id),
        })),
    }),
    { name: "iot-device-storage" }
  )
);
