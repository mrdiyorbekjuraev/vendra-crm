import { getAuthTokenFromCookie, getCurrentStoreId } from "@/config/base";
import { axiosInstance } from "@/lib/axios-client";
import { TBranch, TData, TStore } from "@/types/shared";

/**
 * Server-side function to fetch stores summary
 *
 * @returns The stores summary statistics
 */
export async function fetchStores(): Promise<TData<TStore> | null> {
  const token = await getAuthTokenFromCookie();
  try {
    const response = await axiosInstance.get("/stores", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stores summary:", error);
    return null;
  }
}

/**
 * Server-side function to fetch stores summary
 *
 * @returns The stores summary statistics
 */
export async function fetchStoreBranches(): Promise<TData<TBranch> | null> {
  const storeId = getCurrentStoreId();

  if (!storeId) {
    console.error("No store ID found in cookies for fetching roles summary");
    return null;
  }
  const token = await getAuthTokenFromCookie();
  try {
    const response = await axiosInstance.get(`/stores/${storeId}/branches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching stores summary:", error);
    return null;
  }
}
