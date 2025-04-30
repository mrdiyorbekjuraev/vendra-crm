"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { getStatusColor } from "@/lib/status-colors";
import { cn } from "@/lib/utils";
import { useCurrentBranch } from "@/stores/main/current-branch";
import { useCurrentStore } from "@/stores/main/current-store";
import { TWorker } from "@/types/main/workers";
import { formatDate } from "@/utils/format-date";
import { getInitials } from "@/utils/get-initial";
import type { ICellRendererParams } from "ag-grid-community";
import {
	AtSign,
	Briefcase,
	CheckSquare,
	Globe,
	MapPin,
	MessageCircle,
	MessagesSquare,
	Star,
	StickyNote,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";

const COLOR_MAP: Record<string, string> = {
	D: "bg-blue-500",
	E: "bg-green-500",
	F: "bg-purple-500",
	H: "bg-red-500",
	L: "bg-yellow-500",
	M: "bg-pink-500",
	O: "bg-indigo-500",
	P: "bg-teal-500",
	S: "bg-orange-500",
	T: "bg-cyan-500",
} as const;

export const FullName = memo((params: ICellRendererParams) => {
	const { push } = useRouter();
	const name = `${params.value?.firstName} ${params?.value?.lastName}`;

	const initial = useMemo(() => getInitials(name), [name]);

	const bgColor = useMemo(() => COLOR_MAP[initial] || "bg-gray-500", [initial]);

	return (
		<div className="flex items-center min-h-[35px] group">
			<div className="flex items-center  justify-between w-full">
				<HoverCard>
					<HoverCardTrigger
						asChild
						onClick={() => push(`/management/workers/${params?.data?.id}`)}
						className=" mb-1"
					>
						<div className="bg-transparent rounded-[9px] w-fit px-1 flex items-center h-7 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer transition-all">
							<div className="flex items-center gap-1 ">
								<Avatar className="size-6">
									<AvatarImage src={params?.value?.profilePhotoUrl} />
									<AvatarFallback
										className={`h-6 w-6 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
									>
										{initial}
									</AvatarFallback>
								</Avatar>
								<span className="font-medium underline decoration-zinc-400  overflow-hidden text-ellipsis">
									{name}
								</span>
							</div>
						</div>
					</HoverCardTrigger>
					<HoverCardContent
						className="w-xs dark:bg-sidebar px-0 rounded-[9px]"
						align="start"
					>
						<div className="w-full">
							<div className="px-4 pb-2 space-y-0">
								<div className="flex items-center space-x-3">
									<button
										type="button"
										className="relative w-10 h-10 flex-shrink-0 cursor-pointer"
										onClick={() => push(`/people/${params?.data?.id}`)}
									>
										<Avatar className="size-10 rounded-md">
											<AvatarImage src={params?.data?.avatar} />
											<AvatarFallback
												className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
											>
												{initial}
											</AvatarFallback>
										</Avatar>
									</button>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<button
												type="button"
												className=" font-semibold text-md underline cursor-pointer"
												onClick={() =>
													push(`/management/workers/${params?.data?.id}`)
												}
											>
												{name}
											</button>
										</div>
										<p className="text-muted-foreground text-sm lowercase">
											{params?.data?.email}
										</p>
									</div>
								</div>
								<Badge
									variant="secondary"
									className="justify-start font-normal rounded-[9px]  dark:bg-accent mt-2"
								>
									<div className="size-3 bg-green-500 rounded-full pulse green pulse-animation" />
									{""}
									No communication found
								</Badge>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>

			<Button
				className="ml-auto translate-x-10 transition-transform duration-200 size-6 group-hover:translate-x-0"
				size="icon"
				variant="ghost"
			>
				<MessageCircle size={8} strokeWidth={1.5} />
			</Button>
		</div>
	);
});

export const RoleNameRenderer = memo((params: ICellRendererParams) => {
	const { currentStore } = useCurrentStore();
	const { currentBranch } = useCurrentBranch();
	const role = params?.data?.workerRoles?.find(
		(el: any) =>
			el?.branchId === currentBranch?.id &&
			el?.branch?.storeId === currentStore?.id,
	);
	return <span>{role?.role?.name ?? "No data"}</span>;
});
// GROUP NAME CELL RENDERER
export const StoreNameRenderer = (params: ICellRendererParams) => {
	const { push } = useRouter();

	const name = params?.value?.[0].branch?.name;

	const initial = useMemo(() => getInitials(name), [name]);

	const bgColor = useMemo(() => COLOR_MAP[initial] || "bg-gray-500", [initial]);

	return (
		<div
			className={`flex items-center min-h-[35px] group ${
				params?.value?.id === 11 && "sticky top-0"
			}`}
		>
			<div className="flex items-center justify-between w-full">
				<HoverCard>
					<HoverCardTrigger
						asChild
						onClick={() => push(`/groups/${params?.value?.id}`)}
						className=" mb-1"
					>
						<div className="bg-transparent rounded-[9px] w-fit px-1 flex items-center h-7  border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer transition-all">
							<div className="flex items-center gap-1">
								<div
									className={`h-6 w-6 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
								>
									{initial}
								</div>
								<span className="font-medium underline decoration-zinc-400  overflow-hidden text-ellipsis">
									{name}
								</span>
							</div>
						</div>
					</HoverCardTrigger>
					<HoverCardContent
						className="w-xs dark:bg-sidebar px-0 rounded-[9px]"
						align="end"
					>
						<div className="w-full">
							<div className="px-4 pb-2 space-y-0">
								<div className="flex items-center space-x-3">
									<button
										type="button"
										className="relative w-10 h-10 flex-shrink-0 cursor-pointer"
										onClick={() => push(`/groups/${params?.value?.id}`)}
									>
										<div
											className={`h-9 w-9 rounded-[9px] ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
										>
											{initial}
										</div>
									</button>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<button
												type="button"
												className=" font-semibold text-md underline cursor-pointer"
												onClick={() => push(`/groups/${params?.value?.id}`)}
											>
												{name}
											</button>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<Star
													size={16}
													strokeWidth={1.5}
													className={cn("text-zinc-500")}
												/>
											</Button>
										</div>
										<p className="text-muted-foreground text-sm lowercase">
											{name}.com
										</p>
									</div>
								</div>
								<Badge
									variant="secondary"
									className="justify-start font-normal rounded-[9px]  dark:bg-accent mt-2"
								>
									<div className="size-3 bg-green-500 rounded-full pulse green pulse-animation" />
									{""}
									No communication found
								</Badge>
							</div>

							<Separator />
							<div className="px-4 py-1">
								<div className="space-y-3">
									<div className="flex items-start space-x-3">
										<Briefcase size={16} strokeWidth={1.5} />
										<p className="text-primary text-sm flex-1  line-clamp-2">
											Microsoft develops, licenses, and supports a wide range of
											software products and services, ...
										</p>
									</div>

									<div className="flex items-center space-x-3">
										<Globe size={16} strokeWidth={1.5} />
										<a
											href="https://microsoft.com"
											className="text-blue-400 text-sm hover:underline"
										>
											{name}.com
										</a>
									</div>

									<div className="flex items-center space-x-3">
										<MapPin size={16} strokeWidth={1.5} />
										<p className="text-sm">Redmond</p>
									</div>
								</div>

								<div className="flex items-center space-x-4 pt-2">
									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:bg-zinc-150 cursor-pointer size-6 shadow-sm rounded-sm"
										>
											<StickyNote
												size={16}
												strokeWidth={1.5}
												className="text-zinc-500 p-1"
											/>
										</TooltipTrigger>
										<TooltipContent side="bottom" className="mt-1">
											Notes
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:bg-zinc-150 cursor-pointer size-6 shadow-sm rounded-sm"
										>
											<CheckSquare
												className="text-zinc-500 p-1"
												size={16}
												strokeWidth={1.5}
											/>
										</TooltipTrigger>
										<TooltipContent side="bottom" className="mt-1">
											Tasks
										</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:bg-zinc-150 cursor-pointer size-6 shadow-sm rounded-sm"
										>
											<MessagesSquare
												size={16}
												strokeWidth={1.5}
												className="text-zinc-500 p-1"
											/>
										</TooltipTrigger>
										<TooltipContent side="bottom" className="mt-1">
											Comments
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	);
};

export const ManagerRenderer = (params: ICellRendererParams) => {
	const { push } = useRouter();
	const name = params.value.fullName;

	const initial = useMemo(
		() => params.value.fullName.charAt(0),
		[params.value.fullName],
	);

	const bgColor = useMemo(() => COLOR_MAP[initial] || "bg-gray-500", [initial]);

	return (
		<div className="flex items-center min-h-[35px] group">
			<div className="flex items-center  justify-between w-full">
				<HoverCard>
					<HoverCardTrigger
						asChild
						onClick={() => push(`/people/${params?.value.id}`)}
						className=" mb-1"
					>
						<div className="bg-transparent rounded-[9px] w-fit px-1 flex items-center h-7 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer transition-all">
							<div className="flex items-center gap-1 ">
								<Avatar className="size-6">
									<AvatarImage src={params?.value.avatar} />
									<AvatarFallback
										className={`h-6 w-6 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
									>
										{initial}
									</AvatarFallback>
								</Avatar>
								<span className="font-medium underline decoration-zinc-400  overflow-hidden text-ellipsis">
									{name}
								</span>
							</div>
						</div>
					</HoverCardTrigger>
					<HoverCardContent
						className="w-xs dark:bg-sidebar px-0 rounded-[9px]"
						align="start"
					>
						<div className="w-full">
							<div className="px-4 pb-2 space-y-0">
								<div className="flex items-center space-x-3">
									<button
										type="button"
										className="relative w-10 h-10 flex-shrink-0 cursor-pointer"
										onClick={() => push(`/people/${params?.value.id}`)}
									>
										<Avatar className="size-10 rounded-md">
											<AvatarImage src={params?.value.avatar} />
											<AvatarFallback
												className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
											>
												{initial}
											</AvatarFallback>
										</Avatar>
									</button>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<button
												type="button"
												className=" font-semibold text-md underline cursor-pointer"
												onClick={() => push(`/people/${params?.value.id}`)}
											>
												{name}
											</button>
											<Button variant="ghost" size="icon" className="h-8 w-8">
												<Star
													size={16}
													strokeWidth={1.5}
													className={cn("text-zinc-500")}
												/>
											</Button>
										</div>
										<p className="text-muted-foreground text-sm lowercase">
											{params?.value.email}
										</p>
									</div>
								</div>
								<Badge
									variant="secondary"
									className="justify-start font-normal rounded-[9px]  dark:bg-accent mt-2"
								>
									<div className="size-3 bg-green-500 rounded-full pulse green pulse-animation" />
									{""}
									No communication found
								</Badge>
							</div>

							<Separator />
							<div className="px-4 py-1">
								<div className="space-y-3">
									<div className="flex items-center space-x-3">
										<AtSign size={16} strokeWidth={1.5} />
										<a
											className="text-blue-400 text-sm hover:underline"
											href="#/"
										>
											{params?.value.email}
										</a>
									</div>
								</div>

								<div className="flex items-center space-x-4 pt-2">
									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:bg-zinc-150 cursor-pointer size-6 shadow-sm rounded-sm"
										>
											<StickyNote
												size={16}
												strokeWidth={1.5}
												className="text-zinc-500 p-1"
											/>
										</TooltipTrigger>
										<TooltipContent side="bottom" className="mt-1">
											Notes
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:bg-zinc-150 cursor-pointer size-6 shadow-sm rounded-sm"
										>
											<CheckSquare
												className="text-zinc-500 p-1"
												size={16}
												strokeWidth={1.5}
											/>
										</TooltipTrigger>
										<TooltipContent side="bottom" className="mt-1">
											Tasks
										</TooltipContent>
									</Tooltip>

									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:bg-zinc-150 cursor-pointer size-6 shadow-sm rounded-sm"
										>
											<MessagesSquare
												size={16}
												strokeWidth={1.5}
												className="text-zinc-500 p-1"
											/>
										</TooltipTrigger>
										<TooltipContent side="bottom" className="mt-1">
											Comments
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>

			<Button
				className="ml-auto translate-x-10 transition-transform duration-200 size-6 group-hover:translate-x-0"
				size="icon"
				variant="ghost"
			>
				<MessageCircle size={8} strokeWidth={1.5} />
			</Button>
		</div>
	);
};

export const StatusRenderer = (params: ICellRendererParams) => {
	return (
		<Badge color={getStatusColor(params?.value)} className={cn("capitalize")}>
			{params?.value}
		</Badge>
	);
};

export const CreatedAtRenderer = memo((params: ICellRendererParams) => {
	const lang = useLanguage();
	return (
		<div className="flex items-center justify-between">
			<span>{formatDate(params?.value, lang)}</span>
		</div>
	);
});

export const BirthDateRenderer = memo((params: ICellRendererParams) => {
	const lang = useLanguage();
	return (
		<div className="flex items-center justify-between">
			<span>{formatDate(params?.value, lang)}</span>
		</div>
	);
});
