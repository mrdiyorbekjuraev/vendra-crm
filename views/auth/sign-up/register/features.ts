import httpClient from "@/lib/axios-client";
import { useUserStore } from "@/stores/auth";
import type { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type TPhoneRegisterForm = {
	phoneNumber: string;
};
type TCodeVerifyForm = {
	code: string;
};

type TRegisterFeatures = {
	handlePhoneRegister: MutationResult<TPhoneRegisterForm>;
	verifyCode: MutationResult<TCodeVerifyForm>;
};

export const useRegisterFeatures = (): TRegisterFeatures => {
	const { push } = useRouter();
	const { setUserData, userData } = useUserStore();

	const handlePhoneRegister = useMutation<void, Error, TPhoneRegisterForm>({
		mutationFn: async (value) => {
			await httpClient.post("auth/send-code", value);
			setUserData({
				phone: value?.phoneNumber.trim(),
				isPhoneVerified: true,
			});
		},
	});

	const verifyCode = useMutation<void, Error, TCodeVerifyForm>({
		mutationFn: async (value) => {
			await httpClient.post("auth/verify-code", {
				phoneNumber: userData?.phone,
				code: value?.code,
			});
			setUserData({
				isPhoneVerified: false,
			});
			push("/user-profile-setup");
		},
	});

	return {
		handlePhoneRegister,
		verifyCode,
	};
};
