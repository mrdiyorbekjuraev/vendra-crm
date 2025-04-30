// stores/useCurrentStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
	id: string;
	name: string;
	slug: string;
	type: string;
	ownerId: string;
	logoUrl: string;
	createdAt: string;
	updatedAt: string;
};

type CurrentStoreState = {
	stores: Store[];
	currentStore: Store | null;
	setStores: (stores: Store[]) => void;
	setCurrentStore: (store: Store) => void;
};

export const useCurrentStore = create<CurrentStoreState>()(
	persist(
		(set, get) => ({
			stores: [],
			currentStore: null,

			setStores: (stores) => {
				const existing = get().currentStore;
				const matched = stores.find((s) => s.id === existing?.id);
				set({
					stores,
					currentStore: matched || stores[0] || null,
				});
			},

			setCurrentStore: (store) => {
				set({ currentStore: store });
			},
		}),
		{
			name: "current-store",
			partialize: (state) => ({ currentStore: state.currentStore }), // only persist currentStore
		},
	),
);
