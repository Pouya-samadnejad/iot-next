import DeviceList from "@/components/DeviceList";
import DeviceSearchBar from "@/components/DeviceSearchBar";

export default function DevicesPage() {
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">لیست دستگاه‌ها</h1>
      </div>

      <DeviceList />
    </main>
  );
}
