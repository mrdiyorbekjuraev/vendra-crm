import type { TUser } from "@/types/shared";

export type TRole = {
	id: string;
	name: string;
	storeId: string;
	createdAt: string;
	permissions: string[];
	description: string;
	creator: TUser;
	status: "ACTIVE" | "ARCHIVED";
};
export type TRoles = {
	success: boolean;
	message: string;
	code: string;
	data: {
		data: TRole[];
		page: number;
		limit: number;
	};
};

export type TRoleForm = {
	name: string;
};
