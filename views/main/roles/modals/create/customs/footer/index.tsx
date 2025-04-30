import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { useRoleModal } from "@/stores/main/roles";
import { CornerDownLeft } from "lucide-react";

const Footer = () => {
	return (
		<DialogFooter className="overflow-visible py-2 px-4 h-10 border-t flex items-center justify-center">
			<div className="w-full flex items-center justify-between">
				<div className="mr-auto" />
				<div className="flex items-center gap-4">
					<Button size="sm" variant="outline" onClick={close}>
						<span>Cancel</span>
						<Kbd>ESC</Kbd>
					</Button>
					<Button
						type="submit"
						size="sm"
						className="bg-[#266DF0] hover:bg-[#1C62E3] text-white"
					>
						<span>"Create role"</span>
						<CornerDownLeft />
					</Button>
				</div>
			</div>
		</DialogFooter>
	);
};

export default Footer;
