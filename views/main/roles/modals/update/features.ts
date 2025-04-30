import { useFetch } from "@/hooks/useFetch";
import type { RoleFormValues } from "@/models/main/roles";
import { useCurrentStore } from "@/stores/main/current-store";
import { useRoleModal } from "@/stores/main/roles";
import type { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useRolesListeners } from "../../features";

type TRoleEditFeatures = {
	handleRoleEdit: MutationResult<RoleFormValues>;
	isPending: boolean;
};

export const useRolesEditFeatures = (): TRoleEditFeatures => {
	const { currentStore } = useCurrentStore();
	const { functionInvoke } = useFetch();
	const { setModal, editRole } = useRoleModal();
	const { update_role } = useRolesListeners();
	const [isPending, setIsPending] = useState<boolean>(false);

	const handleRoleEdit = useMutation<void, Error, RoleFormValues>({
		mutationFn: async (value) => {
			try {
				await toast.promise(
					(async () => {
						setIsPending(true);
						const { data } = await functionInvoke<any>({
							functionName: `roles/${currentStore?.id}/${editRole?.props?.id}`,
							method: "PATCH",
							body: {
								name: value?.name,
								description: value?.description,
							},
						});

						if (!data?.success) {
							setIsPending(false);
							throw new Error("Backend responded with failure.");
						}

						update_role({
							payload: {
								browser_uuid: "",
								data: {
									role: data?.data,
								},
							},
						});

						setModal({ editRole: { open: false, props: null } });
						setIsPending(false);
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
		handleRoleEdit,
		isPending,
	};
};
