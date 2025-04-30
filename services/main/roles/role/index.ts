import { STORE } from "@/enums/shared";
import { useFetch } from "@/hooks/useFetch";
import { useCurrentStore } from "@/stores/main/current-store";
import type { TRole } from "@/types/main/roles";
import type { QueryResult, TData } from "@/types/shared";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type TRoleCache = {
	role: QueryResult<TData<TRole>>;
};

/**
 * Custom hook for managing store roles data cache
 * @returns Store roles cache data and utility functions
 */
export const useRoleCache = (): TRoleCache => {
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();
	const { id } = useParams();

	const role = useQuery({
		queryKey: [`${currentStore?.id}/role/${id}`],
		queryFn: async () => {
			try {
				("use server");
				const { data } = await functionInvoke<TData<TRole>>({
					functionName: "roles/list",
					method: "POST",
					body: {
						storeId: currentStore?.id,
						roleId: id,
					},
				});
				return data;
			} catch (error: unknown) {
				toast.error("Error when fetching stores");
			}
		},
		enabled: Boolean(id),
	});

	return {
		role,
	};
};
