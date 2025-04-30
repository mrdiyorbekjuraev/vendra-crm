import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { actionLabels } from "@/mock/roles/index.data";
import { usePermissionStore } from "@/stores/main/roles";
import React from "react";

const Customers = () => {
	const { permissions, toggle } = usePermissionStore();
	return (
		<section>
			<h3 className="text-lg font-semibold">Customers</h3>
			<Accordion type="multiple" className="w-full space-y-2">
				{permissions.map((perm) => {
					if (perm?.section !== "customers") return null;
					return (
						<AccordionItem
							key={perm.resource}
							value={perm.resource}
							className="bg-sidebar rounded-md px-2"
						>
							<AccordionTrigger className="flex items-center">
								<span className="mr-auto capitalize">{perm.resource}</span>
							</AccordionTrigger>
							<AccordionContent className="pl-6 space-y-4">
								{Object.keys(actionLabels).map((action) => (
									<div key={action} className="flex items-center space-x-2">
										<Checkbox
											id={`${action}-${perm.resource}`}
											checked={perm.actions.includes(action)}
											onCheckedChange={() => toggle(perm.resource, action)}
										/>
										<label
											htmlFor={`${action}-${perm.resource}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											{actionLabels[action]}
										</label>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</section>
	);
};

export default Customers;
