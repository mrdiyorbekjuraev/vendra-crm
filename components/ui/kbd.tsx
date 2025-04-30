import { cn } from "@/lib/utils";
import type React from "react";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
}

export function Kbd({ children, className, ...props }: KbdProps) {
	return (
		<kbd
			className={cn(
				"pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
				className,
			)}
			{...props}
		>
			{children}
		</kbd>
	);
}
