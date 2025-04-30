"use client";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp, CircleHelp, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Header = () => {
	const { push } = useRouter();

	return (
		<div className="h-12 border-b flex items-center justify-between px-2">
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					className="size-6.5 transition-all duration-200"
					onClick={() => push("/management/roles")}
				>
					<XIcon size={16} strokeWidth={1.5} className="text-zinc-500" />
				</Button>
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="icon"
						className="size-6.5 transition-all duration-200"
					>
						<ChevronUp size={16} strokeWidth={1.5} className="text-zinc-500" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-6.5 transition-all duration-200"
					>
						<ChevronDown
							size={16}
							strokeWidth={1.5}
							className="text-zinc-500"
						/>
					</Button>
				</div>
				<div className="text-xs text-accent-foreground">
					1 of 10 in All Roles
				</div>
			</div>
			<div className="flex items-center gap-1">
				<TooltipWrapper content="Help">
					<Button
						variant="ghost"
						size="icon"
						className="size-6.5 transition-all duration-200"
						withAnimation={false}
					>
						<CircleHelp size={16} strokeWidth={1.5} />
					</Button>
				</TooltipWrapper>
			</div>
		</div>
	);
};
