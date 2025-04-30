"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const SUPPORTED_LANGUAGES = ["uz", "ru", "en"];

type Lang = "uz" | "ru" | "en";

export const useLanguage = (): Lang => {
	const pathname = usePathname();

	const lang = useMemo(() => {
		const segments = pathname.split("/").filter(Boolean);
		const lang = segments[0];

		if (SUPPORTED_LANGUAGES.includes(lang)) {
			return lang as Lang;
		}

		return "uz";
	}, [pathname]);

	return lang;
};
