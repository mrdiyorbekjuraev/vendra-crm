"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { useEffect } from "react";

// Panel variants using cva for more customization options
const panelVariants = cva(
	"absolute top-0 h-full bg-sidebar z-50 shadow-lg transition-all overflow-hidden",
	{
		variants: {
			position: {
				left: "left-0",
				right: "right-0",
				top: "top-0 left-0 right-0 h-auto w-full",
				bottom: "bottom-0 left-0 right-0 h-auto w-full",
			},
			size: {
				xs: "w-64",
				sm: "w-80",
				md: "w-96",
				lg: "w-1/3",
				xl: "w-1/2",
				full: "w-full",
			},
			fullHeight: {
				true: "h-full",
				false: "",
			},
			rounded: {
				none: "rounded-none",
				sm: "rounded-md",
				md: "rounded-lg",
				lg: "rounded-xl",
			},
			withOverlay: {
				true: "",
				false: "",
			},
		},
		defaultVariants: {
			position: "right",
			size: "sm",
			fullHeight: true,
			rounded: "none",
			withOverlay: true,
		},
	},
);

// Animation variants based on position
const getTransformStyles = (
	position: "left" | "right" | "top" | "bottom",
	isOpen: boolean,
) => {
	const transforms = {
		left: isOpen ? "translate-x-0" : "-translate-x-full",
		right: isOpen ? "translate-x-0" : "translate-x-[120%]",
		top: isOpen ? "translate-y-0" : "-translate-y-full",
		bottom: isOpen ? "translate-y-0" : "translate-y-full",
	};
	return transforms[position];
};

interface SidePanelProps {
	readonly isOpen?: boolean;
	readonly onClose?: () => void;
	readonly children: React.ReactNode;
	readonly position?: "left" | "right" | "top" | "bottom";
	readonly size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	readonly className?: string;
	readonly closeButtonPosition?: "top-left" | "top-right";
	readonly showCloseButton?: boolean;
	readonly closeOnEsc?: boolean;
	readonly closeOnOutsideClick?: boolean;
	readonly withOverlay?: boolean;
	readonly overlayClassName?: string;
	readonly contentClassName?: string;
	readonly fullHeight?: boolean;
	readonly rounded?: "none" | "sm" | "md" | "lg";
	readonly duration?: "fast" | "normal" | "slow";
	readonly closeIcon?: React.ReactNode;
	readonly preventScroll?: boolean;
	readonly style?: React.CSSProperties;
}

export const SidePanel = ({
	isOpen = false,
	onClose,
	children,
	position = "right",
	size = "sm",
	className,
	closeButtonPosition = "top-right",
	showCloseButton = true,
	closeOnEsc = true,
	closeOnOutsideClick = true,
	withOverlay = true,
	overlayClassName,
	contentClassName,
	fullHeight = true,
	rounded = "none",
	duration = "normal",
	closeIcon,
	preventScroll = true,
	style,
}: SidePanelProps) => {
	// Handle ESC key press
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (closeOnEsc && isOpen && event.key === "Escape") {
				onClose?.();
			}
		};

		// Prevent body scroll when panel is open
		if (preventScroll && isOpen) {
			document.body.style.overflow = "hidden";
		}

		document.addEventListener("keydown", handleEscKey);
		return () => {
			document.removeEventListener("keydown", handleEscKey);
			if (preventScroll) {
				document.body.style.overflow = "";
			}
		};
	}, [closeOnEsc, isOpen, onClose, preventScroll]);

	// Determine animation duration
	const getDurationClass = () => {
		switch (duration) {
			case "fast":
				return "duration-150";
			case "slow":
				return "duration-500";
			default:
				return "duration-300";
		}
	};

	// Handle overlay click
	const handleOverlayClick = (e: React.MouseEvent) => {
		if (closeOnOutsideClick && e.target === e.currentTarget) {
			onClose?.();
		}
	};

	// Position the close button
	const getCloseButtonPositionClass = () => {
		return closeButtonPosition === "top-left"
			? "top-4 left-4"
			: "top-4 right-4";
	};

	return (
		<>
			{/* Overlay */}
			{withOverlay && isOpen && (
				<div
					className={cn(
						"fixed inset-0 bg-black/40 z-40 transition-opacity",
						isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
						getDurationClass(),
						overlayClassName,
					)}
					role="button"
					onClick={handleOverlayClick}
				/>
			)}

			{/* Panel */}
			<div
				className={cn(
					panelVariants({ position, size, fullHeight, rounded, withOverlay }),
					getTransformStyles(position, isOpen),
					getDurationClass(),
					"ease-in-out",
					className,
				)}
				style={style}
			>
				{/* Close Button */}
				{showCloseButton && (
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"absolute size-8 rounded-md z-10",
							getCloseButtonPositionClass(),
						)}
						onClick={onClose}
						withAnimation={false}
					>
						{closeIcon || <X className="h-4 w-4" />}
					</Button>
				)}

				{/* Panel Content */}
				<div className={cn("h-full flex flex-col", contentClassName)}>
					{children}
				</div>
			</div>
		</>
	);
};

// PanelHeader Component with more options
interface PanelHeaderProps {
	children: React.ReactNode;
	className?: string;
	sticky?: boolean;
	noBorder?: boolean;
	padding?: "none" | "sm" | "md" | "lg";
}

export function PanelHeader({
	children,
	className,
	sticky = false,
	noBorder = false,
	padding = "md",
}: PanelHeaderProps) {
	const getPaddingClass = () => {
		switch (padding) {
			case "none":
				return "p-0";
			case "sm":
				return "p-2";
			case "lg":
				return "p-6";
			default:
				return "p-4";
		}
	};

	return (
		<div
			className={cn(
				getPaddingClass(),
				!noBorder && "border-b border-border",
				sticky && "sticky top-0 bg-sidebar z-10",
				className,
			)}
		>
			{children}
		</div>
	);
}

// PanelBody Component with more options
interface PanelBodyProps {
	children: React.ReactNode;
	className?: string;
	padding?: "none" | "sm" | "md" | "lg";
	scrollable?: boolean;
}

export function PanelBody({
	children,
	className,
	padding = "md",
	scrollable = true,
}: PanelBodyProps) {
	const getPaddingClass = () => {
		switch (padding) {
			case "none":
				return "p-0";
			case "sm":
				return "p-2";
			case "lg":
				return "p-6";
			default:
				return "p-4";
		}
	};

	return (
		<div
			className={cn(
				getPaddingClass(),
				"flex-1",
				scrollable && "overflow-y-auto",
				className,
			)}
		>
			{children}
		</div>
	);
}

// PanelFooter Component with more options
interface PanelFooterProps {
	children: React.ReactNode;
	className?: string;
	sticky?: boolean;
	noBorder?: boolean;
	padding?: "none" | "sm" | "md" | "lg";
}

export function PanelFooter({
	children,
	className,
	sticky = false,
	noBorder = false,
	padding = "md",
}: PanelFooterProps) {
	const getPaddingClass = () => {
		switch (padding) {
			case "none":
				return "p-0";
			case "sm":
				return "p-2";
			case "lg":
				return "p-6";
			default:
				return "p-4";
		}
	};

	return (
		<div
			className={cn(
				getPaddingClass(),
				!noBorder && "border-t border-border",
				sticky && "sticky bottom-0 bg-sidebar z-10",
				className,
			)}
		>
			{children}
		</div>
	);
}

// New component for dividing content in panels
interface PanelDividerProps {
	className?: string;
}

export function PanelDivider({ className }: PanelDividerProps) {
	return <div className={cn("h-px w-full bg-border my-4", className)} />;
}
