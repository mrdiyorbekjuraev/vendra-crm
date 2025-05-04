import { create } from "zustand";

interface HelpSidePanelStore {
  isOpen: boolean;
  tab: "instruction" | "short-keys";
  search_instructions: string;
  search_short_keys: string;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  setData: (payload: Partial<HelpSidePanelStore>) => void;
}

export const useHelpSidePanelStore = create<HelpSidePanelStore>((set) => ({
  isOpen: false,
  tab: "instruction",
  search_instructions: "",
  search_short_keys: "",
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  setTab: () => set((state) => ({ tab: "short-keys" })),
  setData: (payload: Partial<HelpSidePanelStore>) => set(payload),
}));
