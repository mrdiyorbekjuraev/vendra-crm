import type { i18n } from "@/i18n.config";
import type {
	InfiniteData,
	UseInfiniteQueryResult,
	UseMutationResult,
	UseQueryResult,
} from "@tanstack/react-query";

export type TLocale = (typeof i18n)["locales"][number] | "uz" | "ru" | "en";

export interface IParams {
	params: { lang: TLocale };
}

export interface IOption {
	value: string;
	label: string;
}

export interface IPageParams {
	lang: TLocale;
}

export type TStatus = "ACTIVE" | "ARCHIVED";
export type Params = Promise<{ lang: TLocale }>;
export type MutationResult<T = void> = UseMutationResult<
	any,
	Error,
	T,
	unknown
>;

export type QueryResult<T> = UseQueryResult<T | null | undefined, Error>;

export type InfiniteQueryResult<T> = UseInfiniteQueryResult<
	InfiniteData<T | null | undefined>
>;

export type TBroadcastPayload<T> = (params: {
	payload: { data: T; browser_uuid: string; type?: string };
}) => void;

export type TData<T> = {
	success: boolean;
	message: string;
	code: number;
	data: T;
};

// STORE DATA
export type TStore = {
	id: string;
	name: string;
	slug: string;
	type: string;
	ownerId: string;
	logoUrl: string;
	createdAt: string;
	updatedAt: string;
};
export type TStores = {
	success: boolean;
	message: string;
	code: string;
	data: TStore[];
};

// BRANCHES DATA

export type TBranch = {
	id: string;
	name: string;
	address: string;
	phone: null;
	storeId: string;
	createdAt: string;
	updatedAt: string;
	isActive: boolean;
};
export type TBranches = {
	success: boolean;
	message: string;
	code: string;
	data: TBranch[];
};

// USER ME

export type TUser = {
	id: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	profilePhotoUrl: string;
	hashedRefreshToken: string;
	gender: "male" | "female";
	birthDate: string;
	address: string;
	startTime: string;
	endTime: string;
	createdAt: string;
	updatedAt: string;
	workers: string[];
};
