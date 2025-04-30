import type { TLocale } from "@/types/shared";
import "server-only";

const locales = {
	uz: () => import("@/public/locales/uz.json").then((module) => module.default),
	ru: () => import("@/public/locales/ru.json").then((module) => module.default),
	en: () => import("@/public/locales/en.json").then((module) => module.default),
};

export const getLocale = async (locale: TLocale) => locales[locale]();
