"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useUserStore } from "@/stores/auth";
import { Info } from "lucide-react";

export default function Switcher() {
	const { setUserData, userData } = useUserStore();

	const handleChange = (checked: boolean) => {
		setUserData({
			...userData,
			isWorker: checked,
		});
	};

	return (
		<div className="flex items-center justify-between gap-4">
			<div className="flex items-center gap-1">
				<Label
					htmlFor="worker-switch"
					className="text-xs text-muted-foreground font-medium"
				>
					{userData?.isWorker
						? "I am signing in as a store worker"
						: "I am signing in as an owner"}
				</Label>
				<TooltipWrapper
					classNames={{
						content: "w-[200px]",
					}}
					content="Enable this switch if you are a shop employee (like cashier or store assistant). Leave it off if you're an admin or manager."
				>
					<Info size={16} className="text-zinc-500 cursor-pointer" />
				</TooltipWrapper>
			</div>
			<Switch
				id="worker-switch"
				checked={userData?.isWorker}
				onCheckedChange={handleChange}
			/>
		</div>
	);
}
