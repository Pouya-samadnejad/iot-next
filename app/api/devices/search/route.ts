import { NextRequest, NextResponse } from "next/server";
import { useDeviceStore } from "@/store/deviceStore";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase().trim() ?? "";

  // Get devices from the store
  const { devices } = useDeviceStore.getState();

  if (!query) {
    return NextResponse.json({ devices });
  }

  const filteredDevices = devices.filter((device) => {
    const id = String(device.device_id ?? "").toLowerCase();
    const name = String(device.device_name ?? "").toLowerCase();
    const type = String(device.type ?? "").toLowerCase();
    return id.includes(query) || name.includes(query) || type.includes(query);
  });

  return NextResponse.json({ devices: filteredDevices });
}
