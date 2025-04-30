import type { TRole } from "@/types/main/roles";
import { create } from "zustand";

export type TRemoveRole = {
	roleIds: string[];
};

interface RoleModalStore {
	createRole: boolean;
	editRole: { open: boolean; props: Partial<TRole> | null };
	remove: { open: boolean; props: TRemoveRole | null };
	setModal: (payload: Partial<RoleModalStore>) => void;
}

export const useRoleModal = create<RoleModalStore>()((set) => {
	return {
		createRole: false,
		editRole: { open: false, props: null },
		remove: { open: false, props: null },
		setModal: (payload: Partial<RoleModalStore>) => set(payload),
	};
});

interface Permission {
	section: string;
	resource: string;
	actions: string[];
}

interface TStore {
	permissions: Permission[];
	setPermissions: (permissions: Permission[]) => void;
	toggle: (resource: string, action: string) => void;
}

export const usePermissionStore = create<TStore>((set) => ({
	permissions: [],
	setPermissions: (permissions) => set({ permissions }),
	toggle: (resource, action) =>
		set((state) => ({
			permissions: state.permissions.map((perm) =>
				perm.resource === resource
					? {
							...perm,
							actions: perm.actions.includes(action)
								? perm.actions.filter((a) => a !== action)
								: [...perm.actions, action],
						}
					: perm,
			),
		})),
}));
