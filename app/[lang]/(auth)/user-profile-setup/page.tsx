import type { Params } from "@/types/shared";
import UserProfileSetup from "@/views/auth/sign-up/user-profile-setup";

export default async function Page({ params }: { params: Params }) {
	const param = await params;
	const lang = param.lang;
	console.log(lang);

	return <UserProfileSetup />;
}
