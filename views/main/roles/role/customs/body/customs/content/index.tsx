"use client";

import { Button } from "@/components/ui/button";
import { PopoverItem } from "@/components/ui/popover";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { cn } from "@/lib/utils";
import { mockPermissions } from "@/mock/roles/index.data";
import { useRoleCache } from "@/services/main/roles/role";
import { usePermissionStore } from "@/stores/main/roles";
import {
	BadgeDollarSign,
	BriefcaseBusiness,
	ChartPie,
	List,
	PackageSearch,
	SettingsIcon,
	SquareActivity,
	Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

const Products = dynamic(
	() => import("./customs/permissions-sections/products"),
);
const Sales = dynamic(() => import("./customs/permissions-sections/sales"));
const Customers = dynamic(
	() => import("./customs/permissions-sections/customers"),
);
const Marketing = dynamic(
	() => import("./customs/permissions-sections/marketing"),
);
const Reports = dynamic(() => import("./customs/permissions-sections/reports"));
const Management = dynamic(
	() => import("./customs/permissions-sections/management"),
);
const Settings = dynamic(
	() => import("./customs/permissions-sections/settings"),
);

const tabs = [
	{ id: "products", label: "Products", icon: <PackageSearch /> },
	{ id: "sales", label: "Sales", icon: <BadgeDollarSign /> },
	{ id: "customers", label: "Customers", icon: <Users /> },
	{ id: "marketing", label: "Marketing", icon: <SquareActivity /> },
	{ id: "reports", label: "Reports", icon: <ChartPie /> },
	{ id: "management", label: "Management", icon: <BriefcaseBusiness /> },
	{ id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

const Content = () => {
	const { getParam, setParams } = useRouterQuery();
	const tab = getParam("tab") || "all";

	const renderedContent = useMemo(() => {
		switch (tab) {
			case "products":
				return <Products />;
			case "sales":
				return <Sales />;
			case "customers":
				return <Customers />;
			case "marketing":
				return <Marketing />;
			case "reports":
				return <Reports />;
			case "management":
				return <Management />;
			case "settings":
				return <Settings />;
			default:
				return (
					<>
						<Products />
						<Separator className="my-4" />
						<Sales />
						<Separator className="my-4" />
						<Customers />
						<Separator className="my-4" />
						<Marketing />
						<Separator className="my-4" />
						<Reports />
						<Separator className="my-4" />
						<Management />
						<Separator className="my-4" />
						<Settings />
					</>
				);
		}
	}, [tab]);

	const { setPermissions } = usePermissionStore();

	const {
		role: { data: role, isLoading, refetch },
	} = useRoleCache();

	useEffect(() => {
		setPermissions(mockPermissions);
	}, [setPermissions]);

	return (
		<div>
			<ResizablePanelGroup direction="horizontal" className="w-full h-full">
				<ResizablePanel defaultSize={85} className="h-full">
					<div className="h-[calc(100vh-165px)] p-4 overflow-y-auto">
						<div className="w-full mx-auto py-2">
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-2xl font-bold">Permissions</h2>
							</div>
							{renderedContent}
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={15} maxSize={25} minSize={15}>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel defaultSize={75}>
							<div className="p-4">Categories</div>
							<div className="flex flex-col gap-2 items-center w-full px-4">
								<PopoverItem
									onClick={() => setParams({ tab: "all" })}
									className={cn(
										tab === "all" && "dark:bg-[#313337] bg-zinc-100",
									)}
								>
									<div className="flex items-center gap-1">
										<List />
										<span>All Categories</span>
									</div>
								</PopoverItem>
								<Separator />
								{tabs.map(({ id, label, icon }) => (
									<PopoverItem
										key={id}
										onClick={() => setParams({ tab: id })}
										className={cn(
											id === tab && "dark:bg-[#313337] bg-zinc-100",
										)}
									>
										<div className="flex items-center gap-1">
											{icon}
											<span>{label}</span>
										</div>
									</PopoverItem>
								))}
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default Content;
