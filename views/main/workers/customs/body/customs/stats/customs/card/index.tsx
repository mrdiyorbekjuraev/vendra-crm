import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTableStore } from "@/stores/main/workers";
import type { ReactNode } from "react";
import CountUp from "react-countup";

interface StatsCardProps {
	id?: string;
	title: string;
	colorClass: string;
	amount: number;
	icon: ReactNode;
	classNames?: {
		wrapper?: string;
		content?: string;
		footer?: string;
	};
}

const StatsCard: React.FC<StatsCardProps> = (props) => {
	const { isFavoritesVisible } = useTableStore();
	const { classNames, title, amount, colorClass, icon } = props;

	if (isFavoritesVisible) {
		return (
			<Card
				className={cn(
					"p-2 gap-1 shadow-xs  transition-all duration-200",
					classNames?.wrapper,
				)}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						{icon}
						<h3 className="text-md font-medium">{title}</h3>
					</div>
					<span className={cn("text-2xl font-semibold", colorClass)}>
						<CountUp start={0} end={amount ?? 0} />
					</span>
				</div>
			</Card>
		);
	}
	return (
		<Card
			className={cn(
				"p-4 gap-1 shadow-xs  transition-all duration-200",
				classNames?.wrapper,
			)}
		>
			<div className="flex items-center gap-2">
				{icon}
				<h3 className="text-md font-medium">{title}</h3>
			</div>

			<CardContent
				className={cn(
					"text-6xl  pl-0 pr-0 pb-0 min-h-[60px] flex justify-between mt-auto",
					classNames?.wrapper,
				)}
			>
				<span className={cn(colorClass)}>
					<CountUp start={0} end={amount ?? 0} />
				</span>
				<span className="text-sm text-muted-foreground pt-10">Total: 1000</span>
			</CardContent>
		</Card>
	);
};

export default StatsCard;
