import { useRolesCache } from "@/services/main/roles";
import type { ColDef } from "ag-grid-community";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
	CreatedAtRenderer,
	CreatorRenderer,
	DescriptionRenderer,
	FullName,
	LoadingRenderer,
	RoleIdRenderer,
	StatusRenderer,
} from "./customs/cells";
import {
	CustomHeaderRenderer,
	FullNameHeaderRenderer,
} from "./customs/headers";

type TDataTableFeatures = {
	columnDefs: ColDef[];
};

export const useDataTableFeatures = (): TDataTableFeatures => {
	const { push } = useRouter();
	const {
		roles: { isLoading },
	} = useRolesCache();
	const columnDefs = useMemo<ColDef[]>(
		() => [
			{
				field: "name",
				headerName: "Role Name",
				minWidth: 200,
				pinned: "left",
				headerCheckboxSelection: true,
				checkboxSelection: true,
				suppressMovable: true,
				lockPosition: "left",
				cellRenderer: isLoading ? LoadingRenderer : FullName,
				headerComponent: FullNameHeaderRenderer,
				onCellClicked: (props) => {
					push(`/management/roles/${props?.data?.id}`);
				},
			},
			{
				field: "id",
				headerName: "Role ID",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
				cellClass: "bg-[#9F5EDE]/5 pr-0",
				cellRenderer: isLoading ? LoadingRenderer : RoleIdRenderer,
			},
			{
				field: "description",
				headerName: "Description",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
				cellClass: "bg-[#9F5EDE]/5 pr-0",
				cellRenderer: isLoading ? LoadingRenderer : DescriptionRenderer,
			},
			{
				field: "status",
				headerName: "Status",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
				cellClass: "bg-[#9F5EDE]/5",
				cellRenderer: isLoading ? LoadingRenderer : StatusRenderer,
			},
			{
				field: "creator",
				headerName: "Creator",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
				cellClass: "bg-[#9F5EDE]/5",
				cellRenderer: isLoading ? LoadingRenderer : CreatorRenderer,
			},
			{
				field: "createdAt",
				headerName: "Created At",
				minWidth: 280,
				flex: 1,
				suppressSizeToFit: true,
				lockPosition: "right",
				cellRenderer: isLoading ? LoadingRenderer : CreatedAtRenderer,
				headerComponent: CustomHeaderRenderer,
				cellClass: "bg-[#9F5EDE]/5 pr-0",
			},
		],
		[push, isLoading],
	);
	return {
		columnDefs,
	};
};
