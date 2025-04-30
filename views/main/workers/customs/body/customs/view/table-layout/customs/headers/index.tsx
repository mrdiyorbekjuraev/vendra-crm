"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useWorkersModal } from "@/stores/main/workers";

import type { IHeaderParams } from "ag-grid-community";
import {
	ArrowDown,
	ArrowUp,
	Calendar,
	CircleCheck,
	Clock,
	Component,
	EyeOff,
	FileText,
	IdCard,
	Mail,
	MapPin,
	MessageCircle,
	MoveRight,
	Phone,
	Plus,
	ShieldPlus,
	Store,
	Timer,
	User,
	Vault,
	VenusAndMars,
} from "lucide-react";
import { memo, useState } from "react";

export const FullNameHeaderRenderer = memo((props: IHeaderParams) => {
	const { setModal } = useWorkersModal();
	return (
		<div className="flex items-center justify-between w-full">
			<span className="text-sm">{props.displayName}</span>
			<TooltipWrapper content="Add worker">
				<Button
					size="icon"
					variant="ghost"
					className="size-6 ml-auto"
					onClick={() => setModal({ createWorker: true })}
				>
					<Plus size={16} strokeWidth={1.5} />
				</Button>
			</TooltipWrapper>
		</div>
	);
});

const options = [
	{ icon: <EyeOff size={16} strokeWidth={1.5} />, label: "Hide from view" },
];

const sortingOptions = [
	{ icon: <ArrowUp size={16} strokeWidth={1.5} />, label: "Sort ascending" },
	{ icon: <ArrowDown size={16} strokeWidth={1.5} />, label: "Sort descending" },
	{ icon: <MoveRight size={16} strokeWidth={1.5} />, label: "Move right" },
];

const headerIcons = {
	"Employee ID": <IdCard size={16} strokeWidth={1.5} />,
	Role: <Vault size={16} strokeWidth={1.5} />,
	"Phone number": <Phone size={16} strokeWidth={1.5} />,
	Description: <FileText size={16} strokeWidth={1.5} />,
	Location: <MapPin size={16} strokeWidth={1.5} />,
	Birthday: <Calendar size={16} strokeWidth={1.5} />,
	Gender: <VenusAndMars size={16} strokeWidth={1.5} />,
	"Start time": <Clock size={16} strokeWidth={1.5} />,
	"End time": <Clock size={16} strokeWidth={1.5} />,
	Branches: <Store size={16} strokeWidth={1.5} />,
	Manager: <User size={16} strokeWidth={1.5} />,
	Email: <Mail size={16} strokeWidth={1.5} />,
	Status: <ShieldPlus size={16} strokeWidth={1.5} />,
};

export const CustomHeaderRenderer = (props: IHeaderParams) => {
	const [sortedBy, setSortedBy] = useState<string>(options[0].label);
	const [direction, setDirection] = useState<string>("Sort ascending");
	const Icon = headerIcons[props?.displayName as keyof typeof headerIcons];
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger
					className="w-full h-7  outline-0 flex items-center justify-center   cursor-pointer"
					draggable
				>
					{" "}
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-1">
							<span>{Icon}</span>
							<span className="text-sm text-[rgb(35, 37, 41)]">
								{props.displayName}
							</span>
						</div>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-[282px] rounded-[10px] dark:bg-[#232529] shadow-lg border-[0.5px]"
					side="bottom"
					align="center"
				>
					{sortingOptions.map((option) => (
						<DropdownMenuItem
							className="cursor-pointer dark:hover:bg-[#313337]"
							key={option?.label}
							onClick={() => {
								setDirection(option?.label);
							}}
						>
							<div className="flex items-center gap-3">
								{option?.icon}
								<span className="text-sm font-medium">{option?.label}</span>
							</div>
							{option?.label === direction && (
								<CircleCheck className="ml-auto text-blue-600" />
							)}
						</DropdownMenuItem>
					))}

					<DropdownMenuSeparator />
					{options.map((option) => (
						<DropdownMenuItem
							className="cursor-pointer dark:hover:bg-[#313337]"
							key={option?.label}
							onClick={() => {
								setSortedBy(option?.label);
							}}
						>
							<div className="flex items-center gap-3">
								{option?.icon}
								<span className="text-sm font-medium">{option?.label}</span>
							</div>
							{option?.label === sortedBy && (
								<CircleCheck className="ml-auto text-blue-600" />
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
