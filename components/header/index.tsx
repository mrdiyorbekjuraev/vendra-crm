"use client";
import { PanelLeft, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "../ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { HeaderActions } from "./customs/actions";
import { LocaleSwitcher } from "./customs/locale-switcher";
import ThemeToggle from "./customs/theme-toggle";

interface HeaderProps {
	// Core functionality
	readonly showSidebarToggle?: boolean;
	readonly showThemeToggle?: boolean;
	readonly showHeaderActions?: boolean;

	// Styling
	readonly className?: string;
	readonly height?: string;
	readonly bgColor?: string;

	// Custom elements
	readonly logo?: React.ReactNode;
	readonly title?: string;
	readonly leftContent?: React.ReactNode;
	readonly rightContent?: React.ReactNode;

	// Event handlers
}

export default function Header({
	// Default values for props
	showSidebarToggle = true,
	showThemeToggle = true,
	showHeaderActions = true,
	className = "",
	height = "h-[49px]",
	bgColor = "bg-background",
	logo,
	title,
	leftContent,
	rightContent,
}: HeaderProps) {
	const { open, setOpen } = useSidebar();

	// Combine default and custom styling
	const headerClasses = `
    flex ${height} shrink-0 items-center justify-between gap-2 
    transition-[width,height,left] ease-linear 
    group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 
    ${bgColor} border-b 
	fixed right-0 left-0 z-10
	${open && "left-64"}
    ${className}
    bg-white-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-md-opacity-10

  `;
	const [isHovered, setIsHovered] = useState(false);
	return (
		<header className={headerClasses}>
			<div className="flex items-center gap-2 px-4 ">
				{/* Left section */}

				{showSidebarToggle && !open && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger
								onClick={() => setOpen(true)}
								className="cursor-pointer"
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								{isHovered ? (
									<PanelLeftOpen className="h-4 w-4" />
								) : (
									<PanelLeft className="h-4 w-4" />
								)}
							</TooltipTrigger>
							<TooltipContent
								className="flex w-full flex-col gap-1 bg-[#1B1D21] border border-solid border-zinc-600 mt-3"
								side="bottom"
							>
								<div className="flex items-center gap-2">
									<p className="text-white text-sm font-medium">
										Expand Sidebar
									</p>
									<div className="flex items-center gap-2">
										<kbd className="pointer-events-none hidden h-4 select-none items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600  px-0.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
											<span className="text-xs text-zinc-400">CTRL</span>
										</kbd>
										<kbd className="pointer-events-none hidden size-4 select-none justify-center items-center gap-1 rounded border dark:border-zinc-500 border-zinc-600px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
											<span className="text-xs text-zinc-400">.</span>
										</kbd>
									</div>
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}

				{logo && <div className="flex items-center">{logo}</div>}

				{title && <h1 className="text-sm font-medium">{title}</h1>}

				{leftContent && <div>{leftContent}</div>}
			</div>

			<div className="flex items-center gap-2 px-4">
				<LocaleSwitcher />
				{/* Right section */}
				{rightContent || <>{showHeaderActions && <HeaderActions />}</>}
			</div>
		</header>
	);
}
