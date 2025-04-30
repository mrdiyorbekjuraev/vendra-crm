import type { IPageParams } from "@/types/shared";
import Body from "./customs/body";
import { Header } from "./customs/header";
interface IWorkerPage extends IPageParams {}
const Worker = ({ lang }: IWorkerPage) => {
	return (
		<div className="flex flex-col h-[calc(100%_-_12px)] rounded-[16px] border m-2 shadow-lg overflow-hidden">
			<Header />
			<Body />
		</div>
	);
};

export default Worker;
