"use client";
import {
	AllCommunityModule,
	ModuleRegistry,
	type SizeColumnsToFitGridStrategy,
	themeQuartz,
} from "ag-grid-community";
import type {
	ILoadingOverlayComp,
	ILoadingOverlayParams,
} from "ag-grid-community";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkersCache } from "@/services/main/workers";
import { useTableStore } from "@/stores/main/workers";
import { AgGridReact } from "ag-grid-react";
import debounce from "lodash/debounce";
import {
	Archive,
	ChevronDown,
	NotepadTextDashedIcon,
	Pen,
	Star,
	Trash2Icon,
	X,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useDataTableFeatures } from "./features";

ModuleRegistry.registerModules([AllCommunityModule]);

const TableView = memo(() => {
	const { columnDefs } = useDataTableFeatures();
	const { resolvedTheme } = useTheme();
	const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
	const gridRef = useRef<any | null>(null);
	const {
		workers: { data: workers },
	} = useWorkersCache();

	const { isCompactTable } = useTableStore();

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
				rowData={workers?.data?.workers}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				animateRows={true}
				rowHeight={isCompactTable ? 35 : 50}
				headerHeight={isCompactTable ? 35 : 50}
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
				suppressRowClickSelection={true}
				onSelectionChanged={(e) => {
					setSelectedNodes(e.selectedNodes ?? []);
				}}
				onGridReady={onGridReady}
				onBodyScroll={handleGridScroll}
				loadingOverlayComponent={CustomLoadingOverlay}
				loadingCellRenderer={CustomLoadingOverlay}
				noRowsOverlayComponent={NoDataOverlay}
			/>
			{Boolean(selectedNodes.length) && (
				<div className="absolute bottom-15 shadow-xl left-1/2 transform -translate-x-1/2 max-w-[695px] w-full h-12 border rounded-xl flex items-center px-4 bg-white dark:bg-[#1C1D21] gap-2">
					<div className="flex gap-2 items-center">
						<Badge color="blue" className="ml-auto rounded-sm  size-5">
							{selectedNodes.length}
						</Badge>
						<h3 className="text-sm">selected</h3>
					</div>
					<Button size="sm" variant="outline">
						<Star />
						Add to favorites
					</Button>
					<Button
						size="sm"
						variant="outline"
						disabled={selectedNodes?.length > 1}
					>
						<Pen />
						Edit worker(s)
					</Button>
					<Button size="sm" variant="outline">
						<Archive />
						Archive worker(s)
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="sm" variant="outline">
								<ChevronDown />
								More
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem variant="destructive">
								<Trash2Icon /> Delete worker(s)
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						onClick={() => gridRef.current?.api?.deselectAll()}
						size="sm"
						variant="ghost"
					>
						<X />
					</Button>
				</div>
			)}
		</div>
	);
});

export default TableView;

type CustomLoadingOverlayParams = ILoadingOverlayParams & {
	loadingMessage: string;
};

export class CustomLoadingOverlay implements ILoadingOverlayComp {
	eGui!: HTMLElement;

	init(params: CustomLoadingOverlayParams) {
		this.eGui = document.createElement("div");
		this.refresh(params);
	}

	getGui() {
		return this.eGui;
	}

	refresh(params: CustomLoadingOverlayParams): void {
		this.eGui.innerHTML = `<div class="ag-overlay-loading-center text-primary" role="presentation">
        <div role="presentation" style="height:100px; width:100px; background: url(https://www.ag-grid.com/images/ag-grid-loading-spinner.svg) center / contain no-repeat; margin: 0 auto;"></div>
        <div aria-live="polite" aria-atomic="true">One moment please</div>
     </div>`;
	}
}

const NoDataOverlay = memo(() => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "1.1rem",
				color: "#777",
			}}
		>
			<NotepadTextDashedIcon />
			<div className="mt-2">No Data Available</div>
		</div>
	);
});
