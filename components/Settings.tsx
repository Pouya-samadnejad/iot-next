"use client";
import InfoCard from "@/components/InfoCard";
import SettingsForm from "@/components/SettingsForm";
import SourceUsageBar from "@/components/SoureceUsageBar";
import { Cpu, Database, Zap } from "lucide-react";
import { useEffect, useState } from "react";
export default function Settings() {
  const [num, setNum] = useState<number>(0);

  function handleNumChange() {
    const newNum = Math.floor(Math.random() * 101);
    setNum(newNum);
  }

  useEffect(() => {
    const interval = setInterval(handleNumChange, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
        <div className="lg:col-span-2 ">
          <InfoCard title="سازمان" description="پیکربندی عمومی پلتفرم">
            <SettingsForm />
          </InfoCard>
        </div>
        <div>
          <div className="h-full">
            <InfoCard
              title="سلامت سامانه"
              description="برآورد منابع"
              className="h-full"
            >
              <SourceUsageBar
                name="Cpu"
                icon={<Cpu className="w-5 h-5" />}
                value={num}
              />
              <SourceUsageBar
                name="RAM"
                icon={<Database className="w-5 h-5" />}
                value={num}
              />
              <SourceUsageBar
                name="IO"
                icon={<Zap className="w-5 h-5" />}
                value={num}
              />
            </InfoCard>
          </div>
        </div>
      </div>
    </main>
  );
}
