"use client";
import dynamic from "next/dynamic";
import Header from "./customs/header";
import Stats from "./customs/stats";
import RolesTable from "./customs/table-layout";

const Body = () => {
	return (
		<div className="flex-1 h-full mt-11">
			<Header />
			<Stats />
			<RolesTable />
		</div>
	);
};

export default Body;
