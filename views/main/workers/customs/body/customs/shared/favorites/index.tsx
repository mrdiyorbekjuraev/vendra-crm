import { mockWorkers } from "@/mock/workers/index.data";
import React from "react";
import WorkerCard from "./customs/card";

const Favorites = () => {
	return (
		<div className="h-[229px] w-full bg-sidebar">
			<div className="h-7 w-full flex items-center px-4">
				<span className="text-xs text-muted-foreground">Favorites</span>
			</div>
			<div className="border border-dashed mx-2 rounded-md">
				<div className="px-1 py-1 flex items-center gap-4 overflow-x-auto">
					{mockWorkers.map((card) => (
						<WorkerCard key={card?.title} {...card} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Favorites;
