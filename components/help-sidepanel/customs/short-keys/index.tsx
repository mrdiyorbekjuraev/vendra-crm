"use client";

import React, { memo, useMemo, useState } from "react";
import Keys from "./customs/keys";
import { Kbd } from "@/components/ui/kbd";
import {
  ArrowBigUp,
  ArrowDown,
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  ArrowUp,
  Space,
} from "lucide-react";
import { useHelpSidePanelStore } from "../../store";

const isMac = typeof window !== "undefined" && /Mac/.test(navigator.platform);

const ctrlOrCmd = isMac ? "⌘" : "CTRL";
const altKey = isMac ? "⌥" : "ALT";

const shortcuts = [
  {
    category: "General",
    action: "Open quick actions",
    keys: [ctrlOrCmd, "K"],
  },
  {
    category: "General",
    action: "Open search",
    keys: ["/"],
  },
  {
    category: "General",
    action: "Toggle sidebar",
    keys: [ctrlOrCmd, "."],
  },
  {
    category: "General",
    action: "Navigate up",
    keys: [<ArrowUp size={16} strokeWidth={1.5} key="up" />],
  },
  {
    category: "General",
    action: "Go to Worker page",
    keys: ["G", "W"],
  },
  {
    category: "General",
    action: "Go to Role page",
    keys: ["G", "R"],
  },
  {
    category: "General",
    action: "Navigate down",
    keys: [<ArrowDown size={16} strokeWidth={1.5} key="down" />],
  },
  {
    category: "Record page",
    action: "Go to next tab",
    keys: [altKey, <ArrowRight size={16} strokeWidth={1.5} key="right" />],
  },
  {
    category: "Record page",
    action: "Go to previous tab",
    keys: [altKey, <ArrowLeft size={16} strokeWidth={1.5} key="left" />],
  },
  {
    category: "Table view",
    action: "Navigate to the cell above",
    keys: [<ArrowUp size={16} strokeWidth={1.5} key="up" />],
  },
  {
    category: "Table view",
    action: "Navigate to the cell to the right",
    keys: [<ArrowRight size={16} strokeWidth={1.5} key="right" />],
  },
  {
    category: "Table view",
    action: "Navigate to the cell below",
    keys: [<ArrowDown size={16} strokeWidth={1.5} key="down" />],
  },
  {
    category: "Table view",
    action: "Navigate to the cell to the left",
    keys: [<ArrowLeft size={16} strokeWidth={1.5} key="left" />],
  },
  {
    category: "Table view",
    action: "Jump to bottom",
    keys: [ctrlOrCmd, <ArrowDown size={16} strokeWidth={1.5} key="down" />],
  },
  {
    category: "Table view",
    action: "Jump to top",
    keys: [ctrlOrCmd, <ArrowUp size={16} strokeWidth={1.5} key="up" />],
  },
  {
    category: "Table view",
    action: "Select/deselect current row",
    keys: [
      <ArrowBigUp size={16} strokeWidth={1.5} key="bigup" />,
      <Space size={16} strokeWidth={1.5} key="space" />,
    ],
  },
  {
    category: "Table view",
    action: "Group select rows up",
    keys: [
      <ArrowBigUp size={16} strokeWidth={1.5} key="bigup" />,
      <ArrowUp size={16} strokeWidth={1.5} key="up" />,
    ],
  },
  {
    category: "Table view",
    action: "Group select rows down",
    keys: [
      <ArrowBigUp size={16} strokeWidth={1.5} key="bigup" />,
      <ArrowDown size={16} strokeWidth={1.5} key="down" />,
    ],
  },
  {
    category: "Table view",
    action: "Group select to top",
    keys: [
      ctrlOrCmd,
      <ArrowBigUp size={16} strokeWidth={1.5} key="bigup" />,
      <ArrowUp size={16} strokeWidth={1.5} key="up" />,
    ],
  },
  {
    category: "Table view",
    action: "Group select to bottom",
    keys: [
      ctrlOrCmd,
      <ArrowBigUp size={16} strokeWidth={1.5} key="bigup" />,
      <ArrowDown size={16} strokeWidth={1.5} key="down" />,
    ],
  },
  {
    category: "Table view",
    action: "Select/deselect all rows",
    keys: [ctrlOrCmd, "A"],
  },
  {
    category: "Table view",
    action: "Go to next cell",
    keys: [<ArrowRightToLine size={16} strokeWidth={1.5} key="next" />],
  },
  {
    category: "Table view",
    action: "Go to previous cell",
    keys: [<ArrowLeftToLine size={16} strokeWidth={1.5} key="prev" />],
  },
];

const ShortKeys = memo(() => {
  const { search_short_keys } = useHelpSidePanelStore();

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((item) =>
      item.action.toLowerCase().includes(search_short_keys.toLowerCase())
    );
  }, [search_short_keys]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof shortcuts> = {};
    for (const item of filteredShortcuts) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredShortcuts]);

  return (
    <div className="px-4">
      <div className="h-[calc(100vh-240px)] overflow-y-auto">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              {category}
            </h3>
            <div className="flex flex-col gap-2">
              {items.map((item, idx) => (
                <Keys
                  key={idx}
                  action={item.action}
                  short_key={
                    <div className="flex gap-1 items-center flex-wrap">
                      {item.keys.map((key, i) => (
                        <Kbd key={i} className="kbd">
                          {key}
                        </Kbd>
                      ))}
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ShortKeys;
