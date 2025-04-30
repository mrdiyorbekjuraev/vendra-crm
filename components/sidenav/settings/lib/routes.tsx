import type { MenuLinkProps } from "@/types/main/sidebar";
import {
	Banknote,
	Bell,
	Building,
	Building2,
	CreditCard,
	Diamond,
	DollarSign,
	HelpCircle,
	Link2,
	Lock,
	Menu,
	Monitor,
	PackageSearch,
	ReceiptText,
	SquareTerminal,
	Store,
	User,
	Users,
} from "lucide-react";
import { v4 } from "uuid";

export const SettingRoutes = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},

	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
					icon: Menu,
					shortcut: ["G", "N"],
				},
				{
					title: "Starred",
					url: "#",
					icon: Menu,
					shortcut: ["G", "N"],
				},
				{
					title: "Settings",
					url: "#",
					icon: Menu,
					shortcut: ["G", "N"],
				},
			],
		},
	],
};

export const settingsLinks: { [key: string]: MenuLinkProps[] } = {
	Account: [
		{
			id: v4(),
			icon: (
				<User className="h-4 w-4 text-zinc-500" size={16} strokeWidth={1.5} />
			),
			title: "Profile",
			pathname: "/settings/account",
		},
		{
			id: v4(),
			icon: (
				<Monitor
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Appearance",
			pathname: "/settings/appearance",
		},
	],
	"Store Workplace": [
		{
			id: v4(),
			icon: (
				<Store size={16} strokeWidth={1.5} className="h-4 w-4  text-zinc-500" />
			),
			title: "General",
			pathname: "/settings/general",
		},

		{
			id: v4(),
			icon: (
				<Building2
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Stores",
			pathname: "/settings/stores",
		},
		{
			id: v4(),
			icon: (
				<PackageSearch
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Products",
			pathname: "/settings/products",
		},

		{
			id: v4(),
			icon: (
				<Banknote
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Cash registers",
			pathname: "/settings/cash-registers",
		},
		{
			id: v4(),
			icon: (
				<ReceiptText
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Receipts",
			pathname: "/settings/receipts",
		},
		{
			id: v4(),
			icon: (
				<DollarSign
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Currencies",
			pathname: "/settings/currencies",
		},
	],

	"People management": [
		{
			id: v4(),
			icon: (
				<Users className="h-4 w-4  text-zinc-500" size={16} strokeWidth={1.5} />
			),
			title: "Workers",
			pathname: "/settings/workers",
		},
		{
			id: v4(),
			icon: (
				<Users className="h-4 w-4  text-zinc-500" size={16} strokeWidth={1.5} />
			),
			title: "Roles",
			pathname: "/settings/roles",
		},
	],
	Support: [
		{
			id: v4(),
			icon: (
				<HelpCircle
					className="h-4 w-4 text-zinc-500"
					size={16}
					strokeWidth={1.5}
				/>
			),
			title: "Support requests",
			pathname: "/settings/support",
		},
	],
};
