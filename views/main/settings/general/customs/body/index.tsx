import { ScrollArea } from "@/components/ui/scroll-area";
import Content from "./customs/content";
import Header from "./customs/header";

const Body = () => {
	return (
		<div className="xl:max-w-1/2 md:max-w-lg m-auto  w-full flex-1 py-[4rem] mt-10">
			<Header />
			<Content />
		</div>
	);
};

export default Body;
