"use client";

import { MoreVerticalIcon, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useBranchesCache } from "@/services/main/base";
import { useBranchesModal } from "@/stores/generic/branch";
import { useCurrentBranch } from "@/stores/main/current-branch";
import { useEffect } from "react";
import Loading from "./loading";

export function Branches() {
	const { isMobile } = useSidebar();
	const { setModal } = useBranchesModal();
	const { setCurrentBranch, currentBranch } = useCurrentBranch();
	const {
		branches: { data: branches, isLoading },
	} = useBranchesCache();

	useEffect(() => {
		const firstStore = branches?.data?.[0];
		if (!currentBranch && firstStore) {
			setCurrentBranch(firstStore);
		}
		if (branches?.data.length === 0) {
			setCurrentBranch(null);
		}
	}, [setCurrentBranch, branches, currentBranch]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg grayscale">
								<AvatarImage src={""} alt={"branch profile image"} />
								<AvatarFallback className="rounded-lg">
									{currentBranch?.name[0]}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{currentBranch?.name ?? "Branch name here"}
								</span>
								<span className="truncate text-xs text-muted-foreground">
									{currentBranch?.address ?? "Branch address here"}
								</span>
							</div>
							<MoreVerticalIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							{branches?.data?.map((el) => (
								<DropdownMenuItem
									key={el?.id}
									className="cursor-pointer"
									onClick={() => {
										if (el?.id !== currentBranch?.id) {
											setCurrentBranch(el);
										}
									}}
								>
									<div className="flex items-center gap-2">
										<Avatar className="h-8 w-8 rounded-lg grayscale">
											<AvatarImage src={""} alt={"branch profile image"} />
											<AvatarFallback className="rounded-lg">
												{el?.name[0]}
											</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">{el?.name}</span>
											<span className="truncate text-xs text-muted-foreground">
												{el?.address}
											</span>
										</div>
										{currentBranch?.id === el?.id && (
											<Badge color="green">Active</Badge>
										)}
									</div>
								</DropdownMenuItem>
							))}
							{currentBranch?.id && <DropdownMenuSeparator />}
							<DropdownMenuItem
								className="px-4 cursor-pointer"
								onClick={() => setModal({ createBranch: true })}
							>
								<Plus /> <span className="pl-2">Create new branch</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
