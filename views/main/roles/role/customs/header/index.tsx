"use client";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { ChevronDown, ChevronLeft, ChevronUp, CircleHelp, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const Header = () => {
	const { push } = useRouter();

	return (
		<div className="h-12 border-b flex items-center justify-between px-2">
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					className="transition-all duration-200"
					onClick={() => push("/management/roles")}
				>
					<ChevronLeft size={16} strokeWidth={1.5} className="text-zinc-500" />
					Back
				</Button>

				
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
