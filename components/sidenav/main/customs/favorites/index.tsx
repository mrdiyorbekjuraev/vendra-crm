import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronRight, FolderPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Favorites = () => {
	const [openDropdown, setOpenDropdown] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const t = useTranslations("sidebar");
	return (
		<Collapsible
			asChild
			defaultOpen={false}
			className="group/collapsible list-none transition-[height] duration-300 ease-in-out active px-3"
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton
						tooltip={"Favorites"}
						onMouseEnter={() => {
							setOpenDropdown(true);
						}}
						onMouseLeave={() => {
							setOpenDropdown(false);
						}}
						className="h-7"
					>
						<div className="flex items-center gap-1">
							<ChevronRight
								size={16}
								className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-zinc-500"
							/>
							<SidebarGroupLabel className=" dark:text-zinc-400 text-zinc-500 font-medium">
								{t("favorites")}
							</SidebarGroupLabel>
						</div>
						<Tooltip>
							<TooltipTrigger
								asChild
								className="ml-auto cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									setIsOpen(true);
								}}
							>
								<FolderPlus
									className={cn(
										"text-zinc-500 dark:hover:text-white hover:text-zinc-700 transition-all duration-300",
										openDropdown
											? "opacity-100 scale-100"
											: "opacity-0 scale-0",
									)}
									size={17}
								/>
							</TooltipTrigger>
							<TooltipContent
								className="flex  flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 ml-4"
								side="right"
							>
								<p className="font-medium text-white leading-5 text-xs">
									Create new favorites folder
								</p>
							</TooltipContent>
						</Tooltip>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent className="CollapsibleContent">
					<span className="text-sm dark:text-zinc-400 text-zinc-500 font-medium ml-9">
						No Favorites
					</span>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
};

export default Favorites;
