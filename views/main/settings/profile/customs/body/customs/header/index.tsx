import { Alert, AlertDescription } from "@/components/ui/alert";
import { Typography } from "@/components/ui/typography";
import { AlertCircle } from "lucide-react";

const Header = () => {
	return (
		<div className="flex flex-col">
			<Typography variant="h4" size="lg" className="text-[24px] font-bold">
				Profile
			</Typography>
			<Typography variant="p-small" type="muted">
				Manage your personal details
			</Typography>
			<Alert className="mt-3" variant="layer_1">
				<AlertCircle className="h-4 w-4 text-zinc-500" color="gray" />
				<AlertDescription>
					Changes to your profile will apply to all of your stores.
				</AlertDescription>
			</Alert>
		</div>
	);
};

export default Header;
