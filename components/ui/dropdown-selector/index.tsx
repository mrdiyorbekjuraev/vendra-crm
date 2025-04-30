"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleCheck } from "lucide-react";
import React, { type ReactNode } from "react";

// Types
export interface OptionItem {
	icon: ReactNode;
	label: string;
	value?: string; // Optional value if different from label
}

export interface OptionGroup {
	title?: string;
	options: OptionItem[];
}

interface DropdownSelectorProps {
	groups: OptionGroup[];
	selectedValues: Record<string, string>; // Category name to selected value mapping
	onSelectionChange: (groupIndex: number, option: OptionItem) => void;
	triggerContent: (selectedValues: Record<string, string>) => ReactNode;
	className?: string;
	dropdownClassName?: string;
	itemClassName?: string;
	checkmarkIcon?: ReactNode;
	dropdownSide?: "top" | "right" | "bottom" | "left";
	dropdownAlign?: "start" | "center" | "end";
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
	groups,
	selectedValues,
	onSelectionChange,
	triggerContent,
	className = "",
	dropdownClassName = "",
	itemClassName = "",
	checkmarkIcon = <CircleCheck className="ml-auto text-blue-600" />,
	dropdownSide = "bottom",
	dropdownAlign = "start",
}) => {
	return (
		<div className={className}>
			<DropdownMenu>
				<DropdownMenuTrigger
					className="w-full outline-0 cursor-pointer"
					onClick={(e) => e.stopPropagation()}
				>
					{triggerContent(selectedValues)}
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className={`rounded-[12px] dark:bg-[#232529] shadow-lg border-[0.5px] ${dropdownClassName}`}
					side={dropdownSide}
					align={dropdownAlign}
				>
					{groups.map((group, groupIndex) => (
						<React.Fragment key={`group-${groupIndex}`}>
							{groupIndex > 0 && <DropdownMenuSeparator />}
							{group.title && (
								<div className="px-2 py-1 text-xs text-gray-500">
									{group.title}
								</div>
							)}

							{group.options.map((option) => {
								const optionValue = option.value || option.label;
								const isSelected =
									Object.values(selectedValues).includes(optionValue);

								return (
									<DropdownMenuItem
										key={optionValue}
										className={`cursor-pointer dark:hover:bg-[#313337] ${itemClassName}`}
										onClick={() => onSelectionChange(groupIndex, option)}
									>
										<div className="flex items-center gap-3">
											<span className="text-gray-600 dark:text-gray-400">
												{option.icon}
											</span>
											<span className="text-sm font-medium">
												{option.label}
											</span>
										</div>
										{isSelected && checkmarkIcon}
									</DropdownMenuItem>
								);
							})}
						</React.Fragment>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default DropdownSelector;
