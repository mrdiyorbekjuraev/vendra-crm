import { getCurrentStoreId } from "@/config/base";
import type { Params } from "@/types/shared";
import { getQueryClient } from "@/utils/get-query-clients";
import Role from "@/views/main/roles/role";
import { fetchRole } from "./_server/data";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NextAuth from "@auth-kit/next/NextAuth";
import { Metadata } from "next";

export default async function Page({ params }: { params: Params }) {
  const queryClient = getQueryClient();
  const param = await params;
  const lang = param.lang;
  const id = param?.id;

  const storeId = getCurrentStoreId();

  //   Prefetch roles data
  await queryClient.prefetchQuery({
    queryKey: [`${storeId}/roles/list/${id}`],
    queryFn: async () => await fetchRole(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NextAuth fallbackPath="/sign-in">
        <Role lang={lang} />
      </NextAuth>
    </HydrationBoundary>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const param = await params;
  const id = param?.id;
  const storeId = getCurrentStoreId();

  try {
    const role = await fetchRole(id);
    return {
      title: `${role?.data?.name || "Role"} - Role Module`,
      description: `Details for role "${
        role?.data?.description || id
      }" in store ${storeId}.`,
    };
  } catch (err) {
    return {
      title: "Role Not Found - Admin Panel",
      description: `No role found for ID ${id}.`,
    };
  }
}
