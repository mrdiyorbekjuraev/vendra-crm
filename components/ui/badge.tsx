import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
			color: {
				gray: "bg-gray-50 text-gray-600 ring-1 ring-gray-500/10 ring-inset dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700/50",
				red: "bg-red-50 text-red-700 ring-1 ring-red-600/10 ring-inset dark:bg-red-900 dark:text-red-300 dark:ring-red-800/40",
				yellow:
					"bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 ring-inset dark:bg-yellow-900 dark:text-yellow-300 dark:ring-yellow-700/40",
				green:
					"bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset dark:bg-green-900 dark:text-green-300 dark:ring-green-700/40",
				blue: "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900 dark:text-blue-300 dark:ring-blue-700/40",
				indigo:
					"bg-indigo-50 text-indigo-700 ring-1 ring-indigo-700/10 ring-inset dark:bg-indigo-900 dark:text-indigo-300 dark:ring-indigo-700/40",
				purple:
					"bg-purple-50 text-purple-700 ring-1 ring-purple-700/10 ring-inset dark:bg-purple-900 dark:text-purple-300 dark:ring-purple-700/40",
				pink: "bg-pink-50 text-pink-700 ring-1 ring-pink-700/10 ring-inset dark:bg-pink-900 dark:text-pink-300 dark:ring-pink-700/40",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	color,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant, color }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
