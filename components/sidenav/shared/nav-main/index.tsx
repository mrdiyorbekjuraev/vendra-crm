"use client";

import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Kbd } from "@/components/ui/kbd";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";
import { ChevronRight, type LucideIcon, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo, useState } from "react";

type SubItemType = {
	id: string;
	title: string;
	url: string;
	icon: LucideIcon;
	shortcut: string[];
};

type NavItemType = {
	id: string;
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: SubItemType[];
};

// Memoized SubItem component for better performance
export const SubMenuItem = memo(({ subItem }: { subItem: SubItemType }) => {
	const [isHovered, setIsHovered] = useState(false);
	const path = usePathname();
	const t = useTranslations("sidebar");
	const { navigate } = useLocaleNavigate();
	const lang = useLanguage();
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<SidebarMenuSubItem
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<SidebarMenuSubButton
						asChild
						className="transition-all duration-300 dark:hover:bg-[#313337] hover:bg-[#ecebeb] rounded-[9px] h-7"
						isActive={path.includes(subItem.url)}
					>
						<div className="flex items-center w-full">
							<Link
								href={`/${lang}/${subItem?.url}`}
								className="flex items-center gap-1.5 flex-1"
							>
								<subItem.icon
									size={16}
									strokeWidth={1.5}
									className="dark:text-zinc-400 text-zinc-500"
								/>
								<span className="truncate text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
									{t(subItem?.id)}
								</span>
							</Link>
							{isHovered && (
								<Button
									size="icon"
									variant="ghost"
									className="size-3 cursor-pointer mt-1"
								>
									<Star
										size={16}
										strokeWidth={1.5}
										className="dark:text-zinc-400 text-zinc-500 ml-auto"
									/>
								</Button>
							)}
						</div>
					</SidebarMenuSubButton>
				</SidebarMenuSubItem>
			</TooltipTrigger>
			<TooltipContent
				side="right"
				className="flex flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 ml-2 px-2 h-8"
			>
				<div className="flex items-center gap-2">
					<p className="font-medium text-white leading-5 text-xs">
						Go to {subItem.title} page
					</p>
					<Kbd className="pointer-events-none size-4 flex justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
						<span className="text-[10px] text-zinc-400">
							{subItem.shortcut[0]}
						</span>
					</Kbd>
					<span className="text-xs text-muted-foreground">then</span>
					<Kbd className="pointer-events-none size-4 flex justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
						<span className="text-[10px] text-zinc-400">
							{subItem.shortcut[1]}
						</span>
					</Kbd>
				</div>
			</TooltipContent>
		</Tooltip>
	);
});

SubMenuItem.displayName = "SubMenuItem";

// Main component with proper type annotations
export const NavMain = memo(
	({ items, title }: { items: NavItemType[]; title: string }) => {
		const t = useTranslations("sidebar");
		return (
			<SidebarGroup>
				{<SidebarGroupLabel>{title}</SidebarGroupLabel>}
				<SidebarMenu>
					{items.map((item) => (
						<Collapsible
							key={item.id}
							asChild
							defaultOpen={item.isActive}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton
										tooltip={item.title}
										className="dark:hover:bg-[#313337] hover:bg-[#ecebeb] transition-colors duration-200 cursor-pointer rounded-[9px] h-7 mr-0"
									>
										{item.icon && (
											<item.icon
												size={16}
												strokeWidth={1.5}
												className="dark:text-zinc-400 text-zinc-500"
											/>
										)}
										<span className="truncate text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
											{t(item.id)}
										</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent className="CollapsibleContent">
									<SidebarMenuSub className="w-[98%]">
										{item.items?.map((subItem) => (
											<SubMenuItem key={subItem.id} subItem={subItem} />
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
					))}
				</SidebarMenu>
			</SidebarGroup>
		);
	},
);
