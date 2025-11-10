import DeviceButton from "@/components/DeviceButton";
import DeviceList from "@/components/DeviceList";
import InfoCard from "@/components/InfoCard";


export default function DevicesPage() {
  return (
    <InfoCard
      title="فهرست دستگاه ها"
      description="کنترل سریع و وضعیت سلامت"
      action={
        <DeviceButton/>
     
      }
    >
      <DeviceList />
    </InfoCard>
  );
}
