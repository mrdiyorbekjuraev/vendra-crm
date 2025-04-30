import { useFetch } from "@/hooks/useFetch";
import { useCurrentStore } from "@/stores/main/current-store";
import type {
	QueryResult,
	TBranches,
	TData,
	TStore,
	TStores,
	TUser,
} from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type TStoresCache = {
	stores: QueryResult<TStores>;
};

/**
 * Custom hook for managing store data cache
 * @returns Store cache data and utility functions
 */
export const useStoreCache = (): TStoresCache => {
	const { functionInvoke } = useFetch();
	const stores = useQuery({
		queryKey: ["stores"],
		queryFn: async () => {
			try {
				("use server");
				const { data } = await functionInvoke<TStores>({
					functionName: "stores",
					method: "GET",
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
	});

	return {
		stores,
	};
};

type TBranchesCache = {
	branches: QueryResult<TBranches>;
};

/**
 * Custom hook for managing branches data cache
 * @returns Branches cache data and utility functions
 */

export const useBranchesCache = (): TBranchesCache => {
	const { currentStore } = useCurrentStore();
	const { functionInvoke } = useFetch();

	const branches = useQuery({
		queryKey: [`stores/${currentStore?.id}/branches`],
		queryFn: async () => {
			try {
				("use server");
				const { data } = await functionInvoke<TBranches>({
					functionName: `stores/${currentStore?.id}/branches`,
					method: "GET",
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
		enabled: Boolean(currentStore?.id),
	});

	return {
		branches,
	};
};

type TUserCache = {
	user: QueryResult<TData<TUser>>;
};

/**
 * Custom hook for managing branches data cache
 * @returns Branches cache data and utility functions
 */

export const useUserCache = (): TUserCache => {
	const { functionInvoke } = useFetch();

	const user = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			try {
				("use server");
				const { data } = await functionInvoke<TData<TUser>>({
					functionName: "me",
					method: "GET",
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
	});

	return {
		user,
	};
};

type TStoreCache = {
	store: QueryResult<TData<TStore>>;
};

/**
 * Custom hook for managing branches data cache
 * @returns Branches cache data and utility functions
 */

export const useActiveStoreCache = (): TStoreCache => {
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();

	const store = useQuery({
		queryKey: [`stores/${currentStore?.id}`],
		queryFn: async () => {
			try {
				("use server");
				const { data } = await functionInvoke<TData<TStore>>({
					functionName: `stores/${currentStore?.id}`,
					method: "GET",
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
	});

	return {
		store,
	};
};
