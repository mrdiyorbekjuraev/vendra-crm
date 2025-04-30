import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Calendar, CheckCircle2, Download, FileText } from "lucide-react";
const exports = [
	{ id: 1, type: "CSV Export", date: "Apr 4, 2025", status: "Completed" },
	{ id: 2, type: "CSV Export", date: "Apr 4, 2025", status: "Completed" },
];

const ExportCVTable = () => {
	return (
		<div className="w-full max-w-4xl mt-5">
			<div className="flex justify-between items-start mb-2">
				<div>
					<h2 className="text-lg font-semibold">Export Workspace data</h2>
					<p className="text-xs text-muted-foreground">
						Exports are in CSV format and can be downloaded within 7 days
					</p>
				</div>
				<Button className="flex items-center gap-2" variant="outline">
					<Download className="h-4 w-4" />
					Start new export
				</Button>
			</div>

			<Table className="border mt-4">
				<TableHeader>
					<TableRow className="rounded-md">
						<TableHead className="w-[200px]">
							<div className="flex items-center gap-2 text-muted-foreground">
								<FileText className="h-4 w-4 text-zinc-500" />
								Type
							</div>
						</TableHead>
						<TableHead>
							<div className="flex items-center gap-2 text-muted-foreground">
								<Calendar className="h-4 w-4 text-zinc-500" />
								Date
							</div>
						</TableHead>
						<TableHead className="text-right">Status</TableHead>
						<TableHead className="w-[50px]" />
					</TableRow>
				</TableHeader>
				<TableBody>
					{exports.map((exportItem) => (
						<TableRow key={exportItem.id}>
							<TableCell className="font-medium">{exportItem.type}</TableCell>
							<TableCell>{exportItem.date}</TableCell>
							<TableCell className="text-right">
								<div className="flex items-center justify-end gap-2">
									{exportItem.status}
									{exportItem.status === "Completed" && (
										<CheckCircle2 className="h-5 w-5 text-green-500" />
									)}
								</div>
							</TableCell>
							<TableCell>
								<Button variant="ghost" size="icon">
									<Download className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ExportCVTable;
