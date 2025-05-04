import React from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { CreateBranch } from "./branch";
import { CreateStore } from "./stores";
import { useBranchesModal } from "@/stores/generic/branch";
import { useStoresModal } from "@/stores/generic/stores";

const GlobalModals = () => {
  const isAuthenticated = useIsAuthenticated();
  const { createBranch } = useBranchesModal();
  const { createStore } = useStoresModal();
  if (isAuthenticated) {
    return (
      <>
        {createBranch && <CreateBranch />}
        {createStore && <CreateStore />}
      </>
    );
  }
  return null;
};

export default GlobalModals;
