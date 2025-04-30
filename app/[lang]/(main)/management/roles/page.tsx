import type { Params } from "@/types/shared";
import Roles from "@/views/main/roles";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <Roles lang={lang} />;
}
