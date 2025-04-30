"use client";
import type { IPageParams } from "@/types/shared";
import { Remove } from "../modals/remove";
import Body from "./customs/body";
import { Header } from "./customs/header";

interface IRolePage extends IPageParams {}
const Role = ({ lang }: IRolePage) => {
	return (
		<div className="flex flex-col h-[calc(100%_-_12px)] rounded-[16px] border m-2 shadow-lg overflow-hidden">
			<Header />
			<Body />
			<Remove />
		</div>
	);
};

export default Role;
