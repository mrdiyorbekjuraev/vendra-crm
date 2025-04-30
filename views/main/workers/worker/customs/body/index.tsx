import React from "react";
import WorkerDetailPage from "./customs/contents";
import { Header } from "./customs/header";

const Body = () => {
	return (
		<div className="flex flex-col">
			<Header />
			<WorkerDetailPage />
		</div>
	);
};

export default Body;
