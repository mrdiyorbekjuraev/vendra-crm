import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { setHours, setMinutes } from "date-fns";
import { Clock } from "lucide-react";
// TimePicker.tsx
import { memo, useMemo } from "react";

type TimePickerProps = {
	value: Date;
	onChange: (date: Date) => void;
	language?: "uz" | "ru" | "en";
};

export const TimePicker = memo(
	({ value, onChange, language = "en" }: TimePickerProps) => {
		const is24HourFormat = useMemo(
			() => language === "uz" || language === "ru",
			[language],
		);

		const hours = useMemo(() => {
			if (is24HourFormat) {
				return Array.from({ length: 24 }, (_, i) => i);
			}
			return Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
		}, [is24HourFormat]);

		const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

		const getDisplayedHour = (hour: number) => {
			if (is24HourFormat) return hour;
			const h = hour % 12;
			return h === 0 ? 12 : h;
		};

		const getAmPm = (hour: number) => (hour >= 12 ? "PM" : "AM");

		const handleHourChange = (value: any) => {
			let selectedHour = Number.parseInt(value, 10);
			if (!is24HourFormat) {
				const isPM =
					getAmPm(value instanceof Date ? value.getHours() : value) === "PM";
				if (isPM && selectedHour !== 12) selectedHour += 12;
				if (!isPM && selectedHour === 12) selectedHour = 0;
			}
			onChange(setHours(value, selectedHour));
		};

		const handleMinuteChange = (value: string) => {
			const selectedMinute = Number.parseInt(value, 10);
			onChange(setMinutes(value, selectedMinute));
		};

		return (
			<div className="flex gap-2 items-center">
				<Select
					value={getDisplayedHour(value.getHours()).toString()}
					onValueChange={(val) => {
						const newHour = Number.parseInt(val, 10);
						let adjustedHour = newHour;
						if (!is24HourFormat) {
							const currentHour = value.getHours();
							const isPM = currentHour >= 12;
							if (isPM && newHour !== 12) adjustedHour = newHour + 12;
							if (!isPM && newHour === 12) adjustedHour = 0;
						}
						onChange(setHours(value, adjustedHour));
					}}
				>
					<SelectTrigger className="w-[100px]">
						<Clock className="mr-2 h-4 w-4" />
						<SelectValue placeholder="Hour" />
					</SelectTrigger>
					<SelectContent className="h-[200px]">
						{hours.map((hour) => (
							<SelectItem key={hour} value={hour.toString()}>
								{hour.toString().padStart(2, "0")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={value.getMinutes().toString()}
					onValueChange={(val) => {
						const minute = Number.parseInt(val, 10);
						onChange(setMinutes(value, minute));
					}}
				>
					<SelectTrigger className="w-[100px]">
						<SelectValue placeholder="Minute" />
					</SelectTrigger>
					<SelectContent className="h-[200px]">
						{minutes.map((minute) => (
							<SelectItem key={minute} value={minute.toString()}>
								{minute.toString().padStart(2, "0")}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{!is24HourFormat && (
					<Select
						value={getAmPm(value.getHours())}
						onValueChange={(val) => {
							const hour = value.getHours();
							if (val === "AM" && hour >= 12) {
								onChange(setHours(value, hour - 12));
							} else if (val === "PM" && hour < 12) {
								onChange(setHours(value, hour + 12));
							}
						}}
					>
						<SelectTrigger className="w-[100px]">
							<SelectValue placeholder="AM/PM" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="AM">AM</SelectItem>
							<SelectItem value="PM">PM</SelectItem>
						</SelectContent>
					</Select>
				)}
			</div>
		);
	},
);
