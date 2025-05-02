import { getCurrentStoreId } from "@/config/base";
import type { Params } from "@/types/shared";
import { getQueryClient } from "@/utils/get-query-clients";
import Roles from "@/views/main/roles";
import NextAuth from "@auth-kit/next/NextAuth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchRoles, fetchRolesSummary } from "./_server/data";

export default async function Page({
  params,
}: {
  params: Params;
}) {
  const queryClient = getQueryClient();
  const param = await params;
  const lang = param.lang;
  const storeId = getCurrentStoreId();

  //   Prefetch roles data
  await queryClient.prefetchQuery({
    queryKey: [`${storeId}/roles/list`],
    queryFn: async () => await fetchRoles(),
  });

  // Prefetch roles summary
  await queryClient.prefetchQuery({
    queryKey: [`${storeId}/roles/summary`],
    queryFn: async () => await fetchRolesSummary(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NextAuth fallbackPath="/sign-in">
        <Roles lang={lang} />
      </NextAuth>
    </HydrationBoundary>
  );
}
