"use client";
import * as React from "react";
import { useState, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ScrollAreaSectionProps {
  autoGenerate?: boolean;
  interval?: number;
}

export function ScrollAreaSection({
  autoGenerate = true,
  interval = 5000,
}: ScrollAreaSectionProps) {
  const [messages, setMessages] = useState<string[]>([]);

  const randomMessages = [
    "اتصال جدید از دستگاه ESP32",
    "داده‌های حسگر دما دریافت شد",
    "هشدار: باتری ضعیف",
    "پیام MQTT ارسال شد",
    "دستگاه آنلاین شد",
    "بروزرسانی firmware تکمیل شد",
    "خطا در اتصال شبکه",
    "داده‌های رطوبت ارسال شد",
    "دستگاه آفلاین شد",
    "پیام تست دریافت شد",
    "تنظیمات جدید اعمال شد",
    "اتصال WiFi برقرار شد",
    "داده‌های فشار هوا دریافت شد",
    "هشدار: حافظه پر",
    "پیام پینگ ارسال شد",
  ];

  const generateRandomMessage = () => {
    const randomMsg =
      randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const timestamp = new Date().toLocaleTimeString("fa-IR");
    return `${randomMsg} - ${timestamp}`;
  };

  useEffect(() => {
    if (!autoGenerate) return;

    const initialMessages = Array.from({ length: 1 }, generateRandomMessage);
    setMessages(initialMessages);

    const intervalId = setInterval(() => {
      setMessages((prev) => {
        const newMsg = generateRandomMessage();
        return [newMsg, ...prev].slice(0, 20); // Keep only last 20 messages
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [autoGenerate, interval]);

  return (
    <ScrollArea className="h-84 w-full" dir="rtl">
      <div className="space-y-2">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            هنوز فعالیتی ثبت نشده
          </p>
        ) : (
          messages.map((msg, idx) => (
            <React.Fragment key={idx}>
              <div className="flex justify-between items-center text-sm animate-in slide-in-from-right-10 fade-in duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-600 rounded-full" />
                  <span>{msg}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString("fa-IR")}
                </span>
              </div>
              {idx < messages.length - 1 && <Separator className="my-2" />}
            </React.Fragment>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
