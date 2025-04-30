"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import MainTextArea from "@/components/ui/main-textarea";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { getStatusColor } from "@/lib/status-colors";
import { cn } from "@/lib/utils";
import type { TStatus } from "@/types/shared";
import { formatDate } from "@/utils/format-date";
import { getInitials } from "@/utils/get-initial";
import { useRolesFeatures } from "@/views/main/roles/features";
import type { ICellRendererParams } from "ag-grid-community";
import { debounce } from "lodash";
import {
	AtSign,
	Briefcase,
	CheckSquare,
	CircleCheck,
	Globe,
	Loader,
	MapPin,
	MessageCircle,
	MessagesSquare,
	Star,
	StickyNote,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useRef, useState } from "react";

const COLOR_VALUES = [
	"bg-blue-500",
	"bg-green-500",
	"bg-purple-500",
	"bg-red-500",
	"bg-yellow-500",
	"bg-pink-500",
	"bg-indigo-500",
	"bg-teal-500",
	"bg-orange-500",
	"bg-cyan-500",
];

/**
 * Get a consistent color based on a string input (e.g., initials or ID)
 */
export function getBgColor(seed: string): string {
	let hash = 0;

	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}

	const index = Math.abs(hash) % COLOR_VALUES.length;
	return COLOR_VALUES[index];
}

