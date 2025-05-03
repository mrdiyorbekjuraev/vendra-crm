"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarVariant =
	| "default"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "destructive";

export interface GenericAvatarProps {
	src?: string;
	alt: string;
	name?: string;
	size?: AvatarSize;
	variant?: AvatarVariant;
	className?: string;
	fallbackClassName?: string;
	delayMs?: number;
	showFallback?: boolean;
	fallbackText?: string;
	icon?: React.ReactNode;
	status?: "online" | "offline" | "away" | "busy";
}

export function GenericAvatar({
	src,
	alt,
	name,
	size = "md",
	variant = "default",
	className,
	fallbackClassName,
	delayMs = 600,
	showFallback = true,
	fallbackText,
	icon,
	status,
	...props
}: GenericAvatarProps) {
	const [isImageLoaded, setIsImageLoaded] = React.useState(false);
	const [hasImageError, setHasImageError] = React.useState(false);

	// Generate initials from name
	const getInitials = (name?: string): string => {
		if (!name) return "";

		const parts = name.split(" ");
		if (parts.length === 1) {
			return name.substring(0, 2).toUpperCase();
		}

		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	};

	// Size classes
	const sizeClasses: Record<AvatarSize, string> = {
		xs: "h-6 w-6 text-xs",
		sm: "h-8 w-8 text-sm",
		md: "h-10 w-10 text-base",
		lg: "h-12 w-12 text-lg",
		xl: "h-16 w-16 text-xl",
		"2xl": "h-24 w-24 text-2xl",
	};

	// Variant classes for fallback
	const variantClasses: Record<AvatarVariant, string> = {
		default: "bg-muted text-muted-foreground",
		primary: "bg-primary text-primary-foreground",
		secondary: "bg-secondary text-secondary-foreground",
		success:
			"bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
		warning:
			"bg-yellow-200 border border-yellow-300 dark:border-yellow-900 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100",
		destructive: "bg-destructive text-destructive-foreground",
	};

	// Status indicator classes
	const statusClasses: Record<string, string> = {
		online: "bg-green-500",
		offline: "bg-gray-400",
		away: "bg-yellow-500",
		busy: "bg-red-500",
	};

	return (
		<div className="relative inline-block">
			<Avatar className={cn(sizeClasses[size], className)} {...props}>
				{src && !hasImageError && (
					<AvatarImage
						src={src || "/placeholder.svg"}
						alt={alt}
						onLoad={() => setIsImageLoaded(true)}
						onError={() => setHasImageError(true)}
					/>
				)}

				{(showFallback || !src || hasImageError) && (
					<AvatarFallback
						delayMs={src && !hasImageError ? delayMs : 0}
						className={cn(variantClasses[variant], fallbackClassName)}
					>
						{icon || fallbackText || getInitials(name || alt)}
					</AvatarFallback>
				)}
			</Avatar>

			{status && (
				<span
					className={cn(
						"absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
						statusClasses[status],
						{
							"h-2 w-2": size === "xs" || size === "sm",
							"h-3 w-3": size === "md",
							"h-3.5 w-3.5": size === "lg",
							"h-4 w-4": size === "xl" || size === "2xl",
						},
					)}
				/>
			)}
		</div>
	);
}
