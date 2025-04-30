"use client";

import { LoaderCircle, ShieldAlert, ShieldBan, Users } from "lucide-react";
import StatsCard from "./customs/card";

const statsCardData = [
	{
		id: "1",
		title: "Active Workers",
		amount: 23,
		colorClass: "text-green-600",
		icon: <Users size={16} strokeWidth={1.5} className="text-green-500" />,
	},
	{
		id: "2",
		title: "Inactive Workers",
		amount: 20,
		colorClass: "text-red-600",
		icon: <ShieldAlert size={16} strokeWidth={1.5} className="text-red-500" />,
	},
	{
		id: "3",
		title: "Pending Verification",
		amount: 10,
		colorClass: "text-yellow-400",
		icon: (
			<LoaderCircle
				size={16}
				strokeWidth={1.5}
				className="text-yellow-500 animate-spin"
			/>
		),
	},
	{
		id: "4",
		title: "Blocked Workers",
		amount: 40,
		colorClass: "text-red-600",
		icon: <ShieldBan size={16} strokeWidth={1.5} className="text-red-500" />,
	},
];

const Stats = () => {
	return (
		<div className="p-4 grid md:grid-cols-4 grid-cols-2 gap-5 ">
			{statsCardData?.map((el) => (
				<StatsCard key={el?.id} {...el} />
			))}
		</div>
	);
};

export default Stats;
