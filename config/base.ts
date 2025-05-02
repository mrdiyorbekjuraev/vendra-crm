import { cookies } from "next/headers";
import type { TStore } from "@/types/shared";
import type { TBranch } from "@/types/shared";

/**
 * Gets the current store from cookies on the server side
 * @returns The current store object or null if not found
 */
export async function getCurrentStoreFromCookie(): Promise<TStore | null> {
  try {
    const cookieStore = await cookies();
    const storeData = cookieStore.get("current-store");
    if (!storeData?.value) {
      return null;
    }

    // Parse the JSON string
    const parsedData = JSON.parse(storeData.value);


    if (parsedData && parsedData.state && parsedData.state.currentStore) {
      return parsedData.state.currentStore;
    }

    return null;
  } catch (error) {
    console.error("Error parsing store data from cookie:", error);
    return null;
  }
}

/**
 * Gets the current branch from cookies on the server side
 * @returns The current branch object or null if not found
 */
export async function getCurrentBranchFromCookie(): Promise<TBranch | null> {
  try {
    const cookieStore = await cookies();
    const branchData = cookieStore?.get("current-branch");

    if (!branchData?.value) {
      return null;
    }

    // Parse the JSON string
    const parsedData = JSON.parse(branchData.value);

    // The data structure from zustand persist includes the state object
    if (parsedData && parsedData.state && parsedData.state.currentBranch) {
      return parsedData.state.currentBranch;
    }

    return null;
  } catch (error) {
    console.error("Error parsing branch data from cookie:", error);
    return null;
  }
}


/**
 * Gets just the current store ID from cookies
 * @returns The current store ID or null if not found
 */
export async function getCurrentStoreId(): Promise<string> {
    const store = await getCurrentStoreFromCookie();
    return String(store?.id);
  }
  
  /**
   * Gets just the current branch ID from cookies
   * @returns The current branch ID or null if not found
   */
  export async function getCurrentBranchId(): Promise<string> {
    const branch = await getCurrentBranchFromCookie();
    return String(branch?.id);
  }


export async function getAuthTokenFromCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("_vendra_auth");

    if (!authCookie?.value) {
      return null;
    }
    
    // If you're storing raw token string, return directly
    return authCookie.value;

    // Optional: If you're storing a JSON string instead:
    // const parsed = JSON.parse(authCookie.value);
    // return parsed?.token || null;
  } catch (error) {
    console.error("Error retrieving auth token from cookie:", error);
    return null;
  }
}
