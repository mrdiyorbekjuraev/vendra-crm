import Header from "@/components/header";
import type { IPageParams } from "@/types/shared";
import Body from "./customs/body";
import { CreateRole } from "./modals/create";
import { Remove } from "./modals/remove";
import { EditRole } from "./modals/update";

interface IRolesPage extends IPageParams {}
const Roles = ({ lang }: IRolesPage) => {
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Header title="Roles" />
			<Body />

			<CreateRole />
			<EditRole />
			<Remove />
		</div>
	);
};

export default Roles;
