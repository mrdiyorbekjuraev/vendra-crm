"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import {
	Briefcase,
	Calendar,
	ChevronDown,
	ChevronUp,
	Clock,
	Mail,
	MapPin,
	Phone,
	Star,
} from "lucide-react";
import { type FC, useState } from "react";

const WorkerNode: FC<NodeProps<Node<any, any>>> = ({ data, isConnectable }) => {
	const [expanded, setExpanded] = useState(false);

	// Determine status color
	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case "on duty":
				return "bg-emerald-500 dark:bg-emerald-600";
			case "on leave":
				return "bg-amber-500 dark:bg-amber-600";
			case "off duty":
				return "bg-slate-400 dark:bg-slate-500";
			default:
				return "bg-emerald-500 dark:bg-emerald-600";
		}
	};

	// Calculate performance color
	const getPerformanceColor = (value: number) => {
		if (value >= 80)
			return "from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600";
		if (value >= 60)
			return "from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600";
		return "from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600";
	};

	const performanceValue = data.performanceValue || 85;

	return (
		<div className="w-[280px] relative group">
			{/* Double border effect - outer solid, inner dashed */}
			<div className="relative m-[6px] overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200">
				{/* Top colored banner */}
				<div className="h-12 bg-gradient-to-r from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 relative">
					<div className="absolute -bottom-10 left-4">
						<Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800 shadow-md">
							<AvatarImage
								src={data.image || "/placeholder.svg?height=80&width=80"}
								alt={data.name || "Worker"}
							/>
							<AvatarFallback className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900 text-purple-700 dark:text-purple-300 text-lg font-semibold">
								{data.name
									? data.name
											.split(" ")
											.map((n: string[]) => n[0])
											.join("")
											.substring(0, 2)
											.toUpperCase()
									: "WN"}
							</AvatarFallback>
						</Avatar>
					</div>

					{/* Status indicator */}
					<div className="absolute right-4 top-4 flex items-center gap-1.5">
						<div
							className={cn(
								"h-2.5 w-2.5 rounded-full animate-pulse",
								getStatusColor(data.status || "On Duty"),
							)}
						/>
						<span className="text-xs font-medium text-white">
							{data.status || "On Duty"}
						</span>
					</div>
				</div>

				{/* Main content */}
				<div className="pt-12 px-4 pb-3">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-bold text-slate-800 dark:text-slate-200">
								{data.name || "Worker Name"}
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								{data.position || "Position"}
							</p>
						</div>
						<Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/50 dark:text-violet-300 dark:hover:bg-violet-900 border-0">
							{data.department || "Sales"}
						</Badge>
					</div>

					{/* Performance meter */}
					<div className="mt-4">
						<div className="flex justify-between items-center mb-1">
							<div className="flex items-center gap-1">
								<Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400" />
								<span className="text-xs font-medium text-slate-700 dark:text-slate-300">
									Performance
								</span>
							</div>
							<span className="text-xs font-semibold dark:text-slate-300">
								{performanceValue}%
							</span>
						</div>
						<div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
							<div
								className={cn(
									"h-full rounded-full bg-gradient-to-r",
									getPerformanceColor(performanceValue),
								)}
								style={{ width: `${performanceValue}%` }}
							/>
						</div>
					</div>

					{/* Key info */}
					<div className="mt-4 grid grid-cols-2 gap-3">
						<div className="flex items-center gap-2">
							<div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-md">
								<Briefcase className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
							</div>
							<div>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Experience
								</p>
								<p className="text-xs font-medium text-slate-800 dark:text-slate-200">
									{data.experience || "3 years"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-md">
								<Clock className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
							</div>
							<div>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Shift
								</p>
								<p className="text-xs font-medium text-slate-800 dark:text-slate-200">
									{data.shift || "Morning"}
								</p>
							</div>
						</div>
					</div>

					{/* Expandable section */}
					{expanded && (
						<div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
							<div className="flex items-center gap-2">
								<div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-md">
									<MapPin className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Location
									</p>
									<p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
										{data.location || "Main Store, Floor 1"}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-md">
									<Calendar className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
								</div>
								<div>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Joined
									</p>
									<p className="text-xs font-medium text-slate-800 dark:text-slate-200">
										{data.joined || "Jan 15, 2023"}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Footer with actions */}
				<div className="px-4 pb-3">
					<div className="flex justify-between items-center">
						<div className="flex gap-2">
							<Button
								variant={"ghost"}
								className="flex items-center justify-center h-8 w-8 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50 transition-colors"
							>
								<Phone className="h-3.5 w-3.5" />
							</Button>
							<Button
								variant={"ghost"}
								className="flex items-center justify-center h-8 w-8 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50 transition-colors"
							>
								<Mail className="h-3.5 w-3.5" />
							</Button>
						</div>
						<Button
							variant={"ghost"}
							onClick={() => setExpanded(!expanded)}
							className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
						>
							{expanded ? (
								<>
									<ChevronUp className="h-3.5 w-3.5" /> Less info
								</>
							) : (
								<>
									<ChevronDown className="h-3.5 w-3.5" /> More info
								</>
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* React Flow handles */}
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				className="w-3 h-3 border-2 bg-white dark:bg-slate-800 border-blue-400 dark:border-blue-500"
			/>
		</div>
	);
};

export default WorkerNode;
