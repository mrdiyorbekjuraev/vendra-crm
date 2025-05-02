type TPermission = {
  section: string;
  resource: string;
  actions: string[];
};
export const mockPermissions: TPermission[] = [
  // PRODUCTS
  {
    section: "products",
    resource: "categories",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "products",
    resource: "import",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "products",
    resource: "orders",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "products",
    resource: "inventory",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "products",
    resource: "transfer",
    actions: ["read", "write", "update", "delete"],
  },
  //   SALES
  {
    section: "sales",
    resource: "new-sales",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "sales",
    resource: "all-sales",
    actions: ["read", "write", "update", "delete"],
  },
  //   CUSTOMERS
  {
    section: "customers",
    resource: "all-customers",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "customers",
    resource: "customers-group",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "customers",
    resource: "customers-debt",
    actions: ["read", "write", "update", "delete"],
  },
  //   MARKETING
  {
    section: "marketing",
    resource: "promotions",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "marketing",
    resource: "promo-codes",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "marketing",
    resource: "send-sms",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "marketing",
    resource: "gift-cards",
    actions: ["read", "write", "update", "delete"],
  },
  // REPORTS
  {
    section: "reports",
    resource: "report-products",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "reports",
    resource: "vendors",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "reports",
    resource: "report-customers",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "reports",
    resource: "finances",
    actions: ["read", "write", "update", "delete"],
  },
  // MANAGEMENT
  {
    section: "management",
    resource: "workers",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "management",
    resource: "roles",
    actions: ["read", "write", "update", "delete"],
  },
  // SETTINGS
  {
    section: "settings",
    resource: "profile",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "settings",
    resource: "general",
    actions: ["read", "write", "update", "delete"],
  },
  {
    section: "settings",
    resource: "stores",
    actions: ["read", "write", "update", "delete"],
  },
];

export const actionLabels: Record<string, string> = {
  read: "View and retrieve data",
  write: "Create or add new entries",
  update: "Modify or edit existing data",
  delete: "Remove existing data permanently",
};
