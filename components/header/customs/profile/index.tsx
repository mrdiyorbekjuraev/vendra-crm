"use client";

import {
	Bell,
	CreditCard,
	HelpCircle,
	LogOut,
	Moon,
	Settings,
	Sun,
	User,
	UserPlus,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserCache } from "@/services/main/base";
import { getInitials } from "@/utils/get-initial";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface ProfileDropdownProps {
	user: {
		name: string;
		email: string;
		image?: string;
		role?: string;
	};
}

export const ProfileDropdown = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const router = useRouter();
	const isDarkMode = resolvedTheme === "dark";
	const {
		user: { data: user, isLoading },
	} = useUserCache();

	const toggleTheme = () => {
		if (isDarkMode) {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	if (isLoading) return <Skeleton className="size-6 rounded-full" />;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative size-8 rounded-full"
					withAnimation={false}
				>
					<Avatar className="h-6 w-6">
						<AvatarImage
							src={
								user?.data?.profilePhotoUrl ??
								"/placeholder.svg?height=32&width=32"
							}
							alt={user?.data?.firstName}
						/>
						<AvatarFallback>
							{getInitials(`${user?.data?.firstName} ${user?.data?.lastName}`)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56 dark:bg-sidebar rounded-[12px]"
				align="end"
				forceMount
			>
				<DropdownMenuLabel className="font-normal">
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-2">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={
										user?.data?.profilePhotoUrl ??
										"/placeholder.svg?height=32&width=32"
									}
									alt={user?.data?.firstName}
								/>
								<AvatarFallback>
									{getInitials(
										`${user?.data?.firstName} ${user?.data?.lastName}`,
									)}
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-sm font-medium leading-none">{`${user?.data?.firstName} ${user?.data?.lastName}`}</p>
							<p className="text-xs leading-none text-muted-foreground">
								{user?.data?.phoneNumber}
							</p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router?.push("/settings/account")} className="dark:hover:bg-zinc-500/10 cursor-pointer"> 
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					{/* <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem> */}
					<DropdownMenuItem onClick={() => router?.push("/settings/account")} className="dark:hover:bg-zinc-500/10 cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{/* <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuItem> */}
					<DropdownMenuItem className="dark:hover:bg-zinc-500/10 cursor-pointer">
						<Bell className="mr-2 h-4 w-4" />
						<span>Notifications</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={toggleTheme} className="dark:hover:bg-zinc-500/10 cursor-pointer">
					{isDarkMode ? (
						<>
							<Sun className="mr-2 h-4 w-4" />
							<span>Light mode</span>
						</>
					) : (
						<>
							<Moon className="mr-2 h-4 w-4" />
							<span>Dark mode</span>
						</>
					)}
				</DropdownMenuItem>
				<DropdownMenuItem className="dark:hover:bg-zinc-500/10 cursor-pointer">
					<HelpCircle className="mr-2 h-4 w-4" />
					<span>Help</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive" className="dark:hover:bg-zinc-500/10 cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
