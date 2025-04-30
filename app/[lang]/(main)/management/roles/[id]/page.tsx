import type { Params } from "@/types/shared";
import Role from "@/views/main/roles/role";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <Role lang={lang} />;
}
