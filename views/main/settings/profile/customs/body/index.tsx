import { Separator } from "@/components/ui/separator";
import React from "react";
import Content from "./customs/content";
import Header from "./customs/header";

const Body = () => {
	return (
		<div className="xl:max-w-1/2 md:max-w-lg m-auto  w-full h-full flex-1 py-[4rem] mt-10">
			<Header />
			<Separator orientation="horizontal" className="my-4" />
			<Content />
		</div>
	);
};

export default Body;
