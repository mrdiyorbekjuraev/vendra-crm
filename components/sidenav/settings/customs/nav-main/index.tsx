"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

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
import Link from "next/link";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
			icon: LucideIcon;
			shortcut: string[];
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			{<SidebarGroupLabel>Platform</SidebarGroupLabel>}
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									isActive
									className="dark:hover:bg-[#313337] hover:bg-[#ecebeb] transition-colors duration-200  cursor-pointer rounded-[9px] h-7 mr-0"
								>
									{item.icon && (
										<item.icon
											size={16}
											strokeWidth={1.5}
											className="dark:text-zinc-400 text-zinc-500"
										/>
									)}
									<span className="truncate text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
										{item.title}
									</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent className="CollapsibleContent">
								<SidebarMenuSub className="w-[98%]">
									{item.items?.map((subItem) => (
										<Tooltip key={subItem.title}>
											<TooltipTrigger asChild>
												<SidebarMenuSubItem>
													<SidebarMenuSubButton
														asChild
														className="transition-all duration-300 dark:hover:bg-[#313337] hover:bg-[#ecebeb] rounded-[9px] h-7"
													>
														<Link href={subItem.url}>
															<subItem.icon
																size={16}
																strokeWidth={1.5}
																className="text-zinc-500"
															/>
															<span className="truncate text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
																{subItem.title}
															</span>
														</Link>
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
													<Kbd className="pointer-events-none  size-4 flex  justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
														<span className="text-[10px] text-zinc-400">
															{subItem?.shortcut?.[0]}
														</span>
													</Kbd>
													<span className="text-xs text-muted-foreground">
														then
													</span>
													<Kbd className="pointer-events-none  size-4 flex  justify-center select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 bg-transparent px-1.5 font-mono text-[10px] opacity-100 sm:flex">
														<span className="text-[10px] text-zinc-400">
															{subItem?.shortcut?.[1]}
														</span>
													</Kbd>
												</div>
											</TooltipContent>
										</Tooltip>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
