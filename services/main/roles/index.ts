import { useFetch } from "@/hooks/useFetch";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useCurrentStore } from "@/stores/main/current-store";
import type { TRoles } from "@/types/main/roles";
import type { QueryResult, TBranches, TData, TStores } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

type TRolesCache = {
	roles: QueryResult<TRoles>;
};

/**
 * Custom hook for managing store roles data cache
 * @returns Store roles cache data and utility functions
 */
export const useRolesCache = (): TRolesCache => {
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();
	const { getParam } = useRouterQuery();

	const queryParams = useMemo(
		() => ({
			search: getParam("search") ?? "",
		}),
		[getParam],
	);

	const roles = useQuery({
		queryKey: [`${currentStore?.id}/roles/list/${queryParams?.search}`],
		queryFn: async () => {
			try {
				("use server");
				const { data } = await functionInvoke<TRoles>({
					functionName: "roles/list",
					method: "POST",
					body: {
						storeId: currentStore?.id,
						search: queryParams?.search,
					},
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
		enabled: Boolean(currentStore?.id),
	});

	return {
		roles,
	};
};

type TStats = {
	activeCount: number;
	archivedCount: number;
	totalCount: number;
	unassignedCount: number;
};

type TRolesSummaryCache = {
	stats: QueryResult<TData<TStats>>;
};

/**
 * Custom hook for managing store roles data cache
 * @returns Store roles cache data and utility functions
 */
export const useRolesSummaryCache = (): TRolesSummaryCache => {
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();

	const stats = useQuery({
		queryKey: [`${currentStore?.id}/roles/summary`],
		queryFn: async () => {
			try {
				const { data } = await functionInvoke<TData<TStats>>({
					functionName: "role/summary",
					method: "POST",
					body: {
						storeId: currentStore?.id,
					},
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
		enabled: Boolean(currentStore?.id),
	});

	return { stats };
};
