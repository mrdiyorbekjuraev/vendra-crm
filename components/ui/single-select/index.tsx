"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Variants for the single-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const singleSelectVariants = cva("transition ease-in-out delay-150", {
  variants: {
    variant: {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Props for SingleSelect component
 */
interface SingleSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof singleSelectVariants> {
  /**
   * An array of option objects to be displayed in the single-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected value changes.
   * Receives the new selected value.
   */
  onValueChange: (value: string | null) => void;

  /** The default selected value when the component mounts. */
  defaultValue?: string;

  /**
   * Placeholder text to be displayed when no value is selected.
   * Optional, defaults to "Select an option".
   */
  placeholder?: string;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the single-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the single-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
}

export const SingleSelect = React.forwardRef<
  HTMLButtonElement,
  SingleSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue,
      placeholder = "Select an option",
      modalPopover = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<string | null>(
      defaultValue || null
    );
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      }
    };

    const selectOption = (option: string) => {
      // If the same option is selected, deselect it
      const newValue = selectedValue === option ? null : option;
      setSelectedValue(newValue);
      onValueChange(newValue);
      setIsPopoverOpen(false);
    };

    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      setSelectedValue(null);
      onValueChange(null);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const selectedOption = options.find(
      (option) => option?.value === selectedValue
    );
    const IconComponent = selectedOption?.icon;


    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
              className
            )}
            withAnimation={false}
          >
            {selectedValue ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center px-3 py-1">
                  {IconComponent && <IconComponent className="h-4 w-4 mr-2 text-primary" />}
                  <span className={cn(singleSelectVariants({ variant }))}>
                    {selectedOption?.label}
                  </span>
                </div>
                <div className="flex items-center">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={handleClear}
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValue === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => selectOption(option.value)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon
                          className="h-3 w-3 text-white p-0.5"
                          size={15}
                        />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  className="flex-1 justify-center cursor-pointer"
                >
                  Close
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

SingleSelect.displayName = "SingleSelect";
