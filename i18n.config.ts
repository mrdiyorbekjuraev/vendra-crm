import { getRequestConfig } from "next-intl/server";

export const i18n = {
	defaultLocale: "uz",
	locales: ["uz", "ru", "en"],
} as const;

export default getRequestConfig(async () => {
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	return {
		locale: "uz",
		timeZone: userTimeZone || "Asia/Tashkent",
	};
});
