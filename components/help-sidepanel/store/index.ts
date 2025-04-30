import { create } from "zustand";

interface HelpSidePanelStore {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
}

export const useHelpSidePanelStore = create<HelpSidePanelStore>((set) => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false }),
	toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
