import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select";
  import { Clock } from "lucide-react";
  import { memo, useMemo } from "react";
  
  type TimePickerProps = {
	value: string; // Time in format "HH:MM"
	onChange: (time: string) => void;
  };
  
  export const TimePicker = memo(({ value, onChange }: TimePickerProps) => {
	// Parse the input time string
	const [hoursStr, minutesStr] = value.split(":");
	const currentHour = hoursStr || "00";
	const currentMinute = minutesStr || "00";
  
	// Generate arrays for hours and minutes options
	const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")), []);
	const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")), []);
  
	const handleHourChange = (val: string) => {
	  onChange(`${val}:${currentMinute}`);
	};
  
	const handleMinuteChange = (val: string) => {
	  onChange(`${currentHour}:${val}`);
	};
  
	return (
	  <div className="flex items-center space-x-2">
		<Clock className="h-4 w-4 text-gray-500" />
		
		<Select value={currentHour} onValueChange={handleHourChange}>
		  <SelectTrigger className="w-25">
			<SelectValue placeholder="HH" />
		  </SelectTrigger>
		  <SelectContent className="h-[200px]">
			{hours.map((hour) => (
			  <SelectItem key={hour} value={hour}>
				{hour}
			  </SelectItem>
			))}
		  </SelectContent>
		</Select>
		
		<span className="text-lg">:</span>
		
		<Select value={currentMinute} onValueChange={handleMinuteChange}>
		  <SelectTrigger className="w-25">
			<SelectValue placeholder="MM" />
		  </SelectTrigger>
		  <SelectContent>
			{minutes.map((minute) => (
			  <SelectItem key={minute} value={minute}>
				{minute}
			  </SelectItem>
			))}
		  </SelectContent>
		</Select>
	  </div>
	);
  });