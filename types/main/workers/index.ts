type TUserData = {
	id: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	profilePhotoUrl: string;
	hashedRefreshToken: string;
	gender: "MALE" | "FEMALE";
	birthDate: string;
	address: string;
	startTime: string;
	endTime: string;
	createdAt: string;
	updatedAt: string;
};

type TBranchData = {
	id: string;
	name: string;
	address: string;
	phone: string | null;
	storeId: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
};

type TRoleData = {
	id: string;
	name: string;
	description: string;
	storeId: string;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
	status: "ACTIVE" | "INACTIVE";
};

type TWorkerStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "BLOCKED";

export type TWorker = {
	id: string;
	userId: string;
	status: TWorkerStatus;
	createdAt: string;
	password: string;
	code: string;
	description: string;
	user: TUserData;
	workerRoles: {
		id: string;
		workerId: string;
		branchId: string;
		roleId: string;
		assignedBy: string;
		assignedAt: string;
		branch: TBranchData;
		role: TRoleData;
	}[];
};

export type TWorkers = {
	total: number;
	page: number;
	limit: number;
	workers: TWorker[];
};
