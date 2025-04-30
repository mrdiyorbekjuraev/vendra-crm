// roles.worker.ts
// This file will contain the worker logic

// We need to type the incoming messages from the main thread
type WorkerMessage = {
	type: "CREATE_ROLE" | "UPDATE_ROLE" | "DELETE_ROLE" | "DELETE_ROLES";
	payload: any;
	queryKey: string[];
};

// This function will be executed in the worker thread
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
	const { type, payload, queryKey } = event.data;

	try {
		let result: any;

		switch (type) {
			case "CREATE_ROLE":
				// Process the creation logic
				result = processCreateRole(payload, queryKey);
				break;
			case "UPDATE_ROLE":
				// Process the update logic
				result = processUpdateRole(payload, queryKey);
				break;
			case "DELETE_ROLE":
				// Process the delete logic
				result = processDeleteRole(payload, queryKey);
				break;
			case "DELETE_ROLES":
				result = processDeleteRoles(payload, queryKey);
				break;
		}

		// Send the processed data back to the main thread
		self.postMessage({
			type,
			success: true,
			result,
			queryKey,
		});
	} catch (error) {
		self.postMessage({
			type,
			success: false,
			error: (error as Error).message,
			queryKey,
		});
	}
};

// Helper functions that would normally run on the main thread
function processCreateRole(payload: any, queryKey: string[]) {
	const { data } = payload;
	return {
		operation: "create",
		role: data?.role,
		queryKey,
	};
}

function processUpdateRole(payload: any, queryKey: string[]) {
	const { data } = payload;
	return {
		operation: "update",
		role: data?.role,
		queryKey,
	};
}

function processDeleteRole(payload: any, queryKey: string[]) {
	const { data } = payload;
	return {
		operation: "delete",
		roleId: data?.role.id,
		queryKey,
	};
}

function processDeleteRoles(payload: any, queryKey: string[]) {
	const { data } = payload;
	return {
		operation: "delete_many",
		roleIds: data?.roleIds,
		queryKey,
	};
}

// Since this is a module worker, we need to export an empty object
export {};
