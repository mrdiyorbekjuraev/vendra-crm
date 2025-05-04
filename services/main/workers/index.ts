import { useFetch } from "@/hooks/useFetch";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useCurrentBranch } from "@/stores/main/current-branch";
import { useCurrentStore } from "@/stores/main/current-store";
import type { TRoles } from "@/types/main/roles";
import { TWorker, TWorkers } from "@/types/main/workers";
import type { QueryResult, TData } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

type TWorkersCache = {
	workers: QueryResult<TData<TWorkers>>;
};

/**
 * Custom hook for managing store roles data cache
 * @returns Store roles cache data and utility functions
 */
export const useWorkersCache = (): TWorkersCache => {
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();
	const { currentBranch } = useCurrentBranch();
	const { getParam } = useRouterQuery();

	const defaultPageSize = 10;

	const queryParams = useMemo(
		() => ({
			search: getParam("search") || "",
			storeId: currentStore?.id,
			branchId: currentBranch?.id,
			status: getParam("tab")?.toUpperCase() || "",
			page: Number(getParam("page")) || 1,
			limit: Number(getParam("limit")) || defaultPageSize,
		}),
		[getParam, currentStore?.id, currentBranch?.id, defaultPageSize],
	);

	const queryKey = useMemo(() => {
		const { search, status, page, limit } = queryParams;
		return [
			"workers",
			currentStore?.id,
			currentBranch?.id,
			{ search, status, page, limit },
		];
	}, [queryParams, currentStore?.id, currentBranch?.id]);

	const workers = useQuery({
		queryKey,
		queryFn: async () => {
			try {
				const { data } = await functionInvoke<TData<TWorkers>>({
					functionName: "worker/list",
					method: "POST",
					body: queryParams,
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
		enabled: Boolean(currentStore?.id && currentBranch?.id),
	});

	return {
		workers,
	};
};
