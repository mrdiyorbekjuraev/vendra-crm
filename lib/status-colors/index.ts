type TStatus =
	| "gray"
	| "red"
	| "yellow"
	| "green"
	| "blue"
	| "indigo"
	| "purple"
	| "pink"
	| undefined;

export function getStatusColor(status: string): TStatus {
	switch (status.toLowerCase()) {
		case "active":
			return "green";
		case "inactive":
			return "red";
		case "pending":
			return "yellow";
		case "blocked":
			return "red";
		default:
			return "gray";
	}
}
