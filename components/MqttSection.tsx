"use client";

import { useState } from "react";
import InputSection from "@/components/InputSection";
import { Button } from "@/components/ui/button";
import { Cpu, Gauge, ShieldCheck } from "lucide-react";
import InfoCard from "./InfoCard";
import { Toaster, toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function MqttSection() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از تداخل با درگ ویجت
    setConnected(true);
    setMessages([]);
    toast.success("اتصال MQTT با موفقیت برقرار شد ✅");
  };

  const handleSendTest = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connected) {
      toast.error("ابتدا اتصال برقرار شود ❌");
      return;
    }
    const newMsg = `پیام تست ارسال شد در ${new Date().toLocaleTimeString()}`;
    setMessages([...messages, newMsg]);
    toast(newMsg);
  };

  // جلوگیری از درگ شدن ویجت وقتی کاربر می‌خواهد متنی را در اینپوت انتخاب کند
  const stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const items = [
    {
      title: "Latency",
      icon: Gauge,
      value: connected ? "35 ms" : "-",
    },
    {
      title: "پذیرفته Qos",
      icon: ShieldCheck,
      value: connected ? "96%" : "-",
    },
    {
      title: "Throughput",
      icon: Cpu,
      value: connected ? "81 msg/min" : "-",
    },
  ];

  return (
    // کانتینر اصلی با ارتفاع کامل برای پر کردن ویجت
    <div
      className="h-full w-full flex flex-col space-y-4 p-1 overflow-y-auto"
      onMouseDown={stopPropagation}
    >
      {/* هدر وضعیت */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-700">پنل کنترل</h3>
        {connected ? (
          <Badge
            variant="secondary"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Connected
          </Badge>
        ) : (
          <Badge variant="destructive">Disconnected</Badge>
        )}
      </div>

      {/* فرم ورودی‌ها */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div onMouseDown={stopPropagation}>
            <InputSection
              type="text"
              label="Broker (WSS)"
              placeholder="wss://broker.example"
            />
          </div>
          <div onMouseDown={stopPropagation}>
            <InputSection
              type="text"
              label="Client ID"
              placeholder="iot-ui-3223"
            />
          </div>
          <div onMouseDown={stopPropagation}>
            <InputSection type="text" label="Username" placeholder="demo" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
          <div onMouseDown={stopPropagation}>
            <InputSection
              type="password"
              label="Password"
              placeholder="Password"
            />
          </div>

          <div className="flex gap-2 pb-1">
            <Button
              onClick={handleConnect}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              اتصال
            </Button>
            <Button
              onClick={handleSendTest}
              variant="outline"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-black border-gray-300"
              size="sm"
            >
              ارسال تست
            </Button>
          </div>
        </div>
      </div>

      {/* کارت‌های اطلاعات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
        {items.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            icon={<item.icon className="w-4 h-4 text-gray-500" />}
            className="text-xs p-2"
          >
            <span className="text-sm font-bold text-gray-800">
              {item.value}
            </span>
          </InfoCard>
        ))}
      </div>

      {/* لاگ پیام‌ها (فقط اگر پیامی باشد نمایش داده می‌شود) */}
      {messages.length > 0 && (
        <div className="mt-2 bg-gray-900 text-green-400 p-2 rounded text-xs font-mono h-24 overflow-y-auto border border-gray-700 shadow-inner">
          {messages.map((m, i) => (
            <div key={i}>$ {m}</div>
          ))}
        </div>
      )}

      {/* نوتیفیکیشن */}
      {/* توجه: بهتر است Toaster را در layout اصلی بگذارید، نه داخل هر ویجت */}
      {/* <Toaster position="top-center" richColors /> */}
    </div>
  );
}
