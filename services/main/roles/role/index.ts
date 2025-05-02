import { useFetch } from "@/hooks/useFetch";
import { mockPermissions } from "@/mock/roles/index.data";
import { useCurrentStore } from "@/stores/main/current-store";
import type { TRole } from "@/types/main/roles";
import type { QueryResult, TData } from "@/types/shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const resourceToSectionMap: Record<string, string> = {
  // PRODUCTS
  categories: "products",
  import: "products",
  orders: "products",
  inventory: "products",
  transfer: "products",

  // SALES
  "new-sales": "sales",
  "all-sales": "sales",

  // CUSTOMERS
  "all-customers": "customers",
  "customers-group": "customers",
  "customers-debt": "customers",

  // MARKETING
  promotions: "marketing",
  "promo-codes": "marketing",
  "send-sms": "marketing",
  "gift-cards": "marketing",

  // REPORTS
  "report-products": "reports",
  vendors: "reports",
  "report-customers": "reports",
  finances: "reports",

  // MANAGEMENT
  workers: "management",
  roles: "management",

  // SETTINGS
  profile: "settings",
  general: "settings",
  stores: "settings",
};

type TRoleCache = {
  role: QueryResult<any>;
  togglePermission: any;
};

/**
 * Custom hook for managing store roles data cache
 * @returns Store roles cache data and utility functions
 */
export const useRoleCache = (): TRoleCache => {
  const { functionInvoke } = useFetch();
  const { currentStore } = useCurrentStore();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const role = useQuery({
    queryKey: [`${currentStore?.id}/role/${id}`],
    queryFn: async () => {
      try {
        ("use server");
        const { data } = await functionInvoke<TData<any>>({
          functionName: "roles/list",
          method: "POST",
          body: {
            storeId: currentStore?.id,
            roleId: id,
          },
        });
        const permissionsFromAPI = data?.data?.permissions || [];

        // Build a map to avoid duplicates and allow overwriting with API data
        const transformedMap = new Map(
          permissionsFromAPI.map((perm: any) => [
            perm.resource,
            {
              section: resourceToSectionMap?.[perm.resource] || "unknown",
              resource: perm.resource,
              actions: perm.actions,
            },
          ])
        );

        // Add missing resources from resourceToSectionMap
        for (const resource in resourceToSectionMap) {
          if (!transformedMap.has(resource)) {
            transformedMap.set(resource, {
              section: resourceToSectionMap[resource],
              resource,
              actions: [],
            });
          }
        }

        const transformed = Array.from(transformedMap.values());

        return {
          ...data,
          data: {
            ...data?.data,
            permissions: transformed,
          },
        };
      } catch (error: unknown) {
        toast.error("Error when fetching stores");
      }
    },
    enabled: Boolean(id && currentStore?.id),
  });

  const togglePermission = (resource: string, action: string) => {
    queryClient.setQueryData<TData<any>>(
      [`${currentStore?.id}/role/${id}`],
      (oldData) => {
        if (!oldData?.data?.permissions) return oldData;

        const updatedPermissions = oldData.data.permissions.map((perm: any) => {
          if (perm.resource !== resource) return perm;

          const actionsSet = new Set(perm.actions);
          actionsSet.has(action)
            ? actionsSet.delete(action)
            : actionsSet.add(action);

          return {
            ...perm,
            actions: Array.from(actionsSet),
          };
        });

        return {
          ...oldData,
          data: {
            ...oldData.data,
            permissions: updatedPermissions,
          },
        };
      }
    );
  };

  return {
    role,
    togglePermission,
  };
};

export const useRolePermissions = () => {
  const { currentStore } = useCurrentStore();
  const { id } = useParams();

  const permissions = useQuery({
    queryKey: [`${currentStore?.id}/role/${id}/permissions`],
    queryFn: () => {
      return {
        data: mockPermissions,
      };
    },
    enabled: Boolean(id && currentStore?.id),
  });
  return {
    permissions,
  };
};
