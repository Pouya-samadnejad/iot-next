"use client";

import { useMemo } from "react";
import DeviceCard from "./DeviceCard";
import { useSearchParams, useRouter } from "next/navigation";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";
import { useDeviceStore } from "@/store/deviceStore";

export default function DeviceList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const allDevices = useDeviceStore((state) => state.devices);

  // مدیریت جستجوی URL
  const query = searchParams.get("q") ?? "";

  // فیلتر و جستجو
  const filteredDevices = useMemo(() => {
    if (!query) return allDevices;

    const lowerQuery = query.toLowerCase();
    return allDevices.filter(
      (device) =>
        device.device_name.toLowerCase().includes(lowerQuery) ||
        device.device_id.toLowerCase().includes(lowerQuery) ||
        device.type.toLowerCase().includes(lowerQuery),
    );
  }, [allDevices, query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trim();
    const params = new URLSearchParams(searchParams);

    if (newQuery) params.set("q", newQuery);
    else params.delete("q");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <InputGroup className="lg:w-1/4 md:w-1/2 lg:my-2">
        <InputGroupInput
          type="text"
          placeholder="جستجو دستگاه / نوع / شناسه"
          className="text-right"
          value={query}
          onChange={handleSearch}
          aria-label="Search devices"
        />
        <InputGroupAddon className="pr-2">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      {filteredDevices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.device_id}
              id={device.device_id}
              name={device.device_name}
              type={device.type}
              version={device.firmware_version}
              battery={device.battery_level}
              rssi={device.rssi}
              last_seen={device.last_seen}
              status={device.status}
              power={device.power}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">دستگاهی یافت نشد.</p>
      )}
    </div>
  );
}
