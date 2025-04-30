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
import { Label } from "@/components/ui/label";
import MainInput from "@/components/ui/main-input";
import { Separator } from "@/components/ui/separator";
import { useBranchesModal } from "@/stores/generic/branch";
import { FastField, FieldProps, Form, Formik } from "formik";
import { CornerDownLeft, Store } from "lucide-react";
import { useBranchFeatures } from "./features";

type TFormValues = {
	name: string;
	address: string;
};

export const CreateBranch = () => {
	const { createBranch, setModal } = useBranchesModal();
	const { handleCreateBranch } = useBranchFeatures();

	const initialValues: TFormValues = {
		name: "",
		address: "",
	};

	return (
		<Dialog
			open={createBranch}
			onOpenChange={() => setModal({ createBranch: false })}
		>
			<DialogContent className="sm:max-w-[825px] rounded-[16px] px-0.5 py-0.5 overflow-visible top-[30%]">
				<div className="rounded-[16px] border">
					<DialogHeader className="px-4 py-2.5">
						<DialogTitle>
							<div className="flex items-center gap-3 text-sm">
								<Store size={16} strokeWidth={1.5} className="text-zinc-500" />
								<span>Create branch</span>
							</div>
						</DialogTitle>
					</DialogHeader>
					<Separator />

					<div>
						<Formik
							initialValues={initialValues}
							enableReinitialize
							onSubmit={async (values) => {
								await handleCreateBranch.mutateAsync(values);
							}}
						>
							{({ isSubmitting }) => {
								return (
									<Form className="my-4 space-y-4">
										<div className="grid grid-cols-1 gap-4 px-4">
											<FastField name="name">
												{({ field, meta }: FieldProps) => (
													<div className="grid w-full gap-2">
														<Label htmlFor="name" className="block text-sm">
															Name
														</Label>
														<MainInput
															id="name"
															type="text"
															placeholder="Enter branch name..."
															{...field}
															isInvalid={meta.touched && !!meta.error}
															errorMessage={meta.touched ? meta.error : ""}
														/>
													</div>
												)}
											</FastField>
											<FastField name="address">
												{({ field, meta }: FieldProps) => (
													<div className="grid w-full gap-2">
														<Label htmlFor="address" className="block text-sm">
															Address
														</Label>
														<MainInput
															id="address"
															type="text"
															placeholder="Enter address..."
															{...field}
															isInvalid={meta.touched && !!meta.error}
															errorMessage={meta.touched ? meta.error : ""}
														/>
													</div>
												)}
											</FastField>
										</div>

										<DialogFooter className="overflow-visible py-2 px-4 h-10 border-t flex items-center justify-center">
											<div className="w-full flex items-center justify-between">
												<div className="mr-auto" />
												<div className="flex items-center gap-4">
													<Button
														type="button"
														size="sm"
														variant="outline"
														onClick={() => setModal({ createBranch: false })}
													>
														<span>Cancel</span>
														<Kbd>ESC</Kbd>
													</Button>

													<Button
														type="submit"
														withAnimation={false}
														className="ml-auto"
														disabled={isSubmitting}
													>
														{isSubmitting ? "Creating..." : "Create branch"}
													</Button>
												</div>
											</div>
										</DialogFooter>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</DialogContent>
			<DialogOverlay className="bg-transparent" />
		</Dialog>
	);
};
