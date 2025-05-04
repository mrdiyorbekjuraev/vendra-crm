"use client";
import Content from "./customs/content";
import Header from "./customs/header";

const Body = () => {
	return (
		<div className="xl:max-w-1/2 md:max-w-xl m-auto  w-full h-full flex-1 py-[4rem]">
			<Header />
			<Content />
		</div>
	);
};

export default Body;