export const FullName = memo((params: ICellRendererParams) => {
	const { push } = useRouter();
	const name = params.value;

	const initial = getInitials(params?.value);

	const bgColor = useMemo(() => getBgColor(initial), [initial]);
	const lang = useLanguage();

	const creatorName = `${params?.data?.creator?.firstName} ${params?.data?.creator?.lastName}`;

	return (
		<div className="flex items-center min-h-[35px] group">
			<div className="flex items-center  justify-between w-full">
				<HoverCard>
					<HoverCardTrigger
						asChild
						onClick={() => push(`/management/roles/${params?.data?.id}`)}
						className=" mb-1"
					>
						<div className="bg-transparent rounded-[9px] w-fit px-1 flex items-center h-7 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer transition-all">
							<div className="flex items-center gap-1 ">
								<Avatar className="size-6">
									<AvatarImage src={params?.data?.avatar} />
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
										onClick={() =>
											push(`/management/roles/${params?.data?.id}`)
										}
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
													push(`/management/roles/${params?.data?.id}`)
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
								<div className="flex items-center gap-2">
									<Badge
										color={getStatusColor(params?.data?.status)}
										className="justify-start font-normal rounded-[9px]  dark:bg-accent mt-2"
									>
										{params?.data?.status}
									</Badge>
									{params?.data?.creator && (
										<Badge color="blue" className="mt-2">
											<Avatar className="size-4 rounded-md">
												<AvatarImage
													src={params?.data?.creator?.profilePhotoUrl ?? ""}
												/>
												<AvatarFallback
													className={
														"size-4 rounded-full  flex items-center justify-center mr-2 text-white text-[10px] font-medium flex-shrink-0"
													}
												>
													{getInitials(creatorName)}
												</AvatarFallback>
											</Avatar>
											<span>{creatorName}</span>
										</Badge>
									)}
								</div>
							</div>

							<Separator />
							<div className="px-4  pt-4 flex flex-col justify-between">
								<span className="text-xs text-muted-foreground">
									Created at: {formatDate(params?.data?.createdAt, lang)}
								</span>
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

// GROUP NAME CELL RENDERER
export const GroupNameRenderer = (params: ICellRendererParams) => {
	const { push } = useRouter();

	const name = params?.value?.name;

	const initial = useMemo(() => params?.value?.name?.charAt(0), [params.value]);

	const bgColor = useMemo(() => getBgColor(initial), [initial]);

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

export const CreatorRenderer = (params: ICellRendererParams) => {
	const { push } = useRouter();
	const name = `${params?.value?.firstName} ${params?.value?.lastName}`;

	const bgColor = useMemo(
		() => getBgColor(getInitials(name)),
		[getInitials(name)],
	);

	return (
		<div className="flex items-center min-h-[35px] group">
			<div className="flex items-center  justify-between w-full">
				<HoverCard>
					<HoverCardTrigger
						asChild
						onClick={() => push(`/management/workers/${params?.value?.id}`)}
						className=" mb-1"
					>
						<div className="bg-transparent rounded-[9px] w-fit px-1 flex items-center h-7 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer transition-all">
							<div className="flex items-center gap-1 ">
								<Avatar className="size-6">
									<AvatarImage src={params?.value?.profilePhotoUrl} />
									<AvatarFallback
										className={`h-6 w-6 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
									>
										{getInitials(name)}
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
										onClick={() =>
											push(`/management/roles/${params?.data?.id}`)
										}
									>
										<Avatar className="size-10 rounded-md">
											<AvatarImage src={params?.value?.profilePhotoUrl} />
											<AvatarFallback
												className={`h-10 w-10 rounded-full ${bgColor} flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0`}
											>
												{getInitials(name)}
											</AvatarFallback>
										</Avatar>
									</button>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<button
												type="button"
												className=" font-semibold text-md underline cursor-pointer"
												onClick={() =>
													push(`/management/roles/${params?.data?.id}`)
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
								<div className="flex items-center gap-2">
									<Badge
										color={getStatusColor(params?.data?.status)}
										className="justify-start font-normal rounded-[9px]  dark:bg-accent mt-2"
									>
										{params?.data?.status}
									</Badge>
								</div>
							</div>

							<Separator />
							<div className="px-4  pt-4 flex flex-col justify-between">
								<span className="text-xs text-muted-foreground">
									Phone: +{params?.value?.phoneNumber}
								</span>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	);
};

export const RoleIdRenderer = memo((params: ICellRendererParams) => {
	return <span>RID-{params?.data?.id.slice(0, 5)}</span>;
});

export const DescriptionRenderer = memo((params: ICellRendererParams) => {
	const [open, setOpen] = useState<boolean>(false);
	const [localValue, setLocalValue] = useState<string>(params?.value ?? "");
	const { handleRoleUpdate } = useRolesFeatures();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setLocalValue(e.target.value);
	};

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			await handleRoleUpdate?.mutateAsync({
				id: params?.data?.id,
				description: localValue,
			});
			setOpen(false);
		}
	};
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				className="w-full text-start "
				onClick={() => setOpen(true)}
			>
				<span className="truncate max-w-full">{params?.value}</span>
			</PopoverTrigger>
			<PopoverContent className="p-0 w-[500px] shadow-none" align="start">
				<MainTextArea
					classNames={{
						input: "resize-none max-h-[200px]",
					}}
					value={localValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</PopoverContent>
		</Popover>
	);
});

export const StatusRenderer = memo((params: ICellRendererParams) => {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const { handleRoleUpdate } = useRolesFeatures();

	useEffect(() => {
		const onCellClick = (event: any) => {
			if (params?.eGridCell?.contains(event.target)) {
				setOpen(true);
			} else {
				setOpen(false);
			}
		};

		document.addEventListener("click", onCellClick);
		return () => {
			document.removeEventListener("click", onCellClick);
		};
	}, [params?.eGridCell]);

	const handleStatusUpdate = async (status: TStatus) => {
		await handleRoleUpdate.mutateAsync({
			id: params?.data?.id,
			status,
		});
	};

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Badge
					color={getStatusColor(params?.value)}
					className={cn("capitalize cursor-pointer")}
					ref={triggerRef}
				>
					{params?.value}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px] dark:bg-sidebar" align="start">
				<DropdownMenuItem
					className="w-full "
					onClick={() => handleStatusUpdate("ACTIVE")}
					disabled={params?.value === "ACTIVE"}
				>
					<div className="flex items-center justify-between w-full">
						<Badge
							ref={triggerRef}
							color={getStatusColor("ACTIVE")}
							className={cn("capitalize cursor-pointer")}
						>
							ACTIVE
						</Badge>
						{params?.value === "ACTIVE" && (
							<CircleCheck className="text-blue-600" />
						)}
					</div>
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => handleStatusUpdate("ARCHIVED")}
					disabled={params?.value === "ARCHIVED"}
				>
					<div className="flex items-center justify-between w-full">
						<Badge
							ref={triggerRef}
							color={getStatusColor("ARCHIVE")}
							className={cn("capitalize cursor-pointer")}
						>
							ARCHIVED
						</Badge>
						{params?.value === "ARCHIVED" && (
							<CircleCheck className="text-blue-600" />
						)}
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
});

export const CreatedAtRenderer = memo((params: ICellRendererParams) => {
	const lang = useLanguage();
	return (
		<div className="flex items-center justify-between">
			<span>{formatDate(params?.value, lang)}</span>
		</div>
	);
});

export const LoadingRenderer = () => {
	return (
		<div className="flex items-center min-h-[35px]">
			<Skeleton className="w-full h-4" />
		</div>
	);
};
