"use client";
import Header from "@/components/header";
import type { IPageParams } from "@/types/shared";
import React from "react";
import Body from "./customs/body";
interface IAppearance extends IPageParams {}
const Appearance = ({ lang }: IAppearance) => {
	return (
		<div className="flex flex-col">
			<Header title="Appearance" />
			<Body />
		</div>
	);
};

export default Appearance;
