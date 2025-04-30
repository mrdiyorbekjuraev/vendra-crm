"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useStoreCache } from "@/services/main/base";
import { useStoresModal } from "@/stores/generic/stores";
import { useCurrentStore } from "@/stores/main/current-store";
import {
	ChevronDown,
	CircleCheck,
	GalleryVerticalEnd,
	LogOut,
	LucideIcon,
	PanelLeft,
	PanelLeftClose,
	Plus,
	Settings,
	User,
	UserPlus,
} from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect, memo } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Loading from "./loading";

type TMenuItems = {
	icon: LucideIcon;
	label: string;
	type: "default" | "destructive";
	onClick: (router: AppRouterInstance) => void;
	hasSeparator: boolean;
};

const NavHeader = memo(() => {
	const { setOpen } = useSidebar();
	const [isHovered, setIsHovered] = useState(false);
	const router = useRouter();
	const signOut = useSignOut();
	const {
		stores: { data: stores, isLoading },
	} = useStoreCache();
	const { currentStore, setCurrentStore } = useCurrentStore();
	const { setModal } = useStoresModal();

	useEffect(() => {
		const firstStore = stores?.data?.[0];
		if (!currentStore && firstStore) {
			setCurrentStore(firstStore);
		}
	}, [setCurrentStore, currentStore, stores]);

	const MENU_ITEMS: TMenuItems[] = [
		{
			icon: Plus,
			label: "Add Shop",
			type: "default",
			onClick: () => setModal({ createStore: true }),
			hasSeparator: true,
		},
		{
			icon: User,
			label: "Account Settings",
			type: "default",
			onClick: (router: AppRouterInstance) => router.push("/settings/account"),
			hasSeparator: false,
		},
		{
			icon: Settings,
			label: "Workspace Settings",
			type: "default",
			onClick: (router: AppRouterInstance) => router.push("/settings/general"),
			hasSeparator: true,
		},
		{
			icon: UserPlus,
			label: "Add workers",
			type: "default",
			onClick: () => {},
			hasSeparator: true,
		},
		{
			icon: LogOut,
			label: "Sign Out",
			type: "destructive",
			onClick: (router: AppRouterInstance) => {
				signOut();
				router.push("/sign-in");
				sessionStorage.clear();
				localStorage.clear();
			},
			hasSeparator: false,
		},
	];

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);
	const handleCollapseSidebar = useCallback(() => setOpen(false), [setOpen]);

	const renderMenuItems = useCallback(() => {
		return MENU_ITEMS.map((item) => (
			<React.Fragment key={item.label}>
				<DropdownMenuItem
					className="cursor-pointer dark:hover:bg-zinc-500/10 rounded-[9px]"
					onClick={() => item.onClick(router)}
					variant={item?.type}
				>
					<div className="flex items-center gap-3">
						<item.icon
							className={cn(item?.type === "destructive" && "text-red-400")}
						/>
						<span className="text-sm font-medium">{item.label}</span>
					</div>
				</DropdownMenuItem>
				{item.hasSeparator && <DropdownMenuSeparator />}
			</React.Fragment>
		));
	}, [router, signOut]);

	if (isLoading) return <Loading />;

	return (
		<SidebarHeader className="p-0 duration-300 transition-all border-b">
			<div className="w-full relative">
				<DropdownMenu>
					<DropdownMenuTrigger
						className="w-full h-12 px-4 outline-0 cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center gap-4">
							<div className="text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg">
								<Avatar className="w-7 h-7 rounded-md">
									<AvatarImage
										src={currentStore?.logoUrl}
										alt="User"
										className="rounded-none"
									/>
									<AvatarFallback className="rounded-sm">
										{currentStore?.name?.[0]}
									</AvatarFallback>
								</Avatar>
							</div>
							<div className="flex gap-1 items-center flex-1 text-left text-sm leading-tight">
								<span className="truncate tracking-[-0.02em] font-semibold leading-[20px] text-[16px]">
									{currentStore?.name}
								</span>
								<ChevronDown size={14} className="mt-1" />
							</div>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-[16px] mt-1 ml-3 shadow-md bg-sidebar "
						align="start"
					>
						{stores?.data?.map((el) => (
							<DropdownMenuItem
								key={el?.id}
								className="flex items-center justify-between cursor-pointer dark:hover:bg-zinc-500/10 rounded-[9px]"
								onClick={() => setCurrentStore(el)}
							>
								<div className="flex items-center gap-2">
									<Avatar className="w-5 h-5 rounded-full border">
										<AvatarImage
											src={el?.logoUrl}
											alt="User"
											className="rounded-none"
										/>
										<AvatarFallback className="rounded-sm">
											{el?.name?.[0]}
										</AvatarFallback>
									</Avatar>
									<span className="text-sm font-medium">{el?.name}</span>
								</div>
								{currentStore?.id === el?.id && (
									<CircleCheck
										className="text-blue-500"
										fill="#318CE7"
										stroke="white"
									/>
								)}
							</DropdownMenuItem>
						))}
						{renderMenuItems()}
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="absolute right-2 top-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger
								onClick={handleCollapseSidebar}
								className="cursor-pointer"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								{isHovered ? (
									<PanelLeftClose className="h-4 w-4 text-zinc-500" />
								) : (
									<PanelLeft className="h-4 w-4 text-zinc-500" />
								)}
							</TooltipTrigger>
							<TooltipContent className="flex w-full flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 mt-3">
								<div className="flex items-center gap-2">
									<p className="text-white text-xs font-medium">
										Collapse Sidebar
									</p>
									<div className="flex items-center gap-2">
										<kbd className="pointer-events-none hidden h-4 select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600  px-0.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
											<span className="text-xs">CTRL</span>
										</kbd>
										<kbd className="pointer-events-none hidden size-4 select-none justify-center items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
											<span className="text-xs">.</span>
										</kbd>
									</div>
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</SidebarHeader>
	);
});

export default NavHeader;
