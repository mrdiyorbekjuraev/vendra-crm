import { create } from "zustand";

interface BranchModalStore {
	createBranch: boolean;
	setModal: (payload: Partial<BranchModalStore>) => void;
}

export const useBranchesModal = create<BranchModalStore>()((set) => {
	return {
		createBranch: false,
		setModal: (payload: Partial<BranchModalStore>) => set(payload),
	};
});
