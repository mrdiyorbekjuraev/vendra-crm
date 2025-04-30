"use client";

import { useRolesSummaryCache } from "@/services/main/roles";
import { Archive, Settings2, UserCheck, UserX } from "lucide-react";
import StatsCard from "./customs/card";

const statsCardData = [
	{
		id: "1",
		title: "Active Roles",
		amount: 23,
		colorClass: "text-green-600",
		icon: <UserCheck size={16} strokeWidth={1.5} className="text-green-500" />,
	},
	{
		id: "2",
		title: "Unassigned Roles",
		amount: 20,
		colorClass: "text-orange-600",
		icon: <UserX size={16} strokeWidth={1.5} className="text-orange-500" />,
	},
	{
		id: "3",
		title: "All Roles",
		amount: 10,
		colorClass: "text-yellow-500",
		icon: <Settings2 size={16} strokeWidth={1.5} className="text-yellow-500" />,
	},
	{
		id: "4",
		title: "Archived Roles",
		amount: 40,
		colorClass: "text-gray-600",
		icon: <Archive size={16} strokeWidth={1.5} className="text-gray-500" />,
	},
];

const Stats = () => {
	const {
		stats: { data: status },
	} = useRolesSummaryCache();
	return (
		<div className="p-4 grid  grid-cols-2 xl:grid-cols-4 gap-5 ">
			<StatsCard
				{...statsCardData[2]}
				amount={Number(status?.data.totalCount)}
			/>
			<StatsCard
				{...statsCardData[0]}
				amount={Number(status?.data.activeCount)}
			/>
			<StatsCard
				{...statsCardData[1]}
				amount={Number(status?.data.unassignedCount)}
			/>
			<StatsCard
				{...statsCardData[3]}
				amount={Number(status?.data.archivedCount)}
			/>
		</div>
	);
};

export default Stats;
