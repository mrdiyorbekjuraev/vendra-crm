// utils/server/data-fetching.ts
import {
  getAuthTokenFromCookie,
  getCurrentBranchId,
  getCurrentStoreFromCookie,
  getCurrentStoreId,
} from "@/config/base";
import { axiosInstance } from "@/lib/axios-client";
import type { TRoles } from "@/types/main/roles";
import type { TData, TBranches, TStatus } from "@/types/shared";

/**
 * Server-side function to fetch roles data
 *
 * @param search - Optional search query
 * @returns The fetched roles data
 */
export async function fetchRoles(): Promise<TRoles | null> {
  const storeId = getCurrentStoreId();

  if (!storeId) {
    console.error("No store ID found in cookies for fetching roles");
    return null;
  }

  const token = await getAuthTokenFromCookie();
  try {
    const response = await axiosInstance.post(
      "/roles/list/",

      { storeId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return null;
  }
}

/**
 * Server-side function to fetch roles summary
 *
 * @returns The roles summary statistics
 */
export async function fetchRolesSummary(): Promise<TData<TStatus> | null> {
  const storeId = getCurrentStoreId();

  if (!storeId) {
    console.error("No store ID found in cookies for fetching roles summary");
    return null;
  }

  const token = await getAuthTokenFromCookie();
  try {
    const response = await axiosInstance.post(
      "/role/summary",

      { storeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching roles summary:", error);
    return null;
  }
}

/**
 * Server-side function to fetch branches for a store
 *
 * @returns The list of branches for the current store
 */
export async function fetchBranches(): Promise<TBranches | null> {
  const storeId = getCurrentStoreFromCookie();

  if (!storeId) {
    console.error("No store ID found in cookies for fetching branches");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/branches/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthTokenFromCookie()}`,
        },
        body: JSON.stringify({
          storeId,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch branches: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return null;
  }
}

/**
 * Server-side function to fetch data specific to a branch
 *
 * @param endpoint - The API endpoint to call
 * @param additionalParams - Any additional parameters to include in the request
 * @returns The fetched data
 */
export async function fetchBranchData<T>(
  endpoint: string,
  additionalParams: Record<string, any> = {}
): Promise<T | null> {
  const storeId = getCurrentStoreId();
  const branchId = getCurrentBranchId();

  if (!storeId || !branchId) {
    console.error("Store ID or Branch ID not found in cookies");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthTokenFromCookie()}`,
        },
        body: JSON.stringify({
          storeId,
          branchId,
          ...additionalParams,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${endpoint}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}
