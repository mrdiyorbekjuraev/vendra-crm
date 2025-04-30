export const mockPermissions = [
	// PRODUCTS
	{
		section: "products",
		resource: "categories",
		actions: [],
	},
	{
		section: "products",
		resource: "import",
		actions: [],
	},
	{
		section: "products",
		resource: "orders",
		actions: [],
	},
	{
		section: "products",
		resource: "inventory",
		actions: [],
	},
	{
		section: "products",
		resource: "transfer",
		actions: [],
	},
	//   SALES
	{
		section: "sales",
		resource: "new-sales",
		actions: [],
	},
	{
		section: "sales",
		resource: "all-sales",
		actions: [],
	},
	//   CUSTOMERS
	{
		section: "customers",
		resource: "all-customers",
		actions: [],
	},
	{
		section: "customers",
		resource: "customers-group",
		actions: [],
	},
	{
		section: "customers",
		resource: "customers-debt",
		actions: [],
	},
	//   MARKETING
	{
		section: "marketing",
		resource: "promotions",
		actions: [],
	},
	{
		section: "marketing",
		resource: "promo-codes",
		actions: [],
	},
	{
		section: "marketing",
		resource: "send-sms",
		actions: [],
	},
	{
		section: "marketing",
		resource: "gift-cards",
		actions: [],
	},
	// REPORTS
	{
		section: "reports",
		resource: "report-products",
		actions: [],
	},
	{
		section: "reports",
		resource: "vendors",
		actions: [],
	},
	{
		section: "reports",
		resource: "report-customers",
		actions: [],
	},
	{
		section: "reports",
		resource: "finances",
		actions: [],
	},
	// MANAGEMENT
	{
		section: "management",
		resource: "workers",
		actions: [],
	},
	{
		section: "management",
		resource: "roles",
		actions: [],
	},
	// SETTINGS
	{
		section: "settings",
		resource: "profile",
		actions: [],
	},
	{
		section: "settings",
		resource: "general",
		actions: [],
	},
	{
		section: "settings",
		resource: "stores",
		actions: [],
	},
];

export const actionLabels: Record<string, string> = {
	read: "View and retrieve data",
	write: "Create or add new entries",
	update: "Modify or edit existing data",
	delete: "Remove existing data permanently",
};
