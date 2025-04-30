"use client";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import CardView from "./card-layout";
import ChartView from "./chart-flow";
import TableView from "./table-layout";

const View = () => {
	const { getParam } = useRouterQuery();

	const renderPage = () => {
		switch (getParam("view") ?? "table") {
			case "table":
				return <TableView />;
			case "card":
				return <CardView />;
			default:
				return <TableView />;
		}
	};
	return renderPage();
};

export default View;
