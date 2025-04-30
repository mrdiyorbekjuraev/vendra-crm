"use client";
import { usePathname } from "next/navigation";
import { Main } from "./main";
import { Settings } from "./settings";

export function SideNav() {
	const path = usePathname();

	return path.includes("/settings") ? <Settings /> : <Main />;
}
