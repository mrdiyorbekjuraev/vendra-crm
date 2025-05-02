import { useFetch } from "@/hooks/useFetch";
import type { RoleFormValues } from "@/models/main/roles";
import { useCurrentStore } from "@/stores/main/current-store";
import { useRoleModal } from "@/stores/main/roles";
import type { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type TWorkerFeatures = {
  handleWorkerCreate: MutationResult<any>;
  isPending: boolean;
};

export const useWorkerCreateFeatures = (): TWorkerFeatures => {
  const { functionInvoke } = useFetch();
  const { currentStore } = useCurrentStore();
  const { setModal } = useRoleModal();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleWorkerCreate = useMutation<void, Error, any>({
    mutationFn: async (value) => {
      try {
        await toast.promise(
          (async () => {
            setIsPending(true);
            const { data } = await functionInvoke<any>({
              functionName: `worker/create`,
              method: "POST",
              body: {
                ...value,
                code: "WKR-000002",
                storeId: currentStore?.id,
              },
            });

            if (!data?.success) {
              setIsPending(false);
              throw new Error("Backend responded with failure.");
            }

            setModal({ createRole: false });
            setIsPending(false);
          })(),
          {
            loading: "Creating worker...",
            success: "Worker successfully created",
            error: "Failed to create worker",
          }
        );
      } catch (err: any) {
        toast.error(err?.message || "Unexpected error while removing worker.");
      }
    },
  });

  return {
    handleWorkerCreate,
    isPending,
  };
};
