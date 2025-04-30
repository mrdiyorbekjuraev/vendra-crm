import React from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { CreateBranch } from "./branch";
import { CreateStore } from "./stores";

const GlobalModals = () => {
	const isAuthenticated = useIsAuthenticated();
	if (isAuthenticated) {
		return (
			<div>
				<CreateBranch />
				<CreateStore />
			</div>
		);
	}
	return null;
};

export default GlobalModals;
