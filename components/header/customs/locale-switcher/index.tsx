"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLocaleNavigate } from "@/hooks/useLocaleNavigate";
import { languages } from "@/mock/language.data";
import type { IOption, TLocale } from "@/types/shared";
import { usePathname } from "next/navigation";
import type { FC } from "react";

interface ILocaleSwitcher {
	className?: string;
}

export const LocaleSwitcher: FC<ILocaleSwitcher> = ({ className }) => {
	const pathname = usePathname();
	const { navigate } = useLocaleNavigate();
	const splitted = pathname.split("/");
	const lang = splitted[1];
	const url = splitted.slice(2).join("/");

	const handleChange = (value: string) => {
		navigate(url, value as TLocale);
	};

	return (
		<Select onValueChange={handleChange} defaultValue={lang}>
			<SelectTrigger
				className={`w-[150px] ${className}`}
				aria-label="Select Language"
			>
				<SelectValue placeholder="Select Language" />
			</SelectTrigger>
			<SelectContent>
				{languages.map((item) => (
					<SelectItem key={item.value} value={item.value} className="text-sm">
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
