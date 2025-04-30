import { useFetch } from "@/hooks/useFetch";
import { useCurrentStore } from "@/stores/main/current-store";
import type { TRole } from "@/types/main/roles";
import type { MutationResult, TBroadcastPayload, TData } from "@/types/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRolesListeners } from "../features";

type TPermission = {
	resource: string;
	permission: string[];
};

type TRoleUpdate = {
	roleId: string;
	permissions: TPermission[];
};

type TRoleFeatures = {
	handleRolePermissionAssignee: MutationResult<TRoleUpdate>;
};

export const useRoleFeatures = (): TRoleFeatures => {
	const { functionInvoke } = useFetch();

	const handleRolePermissionAssignee = useMutation<void, Error, TRoleUpdate>({
		mutationFn: async (value) => {
			try {
				await toast.promise(
					(async () => {
						const { data } = await functionInvoke<TData<TRoleUpdate>>({
							functionName: "role/assign-permission",
							method: "POST",
							body: value,
						});

						if (!data?.success) {
							throw new Error("Backend responded with failure.");
						}
					})(),
					{
						loading: "Updating role...",
						success: "Role successfully updated",
						error: "Failed to update role",
					},
				);
			} catch (err: any) {
				toast.error(err?.message || "Unexpected error while removing role.");
			}
		},
	});

	return {
		handleRolePermissionAssignee,
	};
};

type UPDATE_ROLE = TBroadcastPayload<{
	role: TRole;
}>;

type TRoleListeners = {
	update_role: UPDATE_ROLE;
};
export const useRoleListeners = (): TRoleListeners => {
	const queryClient = useQueryClient();
	const { currentStore } = useCurrentStore();
	const { id } = useParams();

	// UPDATE ROLE
	const update_role: UPDATE_ROLE = ({ payload }) => {
		const roleKey = [`${currentStore?.id}/role/${id}`];

		const { data } = payload;
		queryClient.setQueryData<TRole>(roleKey, (prev) => {
			if (!prev) return prev;
			return {
				...prev,
				data: {
					...prev,
					data: data,
				},
			};
		});
	};

	return {
		update_role,
	};
};
