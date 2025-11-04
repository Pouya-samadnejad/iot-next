import InfoCard from "@/components/InfoCard";
import MqttSection from "@/components/MqttSection";
import { TempChart } from "@/components/TempChart";
import { TraficChart } from "@/components/TraficChart";
import { ScrollAreaSection } from "@/components/ui/ScrollAreaSection";

export default function Overview() {
  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
        <div className="lg:col-span-2 ">
          <InfoCard
            title="تله متری محیط"
            description="دما و رطوبت آخرین ۵۰ نمونه"
            className="w-full"
          >
            <TempChart />
          </InfoCard>
        </div>
        <div className="h-full">
          <InfoCard title="ترافیک شبکه" description="پیام دقیقه">
            <TraficChart />
          </InfoCard>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 lg:my-4">
        <div className="lg:col-span-2 ">
          <InfoCard title=" MQTT اتصال " description="WebSocket حالت نمایشی">
            <MqttSection />
          </InfoCard>
        </div>
        <div className="h-full">
          <InfoCard
            title="فعالیت اخیر"
            description="آخرین رویدادها"
            className="h-full"
          >
            <ScrollAreaSection />
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
