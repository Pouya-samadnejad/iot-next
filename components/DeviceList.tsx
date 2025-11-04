"use client";
import { useEffect, useState } from "react";
import DeviceCard from "./DeviceCard";
import { useSearchParams, useRouter } from "next/navigation";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { SearchIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";

interface Device {
  device_id: string;
  device_name: string;
  type: string;
  firmware_version: string;
  battery_level: number;
  rssi: number;
  last_seen: string;
  status: boolean;
  power?: boolean;
}

export default function DeviceList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/devices/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setDevices(data.devices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevices();
  }, [query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.trim();
    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <InputGroup className="lg:w-1/4 md:w-1/2 lg:my-2 ">
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

      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : devices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {devices.map((device: Device) => (
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
