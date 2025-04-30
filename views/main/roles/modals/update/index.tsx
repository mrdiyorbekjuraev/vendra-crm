"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import MainInput from "@/components/ui/main-input";
import MainTextArea from "@/components/ui/main-textarea";

import { Separator } from "@/components/ui/separator";
import { type RoleFormValues, roleSchema } from "@/models/main/roles";
import { useRoleModal } from "@/stores/main/roles";
import { useFormik } from "formik";
import { CornerDownLeft, UserCog } from "lucide-react";
import { useCallback } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRolesEditFeatures } from "./features";

export const EditRole = () => {
	const { editRole, setModal } = useRoleModal();
	const { handleRoleEdit, isPending } = useRolesEditFeatures();

	const initialValues = {
		name: editRole?.props?.name ?? "",
		description: editRole?.props?.description ?? "",
	};

	const roleForm = useFormik<RoleFormValues>({
		initialValues,
		enableReinitialize: true,
		validationSchema: toFormikValidationSchema(roleSchema),
		onSubmit: async (values) => await handleRoleEdit?.mutateAsync(values),
	});

	const { name, description } = roleForm.values;

	const hasChanged = useCallback(() => {
		return (
			initialValues.name === name && initialValues.description === description
		);
	}, [name, description]);

	return (
		<Dialog
			open={editRole?.open}
			onOpenChange={() => setModal({ editRole: { open: false, props: null } })}
		>
			<DialogContent className="sm:max-w-[825px] rounded-[16px] px-0.5 py-0.5 overflow-visible top-[30%]">
				<div className="rounded-[16px] border">
					<DialogHeader className="px-4 py-2.5">
						<DialogTitle>
							<div className="flex items-center gap-3 text-sm">
								<UserCog size={16} className="text-zinc-500" />
								<span>Edit Role</span>
							</div>
						</DialogTitle>
					</DialogHeader>
					<Separator />
					<form
						onSubmit={roleForm.handleSubmit}
						className="grid grid-cols-1 gap-4 mt-4 "
					>
						{/* ROLE NAME */}
						<div className="grid w-full gap-2 px-4">
							<MainInput
								id="name"
								label="Role name"
								type="text"
								placeholder="Enter role name..."
								min={2}
								maxLength={128}
								value={roleForm.values.name}
								onChange={(e) => {
									roleForm.setFieldValue("name", e.target.value);
								}}
								onBlur={roleForm.handleBlur}
								isInvalid={!!roleForm.touched.name && !!roleForm.errors.name}
								errorMessage={String(roleForm?.errors?.name)}
							/>

							<MainTextArea
								id="description"
								label="Role description"
								placeholder="Enter role description..."
								value={roleForm.values.description}
								onChange={(e) => {
									roleForm.setFieldValue("description", e.target.value);
								}}
								onBlur={roleForm.handleBlur}
								isInvalid={
									!!roleForm.touched.description &&
									!!roleForm.errors.description
								}
								errorMessage={String(roleForm?.errors?.description)}
								classNames={{
									input: "min-h-40 resize-none mb-4",
								}}
							/>
						</div>
					</form>
					<DialogFooter className="overflow-visible py-2 px-4 h-10 border-t flex items-center justify-center">
						<div className="w-full flex items-center justify-between">
							<div className="mr-auto" />
							<div className="flex items-center gap-4">
								<Button
									size="sm"
									type="button"
									variant="outline"
									onClick={() =>
										setModal({ editRole: { open: false, props: null } })
									}
								>
									<span>Cancel</span>
									<Kbd>ESC</Kbd>
								</Button>
								<Button
									type="submit"
									size="sm"
									className="bg-[#266DF0] hover:bg-[#1C62E3] text-white"
									disabled={
										isPending ||
										hasChanged() ||
										!roleForm.isValid ||
										!roleForm.dirty
									}
									onClick={() => roleForm.handleSubmit()}
								>
									<span>{isPending ? "Saving..." : "Save"}</span>
									<CornerDownLeft />
								</Button>
							</div>
						</div>
					</DialogFooter>
				</div>
			</DialogContent>
			<DialogOverlay className="bg-transparent" />
		</Dialog>
	);
};
