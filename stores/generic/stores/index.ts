import { create } from "zustand";

interface StoresModalStore {
	createStore: boolean;
	setModal: (payload: Partial<StoresModalStore>) => void;
}

export const useStoresModal = create<StoresModalStore>()((set) => {
	return {
		createStore: false,
		setModal: (payload: Partial<StoresModalStore>) => set(payload),
	};
});
