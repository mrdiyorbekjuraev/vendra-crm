import { useFetch } from "@/hooks/useFetch";
import httpClient from "@/lib/axios-client";
import { useUserStore } from "@/stores/auth";
import { TData } from "@/types/auth/sign-in";
import { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "sonner";

type TWorkerFormFeatures = {
	handleSubmit: MutationResult<any>;
	isPending: boolean;
};

export const useWorkerFormFeatures = (): TWorkerFormFeatures => {
	const { setUserData, userData } = useUserStore();
	const [isPending, setIsPending] = useState<boolean>(false);
	const { push } = useRouter();
	const signIn = useSignIn();

	const handleSubmit = useMutation<void, Error, any>({
		mutationFn: async (value) => {
			try {
				await toast.promise(
					(async () => {
						setIsPending(true);
						const { data, success } = await httpClient.post<any>(
							"auth/worker-login",
							value,
						);

						setUserData({
							phone: value.phoneNumber,
							isPhoneVerified: true,
						});

						if (!success) {
							setIsPending(false);
							throw new Error("Backend responded with failure.");
						}

						if (success) {
							signIn({
								auth: {
									token: String(data?.tokens?.accessToken),
									type: "Bearer",
								},
								refresh: String(data?.tokens?.refreshToken),
								userState: {
									phoneNumber: value?.phoneNumber,
									role: "worker",
								},
							});
							push("/");
							setIsPending(false);
						}
						setIsPending(false);
					})(),
					{
						loading: "Loading...",
						success: "Logged in the system",
						error: "Failed to login in",
					},
				);
			} catch (err: any) {
				setIsPending(false);
				toast.error(
					err?.message || "Unexpected error while checking phone number.",
				);
			}
		},
		onError: (error) => {
			setIsPending(false);
		},
	});

	return {
		handleSubmit,
		isPending,
	};
};
