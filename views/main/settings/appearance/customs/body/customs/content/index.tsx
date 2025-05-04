"use client";
import { LocaleSwitcher } from "@/components/header/customs/locale-switcher";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import dark from "@/public/icons/appearance/dark.svg";
import light from "@/public/icons/appearance/light.svg";

const Content = () => {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="flex flex-col gap-1 mt-10">
			<div className="flex flex-col">
				<Typography variant="h6" size="md" className="font-bold">
					Theme
				</Typography>
				<Typography variant="p-small" type="muted">
					Select a theme to personalize your platform’s appearance
				</Typography>
			</div>
			<div className="grid grid-cols-3 gap-2">
				{/* Light */}
				<Card
					className={cn(
						"max-w-64 max-h-46 overflow-hidden border rounded-xl pt-0 gap-2 cursor-pointer",
						theme === "light" && "border-blue-600",
					)}
					onClick={() => setTheme("light")}
				>
					<CardContent className="p-1 bg-transparent">
						<div className="bg-[#fdfdfd] rounded-lg overflow-hidden border">
							<AspectRatio ratio={8 / 4.3} className="rounded-md">
								<Image
									src={light}
									alt="Card image"
									fill
									blurDataURL=""
									sizes="(max-width: 768px) 100vw, 400px"
								/>
							</AspectRatio>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center p-0 bg-transparent">
						<div className="flex items-center gap-2">
							<Sun className="h-4 w-4" />
							<span className="font-medium text-sm">Light</span>
						</div>
					</CardFooter>
				</Card>
				{/* Dark */}
				<Card
					className={cn(
						"max-w-64 max-h-46 overflow-hidden border rounded-xl pt-0 gap-2 cursor-pointer",
						theme === "dark" && "border-blue-600",
					)}
					onClick={() => setTheme("dark")}
				>
					<CardContent className="p-1 bg-transparent">
						<div className="bg-[#212121] rounded-lg overflow-hidden border">
							<AspectRatio ratio={8 / 4.3} className="rounded-md">
								<Image
									src={dark}
									alt="Card image"
									fill
									blurDataURL=""
									sizes="(max-width: 768px) 100vw, 400px"
								/>
							</AspectRatio>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center p-0 bg-transparent">
						<div className="flex items-center gap-2">
							<Moon className="h-4 w-4" />
							<span className="font-medium text-sm">Dark</span>
						</div>
					</CardFooter>
				</Card>
				{/* System */}
				<Card
					className={cn(
						"max-w-64 max-h-46 overflow-hidden border rounded-xl pt-0 gap-2 cursor-pointer",
						theme === "system" && "border-blue-600",
					)}
					onClick={() => setTheme("system")}
				>
					<CardContent className="p-1 bg-transparent">
						<div className=" rounded-lg overflow-hidden border">
							<AspectRatio ratio={21 / 11.2} className="rounded-md">
								<Image
									src={light}
									alt="Card image"
									fill
									blurDataURL=""
									sizes="(max-width: 768px) 100vw, 400px"
								/>
								<Image
									src={dark}
									alt="Card image"
									fill
									blurDataURL=""
									sizes="(max-width: 768px) 100vw, 400px"
								/>
							</AspectRatio>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center p-0 bg-transparent">
						<div className="flex items-center gap-2">
							<Monitor className="h-4 w-4" />
							<span className="font-medium text-sm">System</span>
						</div>
					</CardFooter>
				</Card>
			</div>
	
		</div>
	);
};

export default Content;
