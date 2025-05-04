import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  File,
  FileText,
  PauseCircle,
  ShieldOff,
  Users,
} from "lucide-react";
import React from "react";

const HeaderTabs = () => {
  const { getParam, setParams } = useRouterQuery();
  const tab = getParam("tab") ?? "";

  const tabTriggerStyles =
    "group flex items-center gap-2 rounded-none border-b-1 border-l-0 border-r-0 border-t-0 border-transparent px-4 py-3 data-[state=active]:border-primary dark:data-[state=active]:border-white data-[state=active]:shadow-none cursor-pointer data-[state=active]:bg-transparent dark:bg-transparent dark:data-[state=active]:bg-transparent";

  const handleTabChange = (value: string) => {
    setParams({ tab: value });
  };
  return (
    <div className="flex items-center">
      <Tabs
        value={tab}
        onValueChange={handleTabChange}
        className="w-full gap-0 bg-transparent h-full"
      >
        <TabsList className="h-12 bg-transparent p-0 transition-all py-0 px-3 overflow-x-auto">
          <TabsTrigger value="" className={cn(tabTriggerStyles)}>
            <div className="flex items-center gap-1 rounded-md px-2 py-0.5 group-data-[state=active]:border ">
              <Users size={16} strokeWidth={1.5} />
              <span>All</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="active" className={cn(tabTriggerStyles)}>
            <div className="flex items-center gap-1 rounded-md px-2 py-0.5 group-data-[state=active]:border ">
              <CheckCircle size={16} strokeWidth={1.5} />
              <span>Active</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="pending" className={cn(tabTriggerStyles)}>
            <div className="flex items-center gap-1 rounded-md px-2 py-0.5 group-data-[state=active]:border ">
              <Clock size={16} strokeWidth={1.5} />
              <span>Pending</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="inactive" className={cn(tabTriggerStyles)}>
            <div className="flex items-center gap-1 rounded-md px-2 py-0.5 group-data-[state=active]:border ">
              <PauseCircle size={16} strokeWidth={1.5} />
              <span>Inactive</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="blocked" className={cn(tabTriggerStyles)}>
            <div className="flex items-center gap-1 rounded-md px-2 py-0.5 group-data-[state=active]:border ">
              <ShieldOff size={16} strokeWidth={1.5} />
              <span>Blocked</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default HeaderTabs;
