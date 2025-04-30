import React from "react";
import Content from "./customs/content";
import { Header } from "./customs/header";

const Body = () => {
	return (
		<div className="flex flex-col">
			<Header />
			<Content />
		</div>
	);
};

export default Body;
