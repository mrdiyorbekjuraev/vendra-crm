import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { Input } from "../input";
import { Eye, EyeClosed } from "lucide-react";
import { TooltipWrapper } from "../tooltip";
import { Button } from "../button";

export interface MainInputProps extends ComponentPropsWithoutRef<"input"> {
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

const MainInput = forwardRef<HTMLInputElement, MainInputProps>(
  (
    {
      classNames,
      isInvalid,
      errorMessage,
      label,
      helperText,
      id,
      disabled,
      type,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    // Generate an id if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div
        className={cn(
          "w-full space-y-1.5 relative text-start",
          classNames?.wrapper
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium block",
              disabled && "text-muted-foreground opacity-70",
              isInvalid && "text-red-500"
            )}
          >
            {label}
          </label>
        )}

        <Input
          {...props}
          type={show ? "password" : "text"}
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            isInvalid && "border-red-500 focus-visible:ring-red-500",
            disabled && "opacity-70",
            classNames?.input
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
        {type === "password" && (
          <TooltipWrapper content={show ? "Hide password" : "Show password"}>
            <Button
              type="button"
              className="absolute size-5 rounded-sm right-2.5 top-4.5 -translate-y-1/2 text-zinc-500"
              variant={"ghost"}
              size="icon"
              withAnimation={false}
              onClick={() => setShow(!show)}
            >
              {show ? <Eye /> : <EyeClosed />}
            </Button>
          </TooltipWrapper>
        )}

        {isInvalid && errorMessage && (
          <div className={cn("min-h-6 relative")}>
            <AnimatePresence mode="wait">
              {isInvalid && errorMessage && (
                <motion.p
                  id={errorId}
                  key="error"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "text-red-500 text-sm text-start",
                    classNames?.errorMessage
                  )}
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

MainInput.displayName = "MainInput";

export default MainInput;
