import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverItem,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouterQuery } from "@/hooks/useRouterQuery";
import { useTableStore, useWorkersModal } from "@/stores/main/workers";
import {
	BetweenVerticalEnd,
	Grid2x2,
	Settings2,
	Star,
	TableOfContents,
	UserPlus,
} from "lucide-react";
import Search from "./customs/search";
import Sort from "./customs/sort";

const Header = () => {
	const { getParam, setParams } = useRouterQuery();
	const { setModal } = useWorkersModal();
	const { setTable, isFavoritesVisible, isCompactTable } = useTableStore();
	return (
		<div className="flex-1 overflow-auto flex flex-col h-[49px]">
			<div className="h-[49px] border-b  px-4 pl-3.5 flex justify-between items-center">
				<div className="flex items-center gap-2 text-xs h-7 w-full mt-1">
					<Sort />
				</div>
				<div className="flex items-center gap-2 mt-1">
					<Search />
					<Separator orientation="vertical" />
					<Tabs defaultValue="table" value={getParam("view") ?? "table"}>
						<TabsList>
							<TabsTrigger
								value="table"
								onClick={() => setParams({ view: "table" })}
								className="cursor-pointer"
							>
								<TableOfContents size={16} strokeWidth={1.5} />
							</TabsTrigger>
							<TabsTrigger
								value="card"
								onClick={() => setParams({ view: "card" })}
								className="cursor-pointer"
							>
								<Grid2x2 size={16} strokeWidth={1.5} />
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<Popover>
						<PopoverTrigger asChild>
							<Button size="sm" withAnimation={false} variant={"outline"}>
								<Settings2 size={16} strokeWidth={1.5} />
								View Settings
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-1 w-[250px]" align="end">
							<PopoverItem
								className="flex items-center justify-between py-2"
								onClick={() =>
									setTable({ isFavoritesVisible: !isFavoritesVisible })
								}
							>
								<Label>
									<Star size={16} strokeWidth={1.5} />
									Show favorites
								</Label>
								<Switch checked={isFavoritesVisible} />
							</PopoverItem>
							<PopoverItem
								className="flex items-center justify-between py-2 cursor-pointer"
								onClick={() => setTable({ isCompactTable: !isCompactTable })}
							>
								<Label htmlFor="compact-table">
									<BetweenVerticalEnd size={16} strokeWidth={1.5} />
									Compact Table
								</Label>
								<Switch id="compact-table" checked={isCompactTable} />
							</PopoverItem>
						</PopoverContent>
					</Popover>
					<Button size="sm" onClick={() => setModal({ createWorker: true })}>
						<UserPlus size={16} strokeWidth={1.5} />
						<span className="font-medium">Add Worker</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
