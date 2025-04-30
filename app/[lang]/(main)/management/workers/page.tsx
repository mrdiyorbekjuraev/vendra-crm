import type { Params } from "@/types/shared";
import Workers from "@/views/main/workers";
import { ReactFlowProvider } from "@xyflow/react";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <Workers lang={lang} />;
}
