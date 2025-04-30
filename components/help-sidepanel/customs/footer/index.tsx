"use client";

import { PopoverItem } from "@/components/ui/popover";
import { CircleHelp, Command, MessageSquare } from "lucide-react";

const Footer = () => {
	return (
		<div className="mt-auto p-2">
			<PopoverItem className="justify-start">
				<div className="flex items-center gap-1">
					<CircleHelp size={16} strokeWidth={1.5} />
					<span>Help center</span>
				</div>
			</PopoverItem>
			<PopoverItem>
				<div className="flex items-center gap-1">
					<MessageSquare size={16} strokeWidth={1.5} />
					<span>Support</span>
				</div>
			</PopoverItem>
			<PopoverItem>
				<div className="flex items-center gap-1">
					<Command size={16} strokeWidth={1.5} />
					<span>Shortcuts</span>
				</div>{" "}
			</PopoverItem>
			<PopoverItem>
				{" "}
				<div className="flex items-center gap-1">
					<CircleHelp size={16} strokeWidth={1.5} />
					<span>Terms and privacy</span>
				</div>
			</PopoverItem>
		</div>
	);
};

export default Footer;
