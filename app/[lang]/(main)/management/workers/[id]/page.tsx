import type { Params } from "@/types/shared";
import Worker from "@/views/main/workers/worker";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <Worker lang={lang} />;
}
