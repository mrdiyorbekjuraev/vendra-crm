"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRolesCache } from "@/services/main/roles";
import { useRoleModal } from "@/stores/main/roles";
import {
	AllCommunityModule,
	ModuleRegistry,
	type SizeColumnsToFitGridStrategy,
	themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import debounce from "lodash/debounce";
import {
	Archive,
	ChevronDown,
	MailPlus,
	Pen,
	Star,
	Trash2Icon,
	Workflow,
	X,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDataTableFeatures } from "./features";

ModuleRegistry.registerModules([AllCommunityModule]);

const Loading = () => {
	const { columnDefs } = useDataTableFeatures();
	const { resolvedTheme } = useTheme();
	const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
	const { setModal } = useRoleModal();
	const gridRef = useRef<any | null>(null);
	console.log(selectedNodes[0]?.data);

	// Create a theme appropriate for the current mode
	const myTheme = useMemo(() => {
		return themeQuartz.withParams({
			browserColorScheme: resolvedTheme === "dark" ? "dark" : "light",
			columnBorder: true,
			headerColumnBorder: true,
			wrapperBorder: false,
			headerFontSize: 14,
			wrapperBorderRadius: "0",
			headerBackgroundColor: resolvedTheme === "dark" ? "#1b1d21" : "#fff",
			headerTextColor: resolvedTheme === "dark" ? "#FFF" : "rgb(35, 37, 41)",
			borderColor: resolvedTheme === "dark" ? "rgb(49, 51, 55)" : "#ecebeb",
			cellTextColor: resolvedTheme === "dark" ? "#FFF" : "rgb(35, 37, 41)",
			backgroundColor: resolvedTheme === "dark" ? "#1b1d21" : "#fff",
			fontFamily: "Inter",
			headerColumnResizeHandleColor: "",
			headerColumnResizeHandleHeight: "38px",
			headerColumnResizeHandleWidth: "1px",
			rowHoverColor: "",
			headerCellHoverBackgroundColor:
				resolvedTheme === "dark" ? "oklch(0.2 0 0)" : "oklch(0.985 0 0)",
		});
	}, [resolvedTheme]);

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			resizable: true,
			filter: true,
		}),
		[],
	);

	const autoSizeStrategy = useMemo<SizeColumnsToFitGridStrategy>(
		() => ({
			type: "fitGridWidth",
		}),
		[],
	);

	const onRowClicked = useCallback((event: any) => {
		// if (!event.event.target.closest(".ag-checkbox-input")) {
		// 	const node = event.node;
		// 	node.setSelected(!node.isSelected());
		// }
		event.event?.stopPropagation();
	}, []);

	const SCROLL_THRESHOLD = 5;
	const pinnedElements = useRef<{
		header: Element | null;
		container: Element | null;
	}>({ header: null, container: null });

	const onGridReady = useCallback(() => {
		// Small timeout to ensure DOM is fully updated
		setTimeout(() => {
			pinnedElements.current = {
				header: document.querySelector(".ag-pinned-left-header"),
				container: document.querySelector(".ag-pinned-left-cols-container"),
			};
		}, 100);
	}, []);

	// Debounced scroll handler
	const debouncedScroll = useCallback(
		debounce((isScrolled: boolean) => {
			const { header, container } = pinnedElements.current;
			const method = isScrolled ? "add" : "remove";

			console.log(pinnedElements);

			for (const element of [header, container]) {
				element?.classList[method]("is-scrolled");
			}
		}, 10),
		[],
	);

	const handleGridScroll = useCallback(
		(event: { left: number }) => {
			debouncedScroll(event.left > SCROLL_THRESHOLD);
		},
		[debouncedScroll],
	);

	return (
		<div className="ag-theme-alpine border-b border-t h-[calc(100%-205px)]">
			<AgGridReact
				rowData={Array.from({ length: 10 })}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				animateRows={true}
				rowHeight={35}
				headerHeight={35}
				suppressMovableColumns={false}
				suppressCellFocus={false}
				enableCellTextSelection={true}
				suppressRowTransform={false}
				alwaysShowHorizontalScroll={true}
				alwaysShowVerticalScroll={true}
				suppressScrollOnNewData={true}
				autoSizeStrategy={autoSizeStrategy}
				singleClickEdit={true}
				detailRowAutoHeight
				rowSelection="multiple"
				cellFadeDuration={100}
				scrollbarWidth={3}
				theme={myTheme}
				onRowClicked={onRowClicked}
				rowClass="cursor-pointer"
				ref={gridRef}
				suppressRowClickSelection={true}
				onSelectionChanged={(e) => {
					setSelectedNodes(e.selectedNodes ?? []);
				}}
				onGridReady={onGridReady}
				onBodyScroll={handleGridScroll}
				pagination={false}
			/>
		</div>
	);
};

export default Loading;
