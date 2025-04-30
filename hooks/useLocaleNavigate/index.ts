import type { TLocale } from "@/types/shared";
import { usePathname, useRouter } from "next/navigation";

export const useLocaleNavigate = () => {
	const router = useRouter();
	const pathname = usePathname();

	const navigate = (url?: string, locale?: TLocale) => {
		router.push(getRedirectedPath(url, locale));
	};

	const getRedirectedPath = (url?: string, locale?: string) => {
		if (!pathname) return "/";
		if (locale) return `/${locale}/${url}`;

		const currentLocale = pathname.split("/")[1];
		return `/${currentLocale}/${url}`;
	};

	return { navigate };
};
