"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { type ReactNode, memo } from "react";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

import empty_state_dark from "@/public/icons/empty-state/dark.svg";
import instruction_dark from "@/public/icons/empty-state/instruction-dark.svg";
import instruction_light from "@/public/icons/empty-state/instruction-light.svg";
// Image imports
import empty_state_light from "@/public/icons/empty-state/light.svg";

type EmptyStateClassNames = {
	wrapper?: string;
	title?: string;
	description?: string;
	button?: string;
	instructionLabel?: string;
};

interface EmptyStateProps {
	title: string;
	description: string;
	buttonIcon?: ReactNode;
	buttonText: string;
	instructionLabel: string;
	classNames?: EmptyStateClassNames;
	onButtonClick?: () => void;
}

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

const buttonVariants = {
	rest: { scale: 0.4 },
	hover: {
		scale: 1.02,
		transition: { duration: 0.2 },
	},
	tap: {
		scale: 0.95,
		transition: { duration: 0.1 },
	},
};

const cardVariants = {
	rest: {
		backgroundColor: "rgba(255, 255, 255, 0)",
		transition: { duration: 0.2 },
	},
	hover: {
		backgroundColor: "rgba(var(--card-hover-rgb), 0.1)",
		y: -2,
		transition: { duration: 0.3 },
	},
};

const EmptyState = memo(function EmptyState({
	title,
	description,
	buttonIcon,
	buttonText,
	instructionLabel,
	classNames,
	onButtonClick,
}: EmptyStateProps) {
	const { resolvedTheme } = useTheme();
	const isDarkTheme = resolvedTheme === "dark";

	// Choose the appropriate images based on theme
	const emptyStateImage = isDarkTheme ? empty_state_dark : empty_state_light;
	const instructionImage = isDarkTheme ? instruction_dark : instruction_light;

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className={cn(
				"flex flex-1 items-center flex-col justify-center w-full h-full",
				classNames?.wrapper,
			)}
			suppressHydrationWarning
		>
			{/* Main content area */}
			<div className="flex flex-1 flex-col items-center justify-center w-full">
				<div className="flex flex-col items-center gap-2">
					{/* Empty state illustration with animation */}
					<motion.div
						variants={itemVariants}
						className="flex items-center justify-center select-none"
					>
						<motion.div
							animate={{
								y: [0, -10, 0],
								scale: [1, 1.02, 1],
							}}
							transition={{
								repeatType: "reverse",
								duration: 3,
								ease: "easeInOut",
							}}
						>
							<Image
								src={emptyStateImage}
								alt="Empty state illustration"
								width={300}
								height={300}
								priority
							/>
						</motion.div>
					</motion.div>

					{/* Text content with animation */}
					<div className="flex flex-col items-center justify-center">
						<motion.div variants={itemVariants}>
							<Typography
								variant="h2"
								className={cn(
									"text-[20px] font-semibold text-primary mb-1",
									classNames?.title,
								)}
							>
								{title}
							</Typography>
						</motion.div>

						<motion.div variants={itemVariants}>
							<Typography
								variant="p"
								className={cn(
									"text-[14px] text-gray-500 mb-4 text-center max-w-md",
									classNames?.description,
								)}
							>
								{description}
							</Typography>
						</motion.div>
					</div>

					{/* Action button with animation */}
					<motion.div variants={itemVariants} whileHover="hover" whileTap="tap">
						<Button
							size="sm"
							className={cn(classNames?.button)}
							onClick={onButtonClick}
						>
							{buttonIcon && (
								<motion.div
									initial={{ rotate: 0 }}
									transition={{ duration: 0.3 }}
									className="mr-1"
								>
									{buttonIcon}
								</motion.div>
							)}
							<span className="font-medium">{buttonText}</span>
						</Button>
					</motion.div>
				</div>
			</div>

			{/* Learn more section with animation */}
			<motion.div variants={itemVariants} className="pb-20">
				<div className="w-full max-w-[626px] relative flex flex-col items-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="text-xs text-[#9Fa1a7] mb-2"
					>
						Learn more
					</motion.div>
					<div className="flex gap-3">
						<motion.div
							whileHover="hover"
							initial="rest"
							variants={cardVariants}
							className="flex items-center gap-2 h-[72px] w-[307px] cursor-pointer border rounded-2xl dark:hover:bg-muted/50 hover:bg-gray-50 transition-colors px-2 py-2"
						>
							<motion.div
								whileHover={{ scale: 1.1 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
								className="flex-shrink-0 w-14 h-14 rounded-[13px] border flex items-center justify-center overflow-hidden"
							>
								<Image
									src={instructionImage}
									alt="Instruction"
									width={56}
									height={56}
									className="object-cover"
								/>
							</motion.div>
							<div className="text-sm ml-2">
								<Typography
									variant="p"
									className={cn(
										"font-medium text-primary",
										classNames?.instructionLabel,
									)}
								>
									{instructionLabel}
								</Typography>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
});

export default EmptyState;
