"use client";
import { Button } from "@/components/ui/button";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	ChevronLeft,
	GalleryVerticalEnd,
	PanelLeft,
	PanelLeftClose,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";

export const company = {
	name: "Vendra",
	logo: GalleryVerticalEnd,
	plan: "Vendra",
};

const NavHeader = () => {
	const { setOpen } = useSidebar();
	const { push } = useRouter();
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);
	const handleCollapseSidebar = useCallback(() => setOpen(false), [setOpen]);

	return (
		<SidebarHeader className="p-0 duration-300 transition-all border-b">
			<div className="w-full relative">
				<div className="h-12 flex items-center px-4 gap-2">
					<Button
						className="hover:bg-[#cccccc63] dark:hover:bg-[#efefef40] size-6.5"
						variant="ghost"
						size="icon"
						onClick={() => push("/")}
					>
						<ChevronLeft size={16} strokeWidth={1.5} />
					</Button>
					<span className="text-md font-semibold">Settings</span>
				</div>
				<div className="absolute right-2 top-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger
								onClick={handleCollapseSidebar}
								className="cursor-pointer"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								{isHovered ? (
									<PanelLeftClose className="h-4 w-4 text-zinc-500" />
								) : (
									<PanelLeft className="h-4 w-4 text-zinc-500" />
								)}
							</TooltipTrigger>
							<TooltipContent className="flex w-full flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 mt-3">
								<div className="flex items-center gap-2">
									<p className="text-white text-xs font-medium">
										Collapse Sidebar
									</p>
									<div className="flex items-center gap-2">
										<kbd className="pointer-events-none hidden h-4 select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600  px-0.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
											<span className="text-xs">CTRL</span>
										</kbd>
										<kbd className="pointer-events-none hidden size-4 select-none justify-center items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
											<span className="text-xs">.</span>
										</kbd>
									</div>
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</SidebarHeader>
	);
};

export default NavHeader;
