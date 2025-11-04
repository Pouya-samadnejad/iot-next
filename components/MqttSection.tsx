"use client";

import { useState } from "react";
import InputSection from "@/components/InputSection";
import { Button } from "@/components/ui/button";
import { Cpu, Gauge, ShieldCheck } from "lucide-react";
import InfoCard from "./InfoCard";
import { Toaster, toast } from "sonner";
import { Badge } from "./ui/badge";

export default function MqttSection() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleConnect = () => {
    setConnected(true);
    setMessages([]);
    toast.success("اتصال MQTT با موفقیت برقرار شد ✅");
  };

  const handleSendTest = () => {
    if (!connected) {
      toast.error("ابتدا اتصال برقرار شود ❌");
      return;
    }
    const newMsg = `پیام تست ارسال شد در ${new Date().toLocaleTimeString()}`;
    setMessages([...messages, newMsg]);
    toast(newMsg);
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
    <main className="space-y-5">
      <div>
        {connected ? (
          <Badge
            variant="secondary"
            className="bg-green-600 text-white font-bold"
          >
            Connected
          </Badge>
        ) : (
          <Badge variant="destructive" className="font-bold">
            Disconnected
          </Badge>
        )}
      </div>

      {/* ورودی‌ها */}
      <div className="lg:flex items-center justify-between gap-2">
        <InputSection
          type="text"
          label="Broker (WSS)"
          placeholder="wss://broker.example"
        />
        <InputSection type="text" label="Client ID" placeholder="iot-ui-3223" />
        <InputSection type="text" label="Username" placeholder="demo" />
      </div>

      <div className="flex justify-between gap-2">
        <InputSection type="password" label="Password" placeholder="Password" />
        <div className="flex items-center mt-3 gap-2">
          <Button onClick={handleConnect}>اتصال</Button>
          <Button
            className="bg-neutral-200 text-black hover:bg-neutral-300"
            onClick={handleSendTest}
          >
            ارسال تست
          </Button>
        </div>
      </div>

      <div className="lg:flex justify-between gap-2 ">
        {items.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            icon={<item.icon />}
            className="w-full"
          >
            {item.value}
          </InfoCard>
        ))}
      </div>
      <Toaster position="top-center" richColors />
    </main>
  );
}
