import { Button } from "@/components/ui/button";
import { useRoleModal } from "@/stores/main/roles";
import { PlusCircle } from "lucide-react";
import Search from "./customs/search";
import Sort from "./customs/sort";

const Header = () => {
	const { setModal } = useRoleModal();
	return (
		<div className="flex-1 overflow-auto flex flex-col h-[49px]">
			<div className="h-[49px] border-b  px-4 pl-3.5 flex justify-between items-center">
				<div className="flex items-center gap-2 text-xs h-7 w-full mt-1">
					<Sort />
				</div>
				<div className="flex items-center gap-2 mt-1">
					<Search />
					<Button size="sm" onClick={() => setModal({ createRole: true })}>
						<PlusCircle size={16} strokeWidth={1.5} />
						<span className="font-medium">Add Role</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
