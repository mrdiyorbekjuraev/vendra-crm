import { useHelpSidePanelStore } from "@/components/help-sidepanel/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, MessageCircle, MoreVertical } from "lucide-react";
import { ProfileDropdown } from "../profile";

export const HeaderActions: React.FC = () => {
	const { openModal } = useHelpSidePanelStore();
	return (
		<div className="flex items-center">
			{/* Avatar */}
			<ProfileDropdown />

			{/* Separator line - reduced height to 16px max */}
			<Separator
				orientation="vertical"
				className="mx-2 h-10 w-10 border-b-[18px]"
			/>

			{/* Message icon - updated tooltip text from "Messages" to "Comments" */}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="h-7 w-7 flex items-center justify-center hover:bg-[#EEEFF1] dark:hover:bg-[#ecebeb15] rounded-[9px] transition-colors cursor-pointer">
							<MessageCircle className="h-3.5 w-3.5 text-[#8E9196]" />
						</div>
					</TooltipTrigger>
					<TooltipContent side="bottom" className="mt-2">
						<p>Comments</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			{/* Help icon */}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild onClick={() => openModal()}>
						<div className="h-7 w-7 flex items-center justify-center hover:bg-[#EEEFF1] dark:hover:bg-[#ecebeb15]  rounded-[9px] transition-colors cursor-pointer">
							<HelpCircle className="h-3.5 w-3.5 text-[#8E9196]" />
						</div>
					</TooltipTrigger>
					<TooltipContent side="bottom" className="mt-2">
						<p>Help</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			{/* More options - Added tooltip */}
			<Popover>
				<PopoverTrigger asChild>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="h-7 w-7 flex items-center justify-center hover:bg-[#EEEFF1] dark:hover:bg-[#ecebeb15]  rounded-[9px] transition-colors cursor-pointer">
									<MoreVertical className="h-3.5 w-3.5 text-[#8E9196]" />
								</div>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="mt-2">
								<p>More</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</PopoverTrigger>
				<PopoverContent
					className="w-56 p-1 pb-1"
					align="start"
					sideOffset={8}
					alignOffset={8}
				>
					<div className="grid gap-1">
						<Button
							variant="ghost"
							className="justify-start rounded-[9px] hover:bg-[#EEEFF1]"
						>
							Settings
						</Button>
						<Button
							variant="ghost"
							className="justify-start rounded-[9px] hover:bg-[#EEEFF1]"
						>
							Notifications
						</Button>
						<Button
							variant="ghost"
							className="justify-start rounded-[9px] hover:bg-[#EEEFF1]"
						>
							Logout
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
