import { useFetch } from "@/hooks/useFetch";
import type { RoleFormValues } from "@/models/main/roles";
import { useCurrentStore } from "@/stores/main/current-store";
import { useRoleModal } from "@/stores/main/roles";
import type { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRolesListeners } from "../../features";

type TRoleFeatures = {
	handleRoleCreate: MutationResult<RoleFormValues>;
	isPending: boolean;
};

export const useRoleCreateFeatures = (): TRoleFeatures => {
	const { functionInvoke } = useFetch();
	const { currentStore } = useCurrentStore();
	const { setModal } = useRoleModal();
	const { create_role } = useRolesListeners();
	const [isPending, setIsPending] = useState<boolean>(false);

	const handleRoleCreate = useMutation<void, Error, RoleFormValues>({
		mutationFn: async (value) => {
			try {
				await toast.promise(
					(async () => {
						setIsPending(true);
						const { data } = await functionInvoke<any>({
							functionName: `stores/${currentStore?.id}/roles`,
							method: "POST",
							body: {
								name: value?.name,
								description: value?.description,
							},
						});

						if (!data?.success) {
							setIsPending(false);
							throw new Error("Backend responded with failure.");
						}

						create_role({
							payload: {
								browser_uuid: "",
								data: {
									role: data?.data,
								},
							},
						});

						setModal({ createRole: false });
						setIsPending(false);
					})(),
					{
						loading: "Creating role...",
						success: "Role successfully created",
						error: "Failed to create role",
					},
				);
			} catch (err: any) {
				toast.error(err?.message || "Unexpected error while removing role.");
			}
		},
	});

	return {
		handleRoleCreate,
		isPending,
	};
};
