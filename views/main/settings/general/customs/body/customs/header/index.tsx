import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { AlertCircle } from "lucide-react";

const Header = () => {
	return (
		<div className="flex flex-col">
			<Typography variant="h4" size="lg" className="text-[24px] font-bold">
				General
			</Typography>
			<Typography variant="p-small" type="muted">
				Change the settings for your current store workspace
			</Typography>
			<Separator className="my-4" />
		</div>
	);
};

export default Header;
