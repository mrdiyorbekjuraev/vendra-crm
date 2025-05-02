"use client";

import { ReactNode, useMemo } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { mockPermissions } from "@/mock/roles/index.data";

type PermissionAction = "read" | "create" | "update" | "delete" | string;

interface PermissionGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  resource?: string;
  actions?: PermissionAction | PermissionAction[]; // Single action or array of actions
  condition?: boolean | (() => boolean); // Support for both direct boolean and function
  loading?: ReactNode; // Loading state UI
  userRoles?: string[]; // Specific roles that can access
  requireAllActions?: boolean; // Whether all actions must be permitted (AND logic) vs any action (OR logic)
}

/**
 * Enhanced Protect component similar to Clerk's protection mechanism
 *
 * Protects UI elements based on user permissions with flexible options:
 * - Role-based protection
 * - Resource/action-based protection
 * - Custom condition-based protection
 * - Support for loading states
 *
 * @example Basic usage
 * <Protect resource="posts" actions="read">
 *   <PostsList />
 * </Protect>
 *
 * @example With fallback
 * <Protect
 *   resource="users"
 *   actions={["update", "delete"]}
 *   fallback={<AccessDeniedMessage />}
 * >
 *   <UserManagement />
 * </Protect>
 *
 * @example Role-based
 * <Protect userRoles={["admin", "moderator"]}>
 *   <AdminPanel />
 * </Protect>
 *
 * @example Custom condition
 * <Protect condition={() => user?.emailVerified === true}>
 *   <VerifiedContent />
 * </Protect>
 */
export const Protect = ({
  children,
  fallback = null,
  resource,
  actions,
  condition,
  loading = null,
  userRoles = [],
  requireAllActions = true,
}: PermissionGuardProps) => {
  const auth = useAuthUser<any>();

  // Handle loading state if auth is still being determined
  if (auth === undefined) return <>{loading}</>;

  // Owner override - they get access to everything
  if (auth?.role === "owner") return <>{children}</>;

  // Role-based check
  if (userRoles.length > 0 && auth?.role) {
    if (userRoles.includes(auth.role)) return <>{children}</>;
  }

  // Custom condition check
  if (condition !== undefined) {
    const conditionResult =
      typeof condition === "function" ? condition() : condition;
    if (conditionResult) return <>{children}</>;
    // If explicit condition is provided and fails, return fallback
    if (resource === undefined && actions === undefined) return <>{fallback}</>;
  }

  // Resource/action-based permission check
  const hasResourceAccess = useMemo(() => {
    if (!resource) return false;

    // Normalize actions to array
    const requiredActions = actions
      ? Array.isArray(actions)
        ? actions
        : [actions]
      : [];

    return mockPermissions.some((perm) => {
      // Check if permission is for the requested resource
      if (perm?.resource !== resource) return false;

      // If no actions specified, just having the resource is enough
      if (!requiredActions.length) return true;

      // Check if required actions are permitted
      if (requireAllActions) {
        // AND logic - all actions must be permitted
        return requiredActions.every((action) =>
          perm?.actions.includes(action)
        );
      } else {
        // OR logic - any action is sufficient
        return requiredActions.some((action) => perm?.actions.includes(action));
      }
    });
  }, [resource, actions, requireAllActions]);

  return hasResourceAccess ? <>{children}</> : <>{fallback}</>;
};

// Optional export of a simpler version for common cases
export const ProtectRole = ({
  children,
  fallback = null,
  roles,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  roles: string | string[];
}) => {
  const roleArray = Array.isArray(roles) ? roles : [roles];

  return (
    <Protect userRoles={roleArray} fallback={fallback}>
      {children}
    </Protect>
  );
};
