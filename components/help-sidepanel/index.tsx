"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "../ui/input";
import { SidePanel } from "../ui/side-panel";
import { Typography } from "../ui/typography";
import Footer from "./customs/footer";
import { useHelpSidePanelStore } from "./store";
import Instructions from "./customs/suggestions";
import ShortKeys from "./customs/short-keys";
import { Button } from "../ui/button";

const HelpSidePanel = () => {
  const { isOpen, closeModal, tab } = useHelpSidePanelStore();
  const { setData } = useHelpSidePanelStore();
  return (
    <SidePanel
      isOpen={isOpen}
      onClose={closeModal}
      className={cn(
        "fixed m-4 w-[360px] h-[calc(100vh-30px)] rounded-[16px] shadow-2xl bg-white dark:bg-sidebar"
      )}
      overlayClassName="bg-transparent"
      style={{
        boxShadow:
          "rgba(24, 39, 75, 0.12) 0px 8px 28px -6px, rgba(24, 39, 75, 0.14) 0px 18px 88px -4px;",
      }}
    >
      <div className="flex items-center gap-1 p-4">
        {tab === "short-keys" && <Button size="icon" variant={"outline"} className="size-6 mt-0.5" onClick={() => setData({ tab: "instruction" })}><ChevronLeft size={16} /></Button>}
        <Typography variant="h1" size="md" className="font-medium">
          {tab === "instruction" ? "Help" : "Keyboard shortcuts"}
        </Typography>
      </div>
      <div>
        <div className="relative px-4">
          <Input
            className={cn("pr-8 pl-9")}
            type="text"
            placeholder={"Search help"}
            onChange={(e) => setData({ search_short_keys: e.target.value })}
          />
          <Search
            size={25}
            strokeWidth={1.5}
            className="absolute left-6 top-1.5 text-zinc-500 cursor-pointer hover:bg-muted-foreground/10 rounded-sm p-1"
          />
        </div>
        {/* Content */}
        <div className="content mt-4">
          {tab === "instruction" ? <Instructions /> : <ShortKeys />}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </SidePanel>
  );
};

export default HelpSidePanel;
