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
import {
	Popover,
	PopoverContent,
	PopoverItem,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { getStatusColor } from "@/lib/status-colors";
import { cn } from "@/lib/utils";
import { useRoleCache } from "@/services/main/roles/role";
import { useCurrentStore } from "@/stores/main/current-store";
import { usePermissionStore, useRoleModal } from "@/stores/main/roles";
import type { TStatus } from "@/types/shared";
import { formatDate } from "@/utils/format-date";
import { getInitials } from "@/utils/get-initial";
import { useRolesFeatures } from "@/views/main/roles/features";
import { CircleCheck, Trash2 } from "lucide-react";
import { useRoleFeatures } from "../../../../features";
import { Loading } from "./loading";

export const Header = () => {
	const {
		role: { data: role, isLoading, refetch },
	} = useRoleCache();
	const { handleRolePermissionAssignee } = useRoleFeatures();
	const { permissions, setPermissions } = usePermissionStore();
	const { currentStore } = useCurrentStore();
	const { handleRoleUpdate } = useRolesFeatures();
	const { setModal } = useRoleModal();
	const lang = useLanguage();

	if (isLoading) return <Loading />;

	const creatorName = `${role?.data?.creator?.firstName} ${role?.data?.creator?.lastName}`;

	const data = permissions?.map((el) => {
		return {
			resource: el?.resource,
			permission: [...el?.actions],
		};
	});

	const handleSubmit = async () => {
		await handleRolePermissionAssignee.mutateAsync({
			roleId: String(role?.data?.id),
			permissions: data,
		});
	};

	const handleStatusUpdate = async (status: TStatus) => {
		await handleRoleUpdate.mutateAsync({
			id: role?.data?.id,
			status,
		});
		refetch();
	};

	return (
		<div>
			<div className="flex items-center gap-1 h-[50px] px-3 border-b">
				<Avatar>
					<AvatarImage src={""} />
					<AvatarFallback className="bg-green-800 text-white">
						{getInitials(String(role?.data?.name))}
					</AvatarFallback>
				</Avatar>
				<Button className="text-md font-semibold h-7" variant="ghost" size="sm">
					{role?.data?.name}
				</Button>

				<div className="ml-auto flex items-center gap-2">
					<div className="text-sm text-muted-foreground">
						Last Updated:{" "}
						<span className="font-medium text-primary">6 minutes ago</span>
					</div>
					<Button size="sm" onClick={() => handleSubmit()}>
						Save changes
					</Button>
					<TooltipWrapper content="Remove role">
						<Button
							variant="destructive"
							size="icon"
							className="size-6.5 transition-all duration-200"
							onClick={() =>
								setModal({
									remove: {
										open: true,
										props: {
											roleIds: [String(role?.data?.id)],
										},
									},
								})
							}
						>
							<Trash2 size={16} strokeWidth={1.5} />
						</Button>
					</TooltipWrapper>
				</div>
			</div>
			<div className="flex items-center py-2 bg-muted/40 border-b px-3 gap-2">
				<div className="flex items-center gap-2 w-full">
					<HoverCard>
						<HoverCardTrigger asChild className=" mb-1">
							<div className="bg-transparent rounded-[9px] w-fit px-1 flex items-center h-7 border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer transition-all">
								<div className="flex items-center gap-1 ">
									<Avatar className="size-5">
										<AvatarImage src={role?.data?.creator?.profilePhotoUrl} />
										<AvatarFallback
											className={
												"h-5 w-5 rounded-full bg-orange-500  flex items-center justify-center mr-2 text-white text-[10px] font-medium flex-shrink-0  `1"
											}
										>
											{getInitials(creatorName)}
										</AvatarFallback>
									</Avatar>
									<span className="font-medium underline decoration-zinc-400  overflow-hidden text-ellipsis">
										{creatorName}
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
										>
											<Avatar className="size-10 rounded-md">
												<AvatarImage
													src={role?.data?.creator?.profilePhotoUrl}
												/>
												<AvatarFallback
													className={
														"h-10 w-10 rounded-full bg-orange-500  flex items-center justify-center mr-2 text-white text-xs font-medium flex-shrink-0"
													}
												>
													{getInitials(creatorName)}
												</AvatarFallback>
											</Avatar>
										</button>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<button
													type="button"
													className=" font-semibold text-md underline cursor-pointer"
												>
													{creatorName}
												</button>
											</div>
											<p className="text-muted-foreground text-sm lowercase">
												{role?.data?.creator?.phoneNumber}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2" />
								</div>

								<Separator />
								<div className="px-4  pt-4 flex flex-col justify-between">
									<span className="text-xs text-muted-foreground">
										Created at:{" "}
										{formatDate(String(role?.data?.creator?.createdAt), lang)}
									</span>
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>

					<Badge className="" color="yellow">
						<Avatar className="size-4 rounded-sm">
							<AvatarImage src={currentStore?.logoUrl} />
							<AvatarFallback className="bg-orange-500 text-white rounded-sm text-[8px]">
								{getInitials(String(currentStore?.name))}
							</AvatarFallback>
						</Avatar>
						{currentStore?.name}
					</Badge>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Badge
								color={getStatusColor(role?.data?.status ?? "")}
								className={cn("capitalize cursor-pointer")}
							>
								{role?.data?.status}
							</Badge>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-[200px] dark:bg-sidebar"
							align="start"
						>
							<DropdownMenuItem
								className="w-full "
								onClick={() => handleStatusUpdate("ACTIVE")}
								disabled={role?.data?.status === "ACTIVE"}
							>
								<div className="flex items-center justify-between w-full">
									<Badge
										color={getStatusColor("ACTIVE")}
										className={cn("capitalize cursor-pointer")}
									>
										ACTIVE
									</Badge>
									{role?.data?.status === "ACTIVE" && (
										<CircleCheck className="text-blue-600" />
									)}
								</div>
							</DropdownMenuItem>

							<DropdownMenuItem
								onClick={() => handleStatusUpdate("ARCHIVED")}
								disabled={role?.data?.status === "ARCHIVED"}
							>
								<div className="flex items-center justify-between w-full">
									<Badge
										color={getStatusColor("ARCHIVE")}
										className={cn("capitalize cursor-pointer")}
									>
										ARCHIVED
									</Badge>
									{role?.data?.status === "ARCHIVED" && (
										<CircleCheck className="text-blue-600" />
									)}
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};
