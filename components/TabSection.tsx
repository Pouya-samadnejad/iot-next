import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DeviceList from "./DeviceList";
import Overview from "./Overview";
import WarningList from "./WarningList";
import Settings from "./Settings";
export default function TabSection() {
  return (
    <Tabs defaultValue="overview" className="w-full" dir="rtl">
      <TabsList className="w-full">
        <TabsTrigger value="overview">نمای کلی</TabsTrigger>
        <TabsTrigger value="devices">دستکاه ها</TabsTrigger>
        <TabsTrigger value="alerts">هشدارها</TabsTrigger>
        <TabsTrigger value="settings">تنظیمات</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Overview />
      </TabsContent>
      <TabsContent value="devices">
        <DeviceList />
      </TabsContent>

      <TabsContent value="alerts">
        <WarningList />
      </TabsContent>
      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  );
}
