"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverItem,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
	CopyMinus,
	Edit,
	EllipsisVertical,
	FolderPen,
	Trash2,
} from "lucide-react";

export const Header = () => {
	return (
		<div>
			<div className="flex items-center gap-1 h-[52px] px-3 border-b">
				<Avatar>
					<AvatarImage src={""} />
					<AvatarFallback className="bg-green-800 text-white">D</AvatarFallback>
				</Avatar>
				<Button className="text-md font-semibold h-7" variant="ghost" size="sm">
					Diyorbek Juraev
				</Button>

				<div className="ml-auto flex items-center gap-2">
					<div className="text-sm text-muted-foreground">
						Last Updated:{" "}
						<span className="font-medium text-primary">6 minutes ago</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						className="h-7 px-[8px] py-0 rounded-[10px] bg-blue-600 hover:bg-blue-700 hover:text-white text-white flex items-center justify-center text-[14px] gap-[6px]"
					>
						<Edit size={16} strokeWidth={1.5} />
						Edit Worker
					</Button>
					<Popover>
						<PopoverTrigger className="" asChild>
							<Button
								variant="ghost"
								size="icon"
								className="size-6.5 transition-all duration-200"
							>
								<EllipsisVertical
									size={16}
									strokeWidth={1.5}
									className="text-zinc-500"
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-[150px] rounded-[10px] bg-white dark:bg-[#232529] shadow-lg border-[0.5px] px-1 py-1 z-30"
							side="bottom"
							align="end"
						>
							<PopoverItem className="flex items-center gap-1">
								<FolderPen size={16} strokeWidth={1.5} />{" "}
								<span className="mr-auto">Archive</span>
							</PopoverItem>
							<Separator />
							<PopoverItem className="flex items-center gap-1">
								<Trash2 size={16} strokeWidth={1.5} className="text-red-500" />
								<span className="text-red-500 mr-auto">Remove</span>
							</PopoverItem>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<div className="flex items-center py-3 bg-muted/40 border-b px-3 gap-2">
				<Badge
					variant="secondary"
					className="border rounded-sm border-muted/ bg-muted/60"
				>
					<Avatar className="size-4 rounded-sm">
						<AvatarImage src="" />
						<AvatarFallback className="bg-orange-500 text-white rounded-sm text-[8px]">
							D
						</AvatarFallback>
					</Avatar>
					Admin
				</Badge>
				<Separator orientation="vertical" />
				<Badge className="" color="green" variant="outline">
					Vendra
				</Badge>
				<Badge
					variant="secondary"
					className="border rounded-sm border-muted/ bg-muted/60"
				>
					{" "}
					<div className="size-2 bg-green-500 rounded-full pulse green pulse-animation" />
					Active
				</Badge>
			</div>
		</div>
	);
};
