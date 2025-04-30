// store/user-store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define the user data interface
interface UserData {
	phone: string;
	isPhoneVerified: boolean;
	userId?: string;
	sessionToken?: string;
	lastUpdated?: string;
	isWorker?: boolean;
	// Add any other fields that your API returns
}

// Define the store interface
interface UserState {
	userData: UserData;
	setUserData: (data: Partial<UserData>) => void;
	clearUserData: () => void;
}

// If you want the store to be cleared on refresh, remove the persist middleware
export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			userData: {
				phone: "",
				isPhoneVerified: false,
				isWorker: true,
			},
			setUserData: (data) =>
				set((state) => ({
					userData: {
						...state.userData,
						...data,
						lastUpdated: new Date().toISOString(),
					},
				})),
			clearUserData: () =>
				set({
					userData: {
						phone: "",
						isPhoneVerified: false,
					},
				}),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
