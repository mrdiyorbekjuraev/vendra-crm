"use client";

import { useFetch } from "@/hooks/useFetch";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useRolesSummaryCache } from "@/services/main/roles";
import { useCurrentStore } from "@/stores/main/current-store";
import type { TRole, TRoles } from "@/types/main/roles";
import type { MutationResult, TBroadcastPayload } from "@/types/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

type TRoleUpdate = {
	id?: string;
	name?: string;
	description?: string;
	status?: "ACTIVE" | "ARCHIVED";
};

type TRoleFeatures = {
	handleRoleUpdate: MutationResult<TRoleUpdate>;
};

export const useRolesFeatures = (): TRoleFeatures => {
	const { currentStore } = useCurrentStore();
	const { functionInvoke } = useFetch();
	const { update_role } = useRolesListeners();
	const {
		stats: { refetch },
	} = useRolesSummaryCache();

	const handleRoleUpdate = useMutation<void, Error, TRoleUpdate>({
		mutationFn: async (value) => {
			try {
				await toast.promise(
					(async () => {
						let params = {};
						if (value?.status)
							params = {
								status: value?.status,
							};
						if (value?.description)
							params = {
								description: value?.description,
							};

						const { data } = await functionInvoke<any>({
							functionName: `roles/${currentStore?.id}/${value?.id}`,
							method: "PATCH",
							body: params,
						});

						if (!data?.success) {
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
						refetch();
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
		handleRoleUpdate,
	};
};

// ROLES LISTENERS

type CREATE_ROLE = TBroadcastPayload<{
	role: TRole;
}>;

type UPDATE_ROLE = TBroadcastPayload<{
	role: TRole;
}>;

type DELETE_ROLE = TBroadcastPayload<{
	role: {
		id: string;
	};
}>;

type DELETE_ROLES = TBroadcastPayload<{
	roleIds: string[];
}>;

type TRoleListeners = {
	create_role: CREATE_ROLE;
	delete_role: DELETE_ROLE;
	delete_roles: DELETE_ROLES;
	update_role: UPDATE_ROLE;
};

export const useRolesListeners = (): TRoleListeners => {
	const queryClient = useQueryClient();
	const { currentStore } = useCurrentStore();
	const { getParam } = useRouterQuery();

	const queryParams = useMemo(
		() => ({
			search: getParam("search") ?? "",
		}),
		[getParam],
	);

	const workerRef = useRef<Worker | null>(null);

	useEffect(() => {
		if (typeof window !== "undefined" && window.Worker) {
			if (!workerRef.current) {
				workerRef.current = new Worker(
					new URL(
						"../../../public/workers/roles/roles.worker.ts",
						import.meta.url,
					),
				);

				workerRef.current.onmessage = (event) => {
					const { type, success, result, queryKey } = event.data;

					if (success) {
						switch (type) {
							case "CREATE_ROLE":
								queryClient.setQueryData<TRoles>(queryKey, (prev) => {
									if (!prev) return prev;
									return {
										...prev,
										data: {
											...prev?.data,
											data: [...prev.data.data, result.role],
										},
									};
								});
								break;

							case "UPDATE_ROLE":
								queryClient.setQueryData<TRoles>(queryKey, (prev) => {
									if (!prev) return prev;
									return {
										...prev,
										data: {
											...prev?.data,
											data: prev?.data?.data?.map((role) =>
												role.id === result.role.id ? result.role : role,
											),
										},
									};
								});
								break;

							case "DELETE_ROLE":
								queryClient.setQueryData<TRoles>(queryKey, (prev) => {
									if (!prev) return prev;
									return {
										...prev,
										data: {
											...prev?.data,
											data: prev?.data.data?.filter(
												(role) => role.id !== result.roleId,
											),
										},
									};
								});
								break;
							case "DELETE_ROLES":
								queryClient.setQueryData<TRoles>(queryKey, (prev) => {
									if (!prev) return prev;
									return {
										...prev,
										data: {
											...prev.data,
											data: prev?.data?.data?.filter(
												(role) => !result.roleIds.includes(role.id),
											),
										},
									};
								});
								break;
						}
					} else {
						console.error(`Worker error on ${type}:`, event.data.error);
					}
				};
			}
		}

		// Clean up worker when component unmounts
		return () => {
			if (workerRef.current) {
				workerRef.current.terminate();
				workerRef.current = null;
			}
		};
	}, [queryClient]);

	// CREATE ROLE
	const create_role: CREATE_ROLE = ({ payload }) => {
		const roleKey = [`${currentStore?.id}/roles/list/${queryParams?.search}`];

		if (workerRef.current) {
			workerRef.current.postMessage({
				type: "CREATE_ROLE",
				payload,
				queryKey: roleKey,
			});
		} else {
			// Fallback if worker is not available
			const { data } = payload;
			queryClient.setQueryData<TRoles>(roleKey, (prev) => {
				if (!prev) return prev;
				return {
					...prev,
					data: {
						...prev?.data,
						data: [...prev.data.data, data.role],
					},
				};
			});
		}
	};

	// UPDATE ROLE
	const update_role: UPDATE_ROLE = ({ payload }) => {
		const roleKey = [`${currentStore?.id}/roles/list/${queryParams?.search}`];

		if (workerRef.current) {
			workerRef.current.postMessage({
				type: "UPDATE_ROLE",
				payload,
				queryKey: roleKey,
			});
		} else {
			// Fallback if worker is not available
			const { data } = payload;
			queryClient.setQueryData<TRoles>(roleKey, (prev) => {
				if (!prev) return prev;
				return {
					...prev,
					data: {
						...prev?.data,
						data: prev?.data?.data?.map((role) =>
							role.id === data?.role.id ? data?.role : role,
						),
					},
				};
			});
		}
	};

	// DELETE ROLE
	const delete_role: DELETE_ROLE = ({ payload }) => {
		const roleKey = [`${currentStore?.id}/roles/list/${queryParams?.search}`];

		if (workerRef.current) {
			workerRef.current.postMessage({
				type: "DELETE_ROLE",
				payload,
				queryKey: roleKey,
			});
		} else {
			// Fallback if worker is not available
			const { data } = payload;
			queryClient.setQueryData<TRoles>(roleKey, (prev) => {
				if (!prev) return prev;
				return {
					...prev,
					data: {
						...prev?.data,
						data: prev?.data.data?.filter((role) => role.id !== data?.role?.id),
					},
				};
			});
		}
	};

	const delete_roles: DELETE_ROLES = ({ payload }) => {
		const roleKey = [`${currentStore?.id}/roles/list/${queryParams?.search}`];

		if (workerRef.current) {
			workerRef.current.postMessage({
				type: "DELETE_ROLES",
				payload,
				queryKey: roleKey,
			});
		} else {
			// Fallback if worker is not available
			const { data } = payload;
			queryClient.setQueryData<TRoles>(roleKey, (prev) => {
				if (!prev) return prev;
				return {
					...prev,
					data: {
						...prev.data,
						data: prev?.data?.data?.filter(
							(role) => !data.roleIds.includes(role.id),
						),
					},
				};
			});
		}
	};

	return {
		create_role,
		delete_role,
		update_role,
		delete_roles,
	};
};
