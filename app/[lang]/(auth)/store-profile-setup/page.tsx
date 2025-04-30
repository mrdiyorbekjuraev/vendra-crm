import StoreProfileSetup from "@/views/auth/sign-up/store-profile-setup";
import NextAuth from "@auth-kit/next/NextAuth";

export default async function Page() {
	return (
		// <NextAuth fallbackPath={"/sign-in"}>
		<StoreProfileSetup />
		// </NextAuth>
	);
}
