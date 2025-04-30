"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";
import {
	BarChart3,
	ChevronDown,
	ChevronUp,
	Clock,
	DollarSign,
	GitBranch,
	MapPin,
	Package,
	ShoppingBag,
	Users,
} from "lucide-react";
import { type FC, useState } from "react";

export const StoreNode: FC<NodeProps<Node<any, any>>> = ({
	data,
	isConnectable,
}) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
			case "active":
				return "bg-emerald-500 text-emerald-50 dark:bg-emerald-600";
			case "maintenance":
				return "bg-amber-500 text-amber-50 dark:bg-amber-600";
			case "closed":
				return "bg-rose-500 text-rose-50 dark:bg-rose-600";
			default:
				return "bg-emerald-500 text-emerald-50 dark:bg-emerald-600";
		}
	};

	return (
		<div className="w-[300px] relative group">
			{/* Double border effect - outer solid, inner dashed */}

			{/* Main content with padding to account for borders */}
			<div className="relative m-[6px] bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200">
				{/* Store header */}
				<div className="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 p-4 text-white">
					<div className="flex justify-between items-start">
						<div className="flex items-center gap-3">
							<div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
								<ShoppingBag className="h-5 w-5 text-white" />
							</div>
							<div>
								<h3 className="font-bold">{data.name || "Store Name"}</h3>
								<p className="text-xs text-blue-100">
									{data.id || "store-123"}
								</p>
							</div>
						</div>
						<Badge
							className={cn(
								"border-0",
								getStatusColor(data.status || "Active"),
							)}
						>
							{data.status || "Active"}
						</Badge>
					</div>
				</div>

				{/* Store metrics */}
				<div className="p-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center gap-2">
							<div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
								<Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Products
								</p>
								<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
									{data.products || "124"}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
								<DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Revenue
								</p>
								<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
									{data.revenue || "$12.4k"}
								</p>
							</div>
						</div>
					</div>

					{/* Performance bar */}
					<div className="mt-4">
						<div className="flex justify-between items-center mb-1">
							<div className="flex items-center gap-1">
								<BarChart3 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
								<span className="text-xs font-medium text-slate-700 dark:text-slate-300">
									Performance
								</span>
							</div>
							<span className="text-xs font-semibold dark:text-slate-300">
								{data.performance || "76%"}
							</span>
						</div>
						<div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
							<div
								className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-full"
								style={{
									width: data.performanceValue
										? `${data.performanceValue}%`
										: "76%",
								}}
							/>
						</div>
					</div>

					{/* Expandable section */}
					{expanded && (
						<div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
							<div className="flex items-center gap-2">
								<div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
									<Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Customers
									</p>
									<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
										{data.customers || "1,240"}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
									<MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Location
									</p>
									<p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
										{data.location || "123 Retail Ave, Shopping District"}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Avg. Order
									</p>
									<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
										{data.avgOrder || "$86.32"}
									</p>
								</div>
								<div>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Return Rate
									</p>
									<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
										{data.returnRate || "2.4%"}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
									<Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										Hours
									</p>
									<p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
										{data.hours || "9:00 AM - 9:00 PM"}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700 flex justify-center">
					<Button
						size={"sm"}
						variant={"ghost"}
						onClick={() => setExpanded(!expanded)}
						className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					>
						{expanded ? (
							<>
								<ChevronUp className="h-3.5 w-3.5" /> Show less
							</>
						) : (
							<>
								<ChevronDown className="h-3.5 w-3.5" /> Show more
							</>
						)}
					</Button>
				</div>
			</div>

			{/* React Flow handles */}

			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
				className="w-3 h-3 border-2 bg-white dark:bg-slate-800 border-blue-400 dark:border-blue-500"
			/>
		</div>
	);
};
