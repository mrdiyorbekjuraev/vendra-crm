"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { SidePanel } from "../ui/side-panel";
import { Typography } from "../ui/typography";
import Footer from "./customs/footer";
import { useHelpSidePanelStore } from "./store";

import instruction_dark from "@/public/icons/empty-state/instruction-dark.svg";
import instruction_light from "@/public/icons/empty-state/instruction-light.svg";
import { useTheme } from "next-themes";

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

const HelpSidePanel = () => {
	const { resolvedTheme } = useTheme();
	const isDarkTheme = resolvedTheme === "dark";
	const { isOpen, closeModal } = useHelpSidePanelStore();
	const instructionImage = isDarkTheme ? instruction_dark : instruction_light;
	return (
		<SidePanel
			isOpen={isOpen}
			onClose={closeModal}
			className={cn(
				"fixed m-4 w-[360px] h-[calc(100vh-30px)] rounded-lg shadow-2xl bg-white dark:bg-sidebar",
			)}
			overlayClassName="bg-transparent"
			style={{
				boxShadow:
					"rgba(24, 39, 75, 0.12) 0px 8px 28px -6px, rgba(24, 39, 75, 0.14) 0px 18px 88px -4px;",
			}}
		>
			<Typography variant="h1" size="md" className="font-medium p-4">
				Help
			</Typography>
			<div className="px-4">
				<div className="relative">
					<Input
						className={cn("pr-8 pl-9")}
						type="text"
						placeholder={"Search help"}
					/>
					<Search
						size={25}
						strokeWidth={1.5}
						className="absolute left-2 top-1.5 text-zinc-500 cursor-pointer hover:bg-muted-foreground/10 rounded-sm p-1"
					/>
				</div>
				{/* Content */}
				<div className="content mt-4">
					{/* Learn more section with animation */}
					<motion.div variants={itemVariants}>
						<div className="w-full  relative flex flex-col items-center">
							<div className="flex gap-3">
								<motion.div
									whileHover="hover"
									initial="rest"
									variants={cardVariants}
									className="flex items-center gap-2 h-[72px] w-[337px] cursor-pointer border rounded-2xl dark:hover:bg-muted/50 hover:bg-gray-50 transition-colors px-2 py-2"
								>
									<motion.div
										whileHover={{ scale: 1 }}
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
											className={cn("font-medium text-primary")}
										>
											Test
										</Typography>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</SidePanel>
	);
};

export default HelpSidePanel;
