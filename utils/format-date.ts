import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/uz";
import "dayjs/locale/en";

type Lang = "uz" | "ru" | "en";

export function formatDate(date: string | Date, lang: Lang = "en"): string {
	return dayjs(date).locale(lang).format("DD MMMM YYYY, dddd");
}
