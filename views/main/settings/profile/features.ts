import { useFetch } from "@/hooks/useFetch";
import { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";

type TFormValues = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	profilePhotoUrl: string;
};

export type TUserProfileFeatures = {
	handleUpdateUser: MutationResult<TFormValues>;
};

export const useUserProfileFeatures = () => {
	const { functionInvoke } = useFetch();
	const handleUpdateUser = useMutation<void, Error, TFormValues>({
		mutationFn: async (value) => {
			await functionInvoke({
				functionName: "me",
				method: "PATCH",
				body: {
					firstName: value?.firstName,
					lastName: value?.lastName,
					profilePhotoUrl: value?.profilePhotoUrl,
					phoneNumber: value?.phoneNumber,
				},
			});
		},
	});
	return {
		handleUpdateUser,
	};
};
