"use client";
import Header from "@/components/header";
import type { IPageParams } from "@/types/shared";
import Body from "./customs/body";
import { CreateWorker } from "./modals/create";

interface IWorkersPage extends IPageParams {}

const Workers = ({ lang }: IWorkersPage) => {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Header title="Workers" />
			<Body />

			<CreateWorker />
		</div>
	);
};

export default Workers;
