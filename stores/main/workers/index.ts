import type { TUser } from "@/types/shared";
import { create } from "zustand";

type TRemoveWorker = {
	workerIds: string[];
};

interface WorkerModalStore {
	createWorker: boolean;
	editWorker: { open: boolean; props: Partial<TUser> | null };
	remove: { open: boolean; props: TRemoveWorker | null };
	setModal: (payload: Partial<WorkerModalStore>) => void;
}

export const useWorkersModal = create<WorkerModalStore>()((set) => {
	return {
		createWorker: false,
		editWorker: { open: false, props: null },
		remove: { open: false, props: null },
		setModal: (payload: Partial<WorkerModalStore>) => set(payload),
	};
});

interface ITableStore {
	isFavoritesVisible: boolean;
	isCompactTable: boolean;
	setTable: (payload: Partial<ITableStore>) => void;
}

export const useTableStore = create<ITableStore>((set) => ({
	isFavoritesVisible: false,
	isCompactTable: true,
	setTable: (payload: Partial<ITableStore>) => set(payload),
}));
