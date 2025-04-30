"use client";
import Header from "@/components/header";
import type { IPageParams } from "@/types/shared";
import React from "react";
import Body from "./customs/body";

interface IGeneral extends IPageParams {}
const General = ({ lang }: IGeneral) => {
	return (
		<div className="flex flex-col">
			<Header title="General" />
			<Body />
		</div>
	);
};

export default General;
