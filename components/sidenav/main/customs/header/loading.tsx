import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
	return (
		<div className="h-[49px] px-4  flex items-center gap-1 border-b">
			<div>
				<Skeleton className="size-9  bg-zinc-300 dark:bg-zinc-700 rounded-full" />
			</div>
			<Skeleton className="w-[200px] h-7 bg-zinc-300 dark:bg-zinc-700" />
		</div>
	);
};

export default Loading;
