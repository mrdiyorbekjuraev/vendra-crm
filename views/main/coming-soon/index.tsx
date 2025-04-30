"use client";
import EmptyState from "@/components/empty-state";
import Header from "@/components/header";
import type { IPageParams } from "@/types/shared";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface IComingSoonPage extends IPageParams {}

const ComingSoon = ({ lang }: IComingSoonPage) => {
	const t = useTranslations("header");
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Header />
			<EmptyState
				title="Workers"
				description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, voluptate?"
				buttonText="Add Workers"
				instructionLabel="Understanding Workers"
				buttonIcon={<PlusCircle size={16} strokeWidth={1.5} />}
			/>
		</div>
	);
};

export default ComingSoon;
