import { cn } from "@/lib/utils";

// Define size options
type TypographySize = "xs" | "sm" | "md" | "lg" | "xl";

// Define type options
type TypographyType = "default" | "muted" | "primary" | "secondary";

// Define variant options
type TypographyVariant =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "p"
	| "p-large"
	| "p-small"
	| "p-muted";

// Define the component props
interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	variant?: TypographyVariant;
	size?: TypographySize;
	type?: TypographyType;
	as?: React.ElementType;
	children: React.ReactNode;
	className?: string;
}

// Define the variant styles with their types
interface VariantStyle {
	className: string;
	defaultAs: React.ElementType;
	defaultSize?: TypographySize;
	defaultType?: TypographyType;
}

// Typography component with TypeScript
const Typography: React.FC<TypographyProps> = ({
	variant = "p",
	size,
	type,
	children,
	className,
	as,
	...props
}) => {
	// Map variants to appropriate styling and default HTML elements
	const variantStyles: Record<TypographyVariant, VariantStyle> = {
		// Headings
		h1: {
			className: "font-extrabold tracking-tight",
			defaultAs: "h1",
			defaultSize: "xl",
			defaultType: "default",
		},
		h2: {
			className: "font-semibold tracking-tight",
			defaultAs: "h2",
			defaultSize: "lg",
			defaultType: "default",
		},
		h3: {
			className: "font-semibold tracking-tight",
			defaultAs: "h3",
			defaultSize: "md",
			defaultType: "default",
		},
		h4: {
			className: "font-semibold tracking-tight",
			defaultAs: "h4",
			defaultSize: "sm",
			defaultType: "primary",
		},
		h5: {
			className: "font-semibold tracking-tight",
			defaultAs: "h5",
			defaultSize: "sm",
			defaultType: "default",
		},
		h6: {
			className: "font-semibold tracking-tight",
			defaultAs: "h6",
			defaultSize: "xs",
			defaultType: "default",
		},

		// Paragraph styles
		p: {
			className: "leading-7",
			defaultAs: "p",
			defaultSize: "md",
			defaultType: "default",
		},
		"p-large": {
			className: "leading-7",
			defaultAs: "p",
			defaultSize: "lg",
			defaultType: "default",
		},
		"p-small": {
			className: "leading-6",
			defaultAs: "p",
			defaultSize: "sm",
			defaultType: "default",
		},
		"p-muted": {
			className: "leading-6",
			defaultAs: "p",
			defaultSize: "sm",
			defaultType: "muted",
		},
	};

	const {
		className: variantClassName,
		defaultAs,
		defaultSize,
		defaultType,
	} = variantStyles[variant];

	const Component = as || defaultAs;
	const activeSize = size || defaultSize || "md";
	const activeType = type || defaultType || "default";

	// Size-based classes
	const sizeClasses = {
		xs: "text-xs",
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
		xl: "text-4xl lg:text-5xl",
	};

	// Type-based classes
	const typeClasses = {
		default: "text-[#232529] dark:text-[#EEEFF1]",
		muted: "text-[#86888D]",
		primary: "text-primary",
		secondary: "text-secondary",
	};

	return (
		<Component
			className={cn(
				variantClassName,
				sizeClasses[activeSize],
				typeClasses[activeType],
				className,
			)}
			title={children}
			{...props}
		>
			{children}
		</Component>
	);
};

export { Typography };
export type {
	TypographyProps,
	TypographyVariant,
	TypographySize,
	TypographyType,
};
