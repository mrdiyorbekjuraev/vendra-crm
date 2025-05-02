import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRolesSummaryCache } from "@/services/main/roles";
import { HelpCircle } from "lucide-react";
import { type ReactNode, memo } from "react";
import CountUp from "react-countup";

interface StatsCardProps {
  id?: string;
  title: string;
  colorClass: string;
  amount: number;
  icon: ReactNode;
  tooltipContent?: string;
  classNames?: {
    wrapper?: string;
    content?: string;
    footer?: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = memo((props) => {
  const { id, classNames, title, amount, colorClass, icon, tooltipContent } =
    props;
  const {
    stats: { data: status },
  } = useRolesSummaryCache();
  return (
    <Card
      className={cn(
        "p-4 gap-1 shadow-xs  transition-all duration-200",
        classNames?.wrapper
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-md font-medium">{title}</h3>
        </div>
        <TooltipWrapper
          content={tooltipContent}
          classNames={{
            content: "w-[210px]  text-wrap",
          }}
        >
          <Button className="" size="icon" variant="ghost">
            <HelpCircle />
          </Button>
        </TooltipWrapper>
      </div>

      <CardContent
        className={cn(
          "text-6xl  pl-0 pr-0 pb-0 min-h-[60px] flex justify-between mt-auto",
          classNames?.wrapper
        )}
      >
        <span className={cn(colorClass)}>
          <CountUp start={0} end={amount ?? 0} />
        </span>
        {id === "1" && (
          <span className="text-sm text-muted-foreground pt-10">Total</span>
        )}
      </CardContent>
    </Card>
  );
});

export default StatsCard;
