import { useFetch } from "@/hooks/useFetch";
import { useBranchesCache } from "@/services/main/base";
import { useBranchesModal } from "@/stores/generic/branch";
import { useCurrentStore } from "@/stores/main/current-store";
import { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";

type TFormValues = {
	name: string;
	address: string;
};

export type TBranchFeatures = {
	handleCreateBranch: MutationResult<TFormValues>;
};

export const useBranchFeatures = (): TBranchFeatures => {
	const { setModal } = useBranchesModal();
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();
	const {
		branches: { refetch },
	} = useBranchesCache();
	const handleCreateBranch = useMutation<void, Error, TFormValues>({
		mutationFn: async (value) => {
			await functionInvoke({
				functionName: `stores/${currentStore?.id}/branches`,
				method: "POST",
				body: value,
			});
			refetch();
			setModal({ createBranch: false });
		},
	});
	return {
		handleCreateBranch,
	};
};
