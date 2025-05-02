import { getAuthTokenFromCookie, getCurrentStoreId } from "@/config/base";
import { axiosInstance } from "@/lib/axios-client";
import { TRole } from "@/types/main/roles";
import { TData } from "@/types/shared";

/**
 * Server-side function to fetch roles summary
 *
 * @returns The roles summary statistics
 */
export async function fetchRole(
  roleId: string = ""
): Promise<TData<TRole> | null> {
  const storeId = getCurrentStoreId();

  if (!storeId) {
    console.error("No store ID found in cookies for fetching roles summary");
    return null;
  }

  const token = await getAuthTokenFromCookie();
  try {
    const response = await axiosInstance.post(
      "/roles/list",

      { storeId, roleId },
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
