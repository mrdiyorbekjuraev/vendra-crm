import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
	return (
		<div>
			<Skeleton className="w-full h-10 bg-zinc-300 dark:bg-zinc-700" />
		</div>
	);
};

export default Loading;
