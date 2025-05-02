// stores/useCurrentStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

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
  clearCurrentStore: () => void;
};

// Custom storage for cookies
const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = Cookies.get(name);
    return value ? value : null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, {
      expires: 30, // 30 days
      path: "/",
      sameSite: "strict",
      // Uncomment in production
      //   secure: process.env.NODE_ENV === 'production'
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name, { path: "/" });
  },
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
      clearCurrentStore: () => {
        set({ currentStore: null });
        cookieStorage.removeItem("current-store"); // clear from cookies
      },
    }),
    {
      name: "current-store",
      partialize: (state) => ({ currentStore: state.currentStore }), // only persist currentStore
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
