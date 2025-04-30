import { useFetch } from "@/hooks/useFetch";
import type { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";

export type TStoreCreateForm = {
	name: string;
	type: string;
	slug: string;
	logoUrl: string;
};

type TStoreProfileSetupFeatures = {
	handleStoreCreate: MutationResult<TStoreCreateForm>;
};

export const useStoreProfileSetUpFeatures = (): TStoreProfileSetupFeatures => {
	const { functionInvoke } = useFetch();
	const handleStoreCreate = useMutation<void, Error, TStoreCreateForm>({
		mutationFn: async (value) => {
			await functionInvoke({
				functionName: "stores",
				method: "POST",
				body: value,
			});
		},
	});
	return {
		handleStoreCreate,
	};
};
