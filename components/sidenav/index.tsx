"use client";
import { usePathname } from "next/navigation";
import { Main } from "./main";
import { Settings } from "./settings";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortCuts";

export function SideNav() {
  const path = usePathname();
  useKeyboardShortcuts();

  return path.includes("/settings") ? <Settings /> : <Main />;
}
