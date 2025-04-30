"use client";

import DropdownSelector, {
	type OptionGroup,
} from "@/components/ui/dropdown-selector";
import {
	ArrowDownWideNarrow,
	ArrowUpNarrowWide,
	Calendar1,
	CalendarPlus,
	User,
} from "lucide-react";
import React, { useState } from "react";

const Sort = () => {
	const SORT_FIELD = "sortField";
	const SORT_DIRECTION = "sortDirection";

	const [selectedValues, setSelectedValues] = useState({
		[SORT_FIELD]: "Due date",
		[SORT_DIRECTION]: "Ascending",
	});

	const sortGroups: OptionGroup[] = [
		{
			options: [
				{ icon: <CalendarPlus size={16} />, label: "Due date" },
				{ icon: <User size={16} />, label: "Assignee" },
				{ icon: <Calendar1 size={16} />, label: "Creation Date" },
			],
		},
		{
			options: [
				{ icon: <ArrowUpNarrowWide size={16} />, label: "Ascending" },
				{ icon: <ArrowDownWideNarrow size={16} />, label: "Descending" },
			],
		},
	];

	const handleSelectionChange = (
		groupIndex: number,
		option: { label: string },
	) => {
		setSelectedValues((prev) => ({
			...prev,
			[groupIndex === 0 ? SORT_FIELD : SORT_DIRECTION]: option.label,
		}));
	};

	// Custom trigger content
	const renderTriggerContent = (values: Record<string, string>) => {
		const isAscending = values[SORT_DIRECTION] === "Ascending";

		return (
			<div className="h-7 px-2 rounded-[10px] border py-2 flex items-center justify-center">
				<div className="flex items-center gap-2 flex-nowrap">
					{isAscending ? (
						<ArrowUpNarrowWide className="h-3.5 w-3.5 mr-0 text-gray-600 dark:text-primary" />
					) : (
						<ArrowDownWideNarrow className="h-3.5 w-3.5 mr-0 text-gray-600 dark:text-primary" />
					)}
					<div className="flex items-center">
						<span className="text-gray-500 font-medium text-sm whitespace-nowrap">
							Sorted by
						</span>
						<span className="text-primary font-medium ml-1 text-sm whitespace-nowrap">
							{values[SORT_FIELD]}
						</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<DropdownSelector
			groups={sortGroups}
			selectedValues={selectedValues}
			onSelectionChange={handleSelectionChange}
			triggerContent={renderTriggerContent}
			dropdownClassName="w-[230px]"
			dropdownSide="bottom"
			dropdownAlign="start"
		/>
	);
};

export default Sort;
