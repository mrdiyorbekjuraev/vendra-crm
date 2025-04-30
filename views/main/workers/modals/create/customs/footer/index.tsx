import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { useWorkersModal } from "@/stores/main/workers";
import { CornerDownLeft } from "lucide-react";

const Footer = () => {
	const { setModal } = useWorkersModal();
	return (
		<DialogFooter className="overflow-visible p-1 mt-auto">
			<div className="w-full flex items-center justify-between">
				<div className="mr-auto" />
				<div className="flex items-center gap-4">
					<Button
						size="sm"
						variant="outline"
						onClick={() => setModal({ createWorker: false })}
					>
						<span>Cancel</span>
						<Kbd>ESC</Kbd>
					</Button>
					<Button
						size="sm"
						className="bg-[#266DF0] hover:bg-[#1C62E3] text-white"
					>
						<span>Add worker</span>
						<CornerDownLeft />
					</Button>
				</div>
			</div>
		</DialogFooter>
	);
};

export default Footer;
