import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRolesSummaryCache } from "@/services/main/roles";
import { type ReactNode, memo } from "react";
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

const StatsCard: React.FC<StatsCardProps> = memo((props) => {
	const { classNames, title, amount, colorClass, icon } = props;
	const {
		stats: { data: status },
	} = useRolesSummaryCache();
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
				<span className="text-sm text-muted-foreground pt-10">
					Total: {status?.data?.totalCount ?? 0}
				</span>
			</CardContent>
		</Card>
	);
});

export default StatsCard;
