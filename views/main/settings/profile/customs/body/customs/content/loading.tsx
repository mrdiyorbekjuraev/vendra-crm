import { Skeleton } from "@/components/ui/skeleton";

import { ShieldCheck, Store, User } from "lucide-react";

const roleList = [
	{
		value: "admin",
		label: "Admin",
		icon: ShieldCheck,
	},
	{
		value: "manager",
		label: "Manager",
		icon: User,
	},
];

const shopList = [
	{
		value: "vendra",
		label: "Vendra",
		icon: Store,
	},
	{
		value: "korzinka",
		label: "Korzinka",
		icon: Store,
	},
];

type TFormValues = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	profilePhotoUrl: string;
};

const Loading = () => {
	return (
		<div>
			<div className="my-4 space-y-4">
				<div>
					<div className="flex items-center gap-4">
						<Skeleton className="size-20 rounded-full" />

						<div className="flex items-center gap-4">
							<div className="flex flex-col gap-2">
								<Skeleton className="w-20 h-4" />
								<Skeleton className="w-20 h-4" />
							</div>
							<div className="flex gap-4 mt-1">
								<Skeleton className="w-25 h-10" />

								<Skeleton className="w-10 h-10" />
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-1">
						<Skeleton className="w-1/3 h-4" />
						<Skeleton className="w-full h-8" />
					</div>
					<div className="flex flex-col gap-1">
						<Skeleton className="w-1/3 h-4" />
						<Skeleton className="w-full h-8" />
					</div>
					<div className="flex flex-col gap-1">
						<Skeleton className="w-1/3 h-4" />
						<Skeleton className="w-full h-8" />
					</div>
					<div className="flex flex-col gap-1">
						<Skeleton className="w-1/3 h-4" />
						<Skeleton className="w-full h-8" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
