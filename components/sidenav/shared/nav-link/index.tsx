"use client";

import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";
import type { MenuLinkProps } from "@/types/main/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, ReactNode } from "react";

export interface NavItem {
	id: string;
	title: string;
	url: string;
	disabled?: boolean;
	external?: boolean;
	shortcut?: [string, string];
	icon?: ReactNode;
	label?: string;
	description?: string;
	isActive?: boolean;
	items?: NavItem[];
	isCollapsable?: boolean;
}

export const SidebarMenuLink = (props: NavItem) => {
	const { url, title, icon, shortcut } = props;
	const { setOpenMobile } = useSidebar();
	const pathname = usePathname();
	const lang = useLanguage();
	const { navigate } = useLocaleNavigate();
	return (
		<SidebarMenuItem className="decoration-0 list-none mx-2 mt-4">
			<Tooltip>
				<TooltipTrigger asChild>
					<SidebarMenuButton
						asChild
						tooltip={title}
						isActive={pathname === `/${lang}/${url}` || pathname === `/${lang}`}
						className="dark:hover:bg-[#313337] hover:bg-[#ecebeb] transition-colors duration-200  cursor-pointer rounded-[9px] h-7"
					>
						<Link href={`/${lang}/${url}`} onClick={() => setOpenMobile(false)}>
							{icon}
							<span className="truncate text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
								{title}
							</span>
						</Link>
					</SidebarMenuButton>
				</TooltipTrigger>
				<TooltipContent
					side="right"
					className="flex flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 ml-2 px-2 h-8"
				>
					{url === "/" ? (
						<div className="flex items-center gap-2">
							<p className="font-medium text-white leading-5 text-xs">
								Start with dashboard
							</p>
							<Kbd className="pointer-events-none  size-4 flex  justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
								<span className="text-[10px] text-zinc-400">
									{shortcut?.[1]}
								</span>
							</Kbd>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<p className="font-medium text-white leading-5 text-xs">
								Go to {title} page
							</p>
							<Kbd className="pointer-events-none  size-4 flex  justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
								<span className="text-[10px] text-zinc-400">
									{shortcut?.[0]}
								</span>
							</Kbd>
							<span className="text-xs text-muted-foreground">then</span>
							<Kbd className="pointer-events-none  size-4 flex  justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
								<span className="text-[10px] text-zinc-400">
									{shortcut?.[1]}
								</span>
							</Kbd>
						</div>
					)}
				</TooltipContent>
			</Tooltip>
		</SidebarMenuItem>
	);
};

const MenuContent: FC<MenuLinkProps> = (props) => {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar();

	return (
		<SidebarMenuButton
			asChild
			tooltip={props?.title}
			isActive={
				Boolean(props?.pathname) && pathname.includes(String(props?.pathname))
			}
			className="dark:hover:bg-[#313337] hover:bg-[#ecebeb] transition-colors duration-200  cursor-pointer rounded-[9px] h-7"
		>
			<Link
				href={String(props?.pathname ?? "")}
				onClick={() => setOpenMobile(false)}
			>
				{props?.icon}
				<span className="truncate text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
					{props?.title}
				</span>
				{props?.hasBadge && (
					<Badge className="ml-auto bg-blue-600 size-5 text-white">
						{props?.badgeElement}
					</Badge>
				)}
			</Link>
		</SidebarMenuButton>
	);
};

const MenuLink: FC<MenuLinkProps> = (props) => {
	if (props?.shouldRenderCustomElement) {
		return props?.customElement;
	}

	if (!props?.hasTooltip) {
		return <MenuContent {...props} />;
	}

	return (
		<SidebarMenuItem>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>
						<MenuContent {...props} />
					</div>
				</TooltipTrigger>
				<TooltipContent
					side="right"
					className="flex flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 ml-2 px-2 h-8"
				>
					{props?.tooltipContent}
				</TooltipContent>
			</Tooltip>
		</SidebarMenuItem>
	);
};

export default MenuLink;
