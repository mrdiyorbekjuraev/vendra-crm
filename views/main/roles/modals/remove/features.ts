import { useFetch } from "@/hooks/useFetch";
import { useCurrentStore } from "@/stores/main/current-store";
import { useRoleModal } from "@/stores/main/roles";
import type { MutationResult, TData } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useRolesListeners } from "../../features";
type TRemoveRole = {
	deletedRoleIds: string[];
	skippedRoleIds: string[];
};
type TRemoveRoleFeatures = {
	handleRemoveRole: MutationResult<TRemoveRole>;
	isPending: boolean;
};

export const useRemoveRoleFeatures = (): TRemoveRoleFeatures => {
	const { currentStore } = useCurrentStore();
	const { functionInvoke } = useFetch();
	const { setModal, remove } = useRoleModal();
	const { delete_roles } = useRolesListeners();
	const [isPending, setIsPending] = useState<boolean>(false);
	const { id } = useParams();
	const router = useRouter();

	const handleRemoveRole = useMutation<void, Error, TRemoveRole>({
		mutationFn: async (value) => {
			try {
				await toast.promise(
					(async () => {
						setIsPending(true);
						const { data } = await functionInvoke<TData<TRemoveRole>>({
							functionName: `roles/${currentStore?.id}`,
							method: "DELETE",
							body: {
								roleIds: remove?.props?.roleIds,
							},
						});

						if (!data?.success) {
							setIsPending(false);
							throw new Error("Backend responded with failure.");
						}

						delete_roles({
							payload: {
								browser_uuid: "",
								data: {
									roleIds: data?.data?.deletedRoleIds,
								},
							},
						});

						setModal({ remove: { open: false, props: null } });
						setIsPending(false);
						if (id) router?.push("/management/roles");
					})(),
					{
						loading: "Removing role...",
						success: "Role successfully removed",
						error: "Failed to remove role",
					},
				);
			} catch (err: any) {
				toast.error(err?.message || "Unexpected error while removing role.");
			}
		},
	});

	return {
		handleRemoveRole,
		isPending,
	};
};
