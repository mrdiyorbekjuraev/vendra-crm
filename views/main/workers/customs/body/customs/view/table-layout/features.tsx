import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
	BirthDateRenderer,
	FullName,
	RoleNameRenderer,
	StatusRenderer,
	StoreNameRenderer,
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

	const columnDefs = useMemo<ColDef[]>(
		() => [
			{
				field: "user",
				headerName: "Full Name",
				minWidth: 200,
				pinned: "left",
				headerCheckboxSelection: true,
				checkboxSelection: true,
				suppressMovable: true,
				lockPosition: "left",
				cellRenderer: FullName,
				headerComponent: FullNameHeaderRenderer,
				onCellClicked: () => push("/management/workers/1"),
			},
			{
				field: "code",
				headerName: "Employee ID",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "workerRoles",
				headerName: "Role",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
				cellRenderer: RoleNameRenderer,
			},
			{
				field: "user.phoneNumber",
				headerName: "Phone number",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "description",
				headerName: "Description",
				minWidth: 150,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "user.address",
				headerName: "Location",
				minWidth: 200,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "user.birthDate",
				headerName: "Birthday",
				minWidth: 200,
				headerComponent: CustomHeaderRenderer,
				cellRenderer: BirthDateRenderer,
			},
			{
				field: "user.gender",
				headerName: "Gender",
				minWidth: 200,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "user.startTime",
				headerName: "Start time",
				minWidth: 200,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "user.endTime",
				headerName: "End time",
				minWidth: 200,
				headerComponent: CustomHeaderRenderer,
			},
			// {
			//   field: "password",
			//   headerName: "Password",
			//   minWidth: 200,
			//   headerComponent: CustomHeaderRenderer,
			// },
			{
				field: "status",
				headerName: "Status",
				minWidth: 150,
				cellRenderer: StatusRenderer,
				headerComponent: CustomHeaderRenderer,
			},
			{
				field: "workerRoles",
				headerName: "Branches",
				flex: 1,
				minWidth: 150,
				suppressSizeToFit: true,
				headerComponent: CustomHeaderRenderer,
				cellRenderer: StoreNameRenderer,
				lockPosition: "right",
			},
		],
		[push],
	);
	return {
		columnDefs,
	};
};
