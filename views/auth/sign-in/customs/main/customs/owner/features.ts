import { useFetch } from "@/hooks/useFetch";
import httpClient from "@/lib/axios-client";
import { useUserStore } from "@/stores/auth";
import { TData } from "@/types/auth/sign-in";
import { MutationResult } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { toast } from "sonner";

type TOwnerFormFeatures = {
  handlePhoneRegister: MutationResult<any>;
  handleCodeCheck: MutationResult<any>;
  isPending: boolean;
  isCodeChecking: boolean;
  resendCode: MutationResult;
};

export const useOwnerFormFeatures = (): TOwnerFormFeatures => {
  const { setUserData, userData } = useUserStore();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isCodeChecking, setIsCodeChecking] = useState<boolean>(false);
  const { push } = useRouter();
  const signIn = useSignIn();

  const handlePhoneRegister = useMutation<void, Error, any>({
    mutationFn: async (value) => {
      try {
        await toast.promise(
          (async () => {
            setIsPending(true);
            const { data } = await httpClient.post<any>(
              "auth/send-code",
              value
            );
            setUserData({
              phone: value.phoneNumber,
              isPhoneVerified: true,
            });

            if (!data?.success) {
              setIsPending(false);
              throw new Error("Backend responded with failure.");
            }

            setIsPending(false);
          })(),
          {
            loading: "Checking phone number...",
            success: `Code has been sent to ${userData?.phone}`,
            error: "Failed to checking phone number",
          }
        );
      } catch (err: any) {
        toast.error(
          err?.message || "Unexpected error while checking phone number."
        );
      }
    },
  });

  const handleCodeCheck = useMutation<void, Error, any>({
    mutationFn: async (value) => {
      try {
        await toast.promise(
          (async () => {
            setIsCodeChecking(true);
            if (!value?.phoneNumber && !value?.code)
              return toast.warning("Phone number or code not provided");
            const { data, success } = await httpClient.post<TData>(
              "auth/verify-code",
              {
                phoneNumber: userData?.phone || value.phoneNumber,
                code: value?.code,
              }
            );
            setUserData({
              phone: value.phoneNumber,
              isPhoneVerified: true,
            });

            if (!success) {
              setIsCodeChecking(false);
              throw new Error("Backend responded with failure.");
            }

            if (data?.needRegistration) {
              push("/user-profile-setup");
            } else {
              signIn({
                auth: {
                  token: String(data?.tokens?.accessToken),
                  type: "Bearer",
                },
                refresh: String(data?.tokens?.refreshToken),
                userState: {
                  ...value,
                  role: "owner",
                },
              });
              push("/");
            }

            setIsCodeChecking(false);
          })(),
          {
            loading: "Code is being checked...",
            success: "Code passed successfully",
            error: "Failed to checking phone number or code",
          }
        );
      } catch (err: any) {
        toast.error(
          err?.message || "Unexpected error while checking phone number."
        );
      }
    },
  });
  const resendCode = useMutation<void, Error>({
    mutationFn: async () => {
      if (!userData.phone) return;
      try {
        await httpClient.post("auth/send-code", {
          phoneNumber: userData.phone,
        });
        toast.success(`Code has been resent to ${userData.phone}`);
      } catch (error) {
        toast.error("Failed to resend code. Please try again.");
      }
    },
  });

  return {
    handlePhoneRegister,
    handleCodeCheck,
    isCodeChecking,
    resendCode,
    isPending,
  };
};
