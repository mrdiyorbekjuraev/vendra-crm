import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { Input } from "../input";
import { Textarea } from "../textarea";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
	classNames?: {
		wrapper?: string;
		input?: string;
		errorMessage?: string;
	};
	isInvalid?: boolean;
	errorMessage?: string;
	label?: string;
	helperText?: string;
}

const MainTextArea = forwardRef<
	React.ComponentProps<"textarea">,
	TextAreaProps
>(
	(
		{
			classNames,
			isInvalid,
			errorMessage,
			label,
			helperText,
			id,
			disabled,
			...props
		},
		ref,
	) => {
		// Generate an id if not provided
		const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
		const errorId = `${inputId}-error`;
		const helperId = `${inputId}-helper`;

		return (
			<div className={cn("w-full space-y-1.5 text-start", classNames?.wrapper)}>
				{label && (
					<label
						htmlFor={inputId}
						className={cn(
							"text-sm font-medium block",
							disabled && "text-muted-foreground opacity-70",
							isInvalid && "text-red-500",
						)}
					>
						{label}
					</label>
				)}

				<Textarea
					{...props}
					id={inputId}
					disabled={disabled}
					className={cn(
						isInvalid && "border-red-500 focus-visible:ring-red-500",
						disabled && "opacity-70",
						classNames?.input,
					)}
					aria-invalid={isInvalid}
					aria-describedby={
						isInvalid && errorMessage
							? errorId
							: helperText
								? helperId
								: undefined
					}
				/>

				{isInvalid && errorMessage && (
					<div className={cn("min-h-6 relative")}>
						<AnimatePresence mode="wait">
							{isInvalid && errorMessage ? (
								<motion.p
									id={errorId}
									key="error"
									initial={{ opacity: 0, y: -10, height: 0 }}
									animate={{ opacity: 1, y: 0, height: "auto" }}
									exit={{ opacity: 0, y: -10, height: 0 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className={cn(
										"text-red-500 text-sm text-start",
										classNames?.errorMessage,
									)}
								>
									{errorMessage}
								</motion.p>
							) : helperText ? (
								<motion.p
									id={helperId}
									key="helper"
									initial={{ opacity: 0, y: -10, height: 0 }}
									animate={{ opacity: 1, y: 0, height: "auto" }}
									exit={{ opacity: 0, y: -10, height: 0 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="text-muted-foreground text-sm"
								>
									{helperText}
								</motion.p>
							) : null}
						</AnimatePresence>
					</div>
				)}
			</div>
		);
	},
);

MainTextArea.displayName = "MainTextArea";

export default MainTextArea;
