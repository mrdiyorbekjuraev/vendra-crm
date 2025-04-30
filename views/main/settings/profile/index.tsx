"use client";
import Header from "@/components/header";
import type { IPageParams } from "@/types/shared";
import React from "react";
import Body from "./customs/body";

interface IAccount extends IPageParams {}
const Account = ({ lang }: IAccount) => {
	return (
		<div className="flex flex-col">
			<Header title="Account" />
			<Body />
		</div>
	);
};

export default Account;
