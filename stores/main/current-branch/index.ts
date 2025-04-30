import type { TBranch } from "@/types/shared";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrentBranchState = {
	branches: TBranch[];
	currentBranch: TBranch | null;
	setBranches: (stores: TBranch[]) => void;
	setCurrentBranch: (store: TBranch | null) => void;
};

export const useCurrentBranch = create<CurrentBranchState>()(
	persist(
		(set, get) => ({
			branches: [],
			currentBranch: null,

			setBranches: (branches) => {
				const existing = get().currentBranch;
				const matched = branches.find((s) => s.id === existing?.id);
				set({
					branches,
					currentBranch: matched || branches[0] || null,
				});
			},

			setCurrentBranch: (store) => {
				set({ currentBranch: store });
			},
		}),
		{
			name: "current-branch",
			partialize: (state) => ({ currentStore: state.currentBranch }), // only persist currentStore
		},
	),
);
