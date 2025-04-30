import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { mockWorkers } from "@/mock/workers/index.data";
import React from "react";
import WorkerCard from "./customs/card";

const CardView = () => {
	return (
		<div>
			<Separator />
			<ScrollArea className="overflow-y-auto h-[calc(100vh-240px)]">
				<div className="grid grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] gap-3 p-4">
					{mockWorkers.map((card) => (
						<WorkerCard key={card?.title} {...card} />
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default CardView;
