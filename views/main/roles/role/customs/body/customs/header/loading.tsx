"use client";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
	return (
		<div>
			<div className="flex items-center gap-1 h-[52px] px-3 border-b">
				<Skeleton className="size-10 rounded-full" />
				<Skeleton className="w-[200px] h-7" />

				<div className="ml-auto flex items-center gap-2">
					<div className="text-sm text-muted-foreground flex items-center gap-2">
						<span> Last Updated: </span>
						<span className="font-medium text-primary">
							<Skeleton className="w-[100px] h-4" />
						</span>
					</div>
					<Skeleton className="w-[100px] h-7" />
					<Skeleton className="w-[35px] h-7" />
				</div>
			</div>
			<div className="flex items-center py-3 bg-muted/40 border-b px-3 gap-2">
				<Skeleton className="w-[100px] h-5" />
				<Separator orientation="vertical" />
				<Skeleton className="w-[100px] h-5" />
				<Skeleton className="w-[100px] h-5" />
			</div>
		</div>
	);
};
