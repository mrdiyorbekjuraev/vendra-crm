import type { Params } from "@/types/shared";
import Account from "@/views/main/settings/profile";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;

	return <Account lang={lang} />;
}
