import { Kbd } from "@/components/ui/kbd";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Command, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Branches } from "../shared/branches";
import { SidebarMenuLink } from "../shared/nav-link";
import { NavMain } from "../shared/nav-main";
import Favorites from "./customs/favorites";
import NavHeader from "./customs/header";
import { Main as MainRoutes } from "./lib/routes";

export function Main({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const t = useTranslations("sidebar");
	return (
		<Sidebar variant="sidebar" {...props}>
			<NavHeader />
			<SidebarContent>
				<div
					className={cn(
						"flex h-7 items-center gap-2 rounded-md border bg-background px-1 text-sm shadow-sm mx-2 mt-2 cursor-pointer",
					)}
				>
					<Command className="h-4 w-4 text-muted-foreground" />
					<span className="text-muted-foreground">{t("quick_actions")}</span>
					<div className="ml-auto mb-0.5">
						<Kbd>CTRL K</Kbd>
					</div>
				</div>

				<SidebarMenuLink
					key={1}
					title={t("dashboard")}
					id="0"
					url="/"
					icon={
						<LayoutDashboard
							size={16}
							strokeWidth={1.5}
							className="text-zinc-600 dark:text-zinc-400"
						/>
					}
					shortcut={["", "D"]}
				/>
				<NavMain items={MainRoutes.base} title="Main" />
				<NavMain items={MainRoutes.management} title={t("management")} />
				<Favorites />
				<SidebarRail />
			</SidebarContent>
			<SidebarFooter>
				<Branches />
			</SidebarFooter>
		</Sidebar>
	);
}
