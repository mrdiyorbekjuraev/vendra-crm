import { useFetch } from "@/hooks/useFetch";
import { useBranchesCache } from "@/services/main/base";
import { useBranchesModal } from "@/stores/generic/branch";
import { useStoresModal } from "@/stores/generic/stores";
import { useCurrentStore } from "@/stores/main/current-store";
import { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";

type TFormValues = {
	name: string;
	type: string;
	slug: string;
	logoUrl: string;
};

export type TBranchFeatures = {
	handleCreateStore: MutationResult<TFormValues>;
};

export const useStoresFeatures = (): TBranchFeatures => {
	const { setModal } = useStoresModal();
	const { functionInvoke } = useFetch();
	const {
		branches: { refetch },
	} = useBranchesCache();
	const handleCreateStore = useMutation<void, Error, TFormValues>({
		mutationFn: async (value) => {
			await functionInvoke({
				functionName: `stores`,
				method: "POST",
				body: value,
			});
			refetch();
			setModal({ createStore: false });
		},
	});
	return {
		handleCreateStore,
	};
};
