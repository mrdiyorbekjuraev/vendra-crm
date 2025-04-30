import type { Params } from "@/types/shared";
import Appearance from "@/views/main/settings/appearance";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <Appearance lang={lang} />;
}
