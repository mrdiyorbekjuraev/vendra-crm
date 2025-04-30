import { usePathname, useRouter, useSearchParams } from "next/navigation";

type IQuerySet = {
	[key: string]: string;
};

type ISearchParams = {
	getAllParams: () => {
		keys: string[];
		values: string[];
		pair: IQuerySet;
	};
	removeParamsByKey: (keys: string[]) => void;
	setParams: (params: IQuerySet) => void;
	getParam: (key: string) => string | null;
	clearParams: () => void;
};

export const useRouterQuery = (): ISearchParams => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Helper function to create a query string from an object
	const createQueryString = (params: IQuerySet): string => {
		const urlSearchParams = new URLSearchParams(params);
		return urlSearchParams.toString();
	};

	// Get all query parameters
	const getAllParams = (): {
		keys: string[];
		values: string[];
		pair: IQuerySet;
	} => {
		const keys = Array.from(searchParams.keys());
		const values = Array.from(searchParams.values());
		const pair = Object.fromEntries(Array.from(searchParams.entries()));

		return { keys, values, pair };
	};

	// Remove query parameters by keys
	const removeParamsByKey = (keys: string[]): void => {
		const currentParams = getAllParams().pair;

		// Remove specified keys
		for (const key of keys) {
			delete currentParams[key];
		}

		// Update the URL with the remaining parameters
		router.push(`${pathname}?${createQueryString(currentParams)}`);
	};

	// Set or update query parameters
	const setParams = (params: IQuerySet): void => {
		const currentParams = getAllParams().pair;

		// Merge new parameters with existing ones
		const updatedParams = { ...currentParams, ...params };

		// Update the URL
		router.push(`${pathname}?${createQueryString(updatedParams)}`);
	};

	// Get a specific query parameter by key
	const getParam = (key: string): string | null => {
		return searchParams.get(key);
	};

	// Clear all query parameters
	const clearParams = (): void => {
		router.push(pathname);
	};

	return {
		getAllParams,
		removeParamsByKey,
		setParams,
		getParam,
		clearParams,
	};
};
