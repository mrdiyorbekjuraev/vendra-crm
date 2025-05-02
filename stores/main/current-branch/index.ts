import type { TBranch } from "@/types/shared";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

type CurrentBranchState = {
  branches: TBranch[];
  currentBranch: TBranch | null;
  setBranches: (branches: TBranch[]) => void;
  setCurrentBranch: (branch: TBranch | null) => void;
  clearCurrentBranch: () => void; 
};

// Custom storage for cookies
const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = Cookies.get(name);
    return value ? value : null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, {
      expires: 30,
      path: "/",
      sameSite: "strict",
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { path: "/" });
  },
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

      setCurrentBranch: (branch) => {
        set({ currentBranch: branch });
      },

      clearCurrentBranch: () => {
        set({ currentBranch: null });
        cookieStorage.removeItem("current-branch"); 
      },
    }),
    {
      name: "current-branch",
      partialize: (state) => ({ currentBranch: state.currentBranch }), // only persist currentBranch
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
