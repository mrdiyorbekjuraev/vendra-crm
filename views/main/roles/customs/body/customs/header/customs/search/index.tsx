import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";
import { Info, Search, X } from "lucide-react";
import { useQueryState } from "nuqs";
import {
	type ChangeEvent,
	type FocusEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

interface ISearchBarProps {
	placeholder?: string;
	onSearch?: (value: string) => void;
	className?: string;
}

const SearchBar = ({ placeholder = "Search..." }: ISearchBarProps) => {
	const [search, setSearch] = useQueryState("search", { defaultValue: "" });

	const [isActive, setIsActive] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFocus = (): void => {
		setIsActive(true);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
		// Only set to inactive if there's no value
		if (!e.target.value) {
			setIsActive(false);
		}
	};

	const handleClear = (): void => {
		if (inputRef.current) {
			inputRef.current.value = "";
			inputRef.current.focus();
			setSearch("");
		}
	};

	// Wrap the setSearch with debounce
	const debouncedSetSearch = useCallback(
		debounce((value: string) => {
			setSearch(value);
		}, 300), // 300ms delay
		[setSearch],
	);

	// Clean up debounce on unmount (important for memory)
	useEffect(() => {
		return () => {
			debouncedSetSearch.cancel();
		};
	}, [debouncedSetSearch]);

	return (
		<div
			className={`
        relative
        ${isActive ? "w-94" : " w-10"}
        transition-all duration-300 ease-in-out
      `}
		>
			<Input
				className={cn(isActive ? "pr-14 pl-9" : "pl-7")}
				ref={inputRef}
				type="text"
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={(e) => debouncedSetSearch(e.target.value)}
			/>
			<Search
				size={25}
				strokeWidth={1.5}
				className="absolute left-2 top-1.5 text-zinc-500 cursor-pointer hover:bg-muted-foreground/10 rounded-sm p-1"
				onClick={() => {
					setIsActive(true);
					if (inputRef) {
						inputRef?.current?.focus();
					}
				}}
			/>
			{isActive && (
				<div className="absolute right-8 top-1.5">
					<Tooltip>
						<TooltipTrigger>
							<Info
								size={25}
								strokeWidth={1.5}
								className=" text-zinc-500 cursor-pointer hover:bg-muted-foreground/10 rounded-sm p-1"
							/>
						</TooltipTrigger>
						<TooltipContent side="bottom" className="mt-2">
							You can search roles based on their name.
						</TooltipContent>
					</Tooltip>
				</div>
			)}
			{isActive && (
				<X
					size={25}
					strokeWidth={1.5}
					className="absolute right-2 top-1.5 text-zinc-500 cursor-pointer hover:bg-muted-foreground/10 rounded-sm p-1"
					onClick={handleClear}
				/>
			)}
		</div>
	);
};

export default SearchBar;
