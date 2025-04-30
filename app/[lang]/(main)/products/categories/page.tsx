import type { Params } from "@/types/shared";
import ComingSoon from "@/views/main/coming-soon";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <ComingSoon lang={lang} />;
}
