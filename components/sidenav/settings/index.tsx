"use client";
import { Input } from "@/components/ui/input";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Branches } from "../shared/branches";
import MenuLink, { SidebarMenuLink } from "../shared/nav-link";
import NavHeader from "./customs/header";
import { settingsLinks } from "./lib/routes";

export function Settings({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="sidebar" {...props}>
			<NavHeader />
			<SidebarContent>
				<div className="pt-4 px-2.5">
					<div className="relative">
						<div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
							<Search className="h-4 w-4 text-gray-400" />
						</div>
						<Input
							type="text"
							placeholder="Search navigation..."
							className="w-full pl-8 py-1 text-sm h-8  "
						/>
					</div>
				</div>

				{Object.keys(settingsLinks).map((item) => (
					<SidebarGroup key={item}>
						<SidebarGroupLabel>{item}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{settingsLinks[item].map((link) => (
									<MenuLink key={link.id} {...link} />
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			
		</Sidebar>
	);
}
