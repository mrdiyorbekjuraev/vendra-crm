"use client";

import EmptyState from "@/components/empty-state";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useTableStore } from "@/stores/main/workers";
import { UserPlus } from "lucide-react";
import Header from "./customs/header";
import Favorites from "./customs/shared/favorites";
import Stats from "./customs/stats";
import View from "./customs/view";

const Body = () => {
	const { getParam } = useRouterQuery();
	const { isFavoritesVisible } = useTableStore();
	const isEmpty = false;

	return (
		<div className="flex-1 h-full mt-11">
			<Header />
			{isFavoritesVisible && <Favorites />}
			{(getParam("view") ?? "table") !== "chart" && <Stats />}
			<View />
			{isEmpty && (
				<EmptyState
					title="Workers"
					description="Start by adding workers to your system. You can manage roles, assign tasks, and monitor progress once your team is set up."
					buttonText="Add Workers"
					instructionLabel="Understanding Workers"
					buttonIcon={<UserPlus size={16} strokeWidth={1.5} />}
				/>
			)}
		</div>
	);
};

export default Body;
