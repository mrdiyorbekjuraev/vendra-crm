import httpClient from "@/lib/axios-client";
import type { TData } from "@/types/auth/sign-in";
import type { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export type TUserRegisterForm = {
	phoneNumber: string;
	firstName: string;
	lastName: string;
	profilePhotoUrl: string;
};

type TUserProfileSetupFeatures = {
	handleUserRegister: MutationResult<TUserRegisterForm>;
};

export const useUserProfileSetUpFeatures = (): TUserProfileSetupFeatures => {
	const { push } = useRouter();
	const signIn = useSignIn();

	const handleUserRegister = useMutation<void, Error, TUserRegisterForm>({
		mutationFn: async (value) => {
			const { data } = await httpClient.post<TData>("auth/register", value);
			signIn({
				auth: {
					token: String(data?.tokens?.accessToken),
					type: "Bearer",
				},
				refresh: String(data?.tokens?.accessToken),
				userState: value,
			});
			push("/store-profile-setup");
		},
	});
	return {
		handleUserRegister,
	};
};
