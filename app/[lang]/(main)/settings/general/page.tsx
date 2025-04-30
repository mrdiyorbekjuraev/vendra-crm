import type { Params } from "@/types/shared";
import General from "@/views/main/settings/general";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <General lang={lang} />;
}
