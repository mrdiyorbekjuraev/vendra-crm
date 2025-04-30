"use client";
import { Button } from "@/components/ui/button";
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
					onClick={() => push("/management/workers")}
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
					1 of 10 in All Workers
				</div>
			</div>
			<div className="flex items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					className="size-6.5 transition-all duration-200"
				>
					<CircleHelp size={16} strokeWidth={1.5} />
				</Button>
			</div>
		</div>
	);
};
