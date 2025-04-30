"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";

import { Typography } from "@/components/ui/typography";
import {
	Armchair,
	Calendar,
	CheckCircle2,
	Download,
	FileText,
	Laptop,
	ShirtIcon,
	ShoppingBag,
	Sparkles,
	Store,
	Trash,
	Trash2,
	Upload,
	Watch,
	Wrench,
} from "lucide-react";
import ExportCVTable from "./customs/table";

const storeTypes = [
	{
		value: "clothing",
		label: "Clothing store",
		icon: ShirtIcon,
	},
	{
		value: "shoe",
		label: "Shoe store",
		icon: ShoppingBag,
	},
	{
		value: "kanselyarsky",
		label: "Kanselyarsky magazin",
		icon: Store,
	},
	{
		value: "construction",
		label: "Construction magazine",
		icon: Wrench,
	},
	{
		value: "cosmetics",
		label: "Store cosmetics",
		icon: Sparkles,
	},
	{
		value: "accessories",
		label: "Accessories store",
		icon: Watch,
	},
	{
		value: "electronics",
		label: "Store electronics",
		icon: Laptop,
	},
	{
		value: "household",
		label: "Household goods",
		icon: Armchair,
	},
];

const Content = () => {
	return (
		<div className="mt-10">
			{/* STORE LOGO UPLOAD */}
			<div className="flex items-center gap-4 ">
				<Avatar className="size-20 rounded-md">
					<AvatarImage src={""} alt="Profile picture" />
					<AvatarFallback className="bg-orange-500 text-white uppercase rounded-2xl">
						{"V"}
					</AvatarFallback>
				</Avatar>

				<div>
					<Typography variant="p" size="md" className="font-medium">
						Store logo
					</Typography>
					<Typography variant="p" size="xs" type="muted">
						We only support PNGs, JPEGs and GIFs under 10MB
					</Typography>
					<div className="flex gap-4 mt-1">
						<Button
							type="button"
							variant="default"
							className="flex items-center gap-2"
							size="sm"
						>
							<Upload size={16} aria-hidden="true" />
							<span>Upload logo</span>
						</Button>
						<Button
							type="button"
							variant="destructive"
							className="cursor-pointer"
							size="sm"
							disabled
						>
							<Trash size={16} />
						</Button>
					</div>
				</div>
			</div>
			{/* FIELDS IMPORTANT*/}
			<div className="grid grid-cols-2 gap-4 my-4">
				<div>
					<Label htmlFor="storeName" className="block text-sm mb-2">
						Store name
					</Label>
					<Input
						id="storeName"
						type="text"
						placeholder="Enter your store name..."
						required
					/>
				</div>

				<div>
					<Label htmlFor="storeSlug" className="block text-sm mb-2">
						Store slug
					</Label>
					<Input
						id="storeSlug"
						type="text"
						placeholder="Enter store slug..."
						required
					/>
				</div>

				<div>
					<div>
						<Label htmlFor="storeType" className="block text-sm mb-2">
							Store type
						</Label>
						<MultiSelect
							options={storeTypes}
							placeholder="Select store types"
							variant="inverted"
							onValueChange={() => {}}
							onChange={() => {}}
							animation={2}
							maxCount={3}
							defaultValue={["shoe"]}
						/>
					</div>
				</div>
				<div>
					<Label htmlFor="email" className="block text-sm mb-2">
						Email
					</Label>
					<Input
						id="email"
						type="email"
						placeholder="Enter company email..."
						required
					/>
				</div>
			</div>
			{/* LOCATION */}
			<Separator />
			<div className="grid grid-cols-2 gap-4 my-4">
				<div>
					<Label htmlFor="location" className="block text-sm mb-2">
						Location
					</Label>
					<Input
						id="location"
						type="text"
						placeholder="Enter your store location..."
						required
					/>
				</div>
				<div>
					<Label htmlFor="timezone" className="block text-sm mb-2">
						Timezone
					</Label>
					<Input
						id="timezone"
						type="text"
						placeholder="Enter your current timezone..."
						required
					/>
				</div>
			</div>
			<Separator />
			{/*  */}
			<div className="grid grid-cols-2 gap-4 my-4">
				<div>
					<Label htmlFor="originalStoreName" className="block text-sm mb-2">
						Original Store Name
					</Label>
					<Input
						id="originalStoreName"
						type="text"
						placeholder="Enter your store name..."
						required
					/>
				</div>
				<div>
					<Label htmlFor="originalLocation" className="block text-sm mb-2">
						Original Location
					</Label>
					<Input
						id="originalLocation"
						type="text"
						placeholder="City, street etc..."
						required
					/>
				</div>
				<div>
					<Label htmlFor="stir" className="block text-sm mb-2">
						STIR
					</Label>
					<Input
						id="stir"
						type="text"
						placeholder="Enter your STIR..."
						required
					/>
				</div>
				<div>
					<Label htmlFor="stir" className="block text-sm mb-2">
						MFO
					</Label>
					<Input
						id="stir"
						type="text"
						placeholder="Enter your MFO..."
						required
					/>
				</div>
			</div>
			<Separator />
			{/*  Export Workspace data */}
			<ExportCVTable />

			{/* Danger zone */}
			<div className="w-full mt-4">
				<h2 className="text-lg font-semibold mb-3">Danger zone</h2>
				<div className="border border-red-500 rounded-lg p-4 flex justify-between items-center">
					<div>
						<h3 className="font-medium">Delete workspace</h3>
						<p className="text-sm text-muted-foreground">
							Once deleted, your workspace cannot be recovered
						</p>
					</div>
					<Button variant="destructive" className="flex items-center gap-2">
						<Trash2 className="h-4 w-4" />
						Delete store
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Content;
