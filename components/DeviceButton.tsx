"use client";
import { toast, Toaster } from "sonner";
import { Button } from "./ui/button";
import { Earth, ScanLine } from "lucide-react";
import DialogSection from "./DialogSection";
import { DialogTrigger } from "@radix-ui/react-dialog";
import DeviceForm from "./DeviceForm";

export default function DeviceButton() {
  return (
    <div className="md:flex gap-2 space-y-2 lg:space-y-0 items-center">
      <Button
        className="shadow flex items-center gap-1"
        onClick={() =>
          toast.success(
            "شبیه‌سازی Provision از راه دور: دستگاه جدید شناسایی شد",
          )
        }
      >
        از راه دور Provision <Earth />
      </Button>

      <DialogSection
        trigger={
          <DialogTrigger>
            <div className="bg-neutral-200 text-black hover:bg-neutral-300 shadow flex items-center py-1 px-1.5 rounded-sm ">
              افزودن دستگاه <ScanLine />
            </div>
          </DialogTrigger>
        }
        title="افزودن دستگاه جدید"
        description="اطلاعات دستگاه جدید را وارد کنید"
      >
        <DeviceForm />
      </DialogSection>
      <Toaster position="top-center" richColors />
    </div>
  );
}
