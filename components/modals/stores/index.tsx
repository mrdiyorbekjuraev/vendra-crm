"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Typography } from "@/components/ui/typography";
import { upload } from "@/lib/axios-client";
import { useBranchesModal } from "@/stores/generic/branch";
import { useStoresModal } from "@/stores/generic/stores";
import { getInitials } from "@/utils/get-initial";
import { FastField, Field, FieldProps, Form, Formik } from "formik";
import { Store, Trash, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useStoresFeatures } from "./features";

type TFormValues = {
	name: string;
	type: string;
	slug: string;
	logoUrl: string;
};

export const CreateStore = () => {
	const { createStore, setModal } = useStoresModal();
	const { handleCreateStore } = useStoresFeatures();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = event.target.files;
		if (!files || files.length === 0) return;

		// Validate file size (max 10MB)
		const file = files[0];
		const fileSizeInMB = file.size / (1024 * 1024);
		if (fileSizeInMB > 10) {
			toast.error("File size exceeds 10MB limit");
			return;
		}

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await upload.post("/file/upload", formData);

			if (response.data?.url) {
				toast.success("Image uploaded successfully");
				setIsUploading(false);
				return response?.data?.url;
			} else {
				toast.error("Failed to get image URL");
			}
		} catch (error) {
			toast.error("Failed to upload image");
			console.error("Upload error:", error);
		} finally {
			setIsUploading(false);

			// Reset file input to allow re-uploading the same file
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	const triggerFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const initialValues: TFormValues = {
		name: "",
		type: "GROCERY",
		slug: "",
		logoUrl: "",
	};

	return (
		<Dialog
			open={createStore}
			onOpenChange={() => setModal({ createStore: false })}
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
								await handleCreateStore.mutateAsync(values);
							}}
						>
							{({ isSubmitting, values }) => {
								return (
									<Form className="my-4 space-y-4">
										<div className="px-4">
											<Field name="logoUrl">
												{({ field, meta, form }: FieldProps) => (
													<div className="flex items-center gap-4">
														<Avatar className="size-20">
															<AvatarImage
																src={field?.value}
																alt="Profile picture"
															/>
															<AvatarFallback className="bg-blue-500 text-white uppercase">
																{getInitials(form?.values?.name)}
															</AvatarFallback>
														</Avatar>

														<div>
															<Typography variant="p" size="md">
																Profile Picture
															</Typography>
															<Typography variant="p" size="xs" type="muted">
																We only support PNGs, JPEGs and GIFs under 10MB
															</Typography>
															<div className="flex gap-4 mt-1">
																<Button
																	type="button"
																	variant="default"
																	className="flex items-center gap-2"
																	size="sm"
																	onClick={triggerFileInput}
																	disabled={isUploading}
																>
																	<Upload size={16} aria-hidden="true" />
																	<span>
																		{isUploading
																			? "Uploading..."
																			: "Upload image"}
																	</span>
																</Button>
																<input
																	type="file"
																	ref={fileInputRef}
																	className="hidden"
																	accept="image/png, image/jpeg"
																	onChange={async (e) => {
																		const data = await handleImageUpload(e);
																		form.setFieldValue("logoUrl", data);
																	}}
																/>
																<Button
																	type="button"
																	variant="destructive"
																	className="cursor-pointer"
																	size="sm"
																	onClick={() =>
																		form?.setFieldValue("logoUrl", null)
																	}
																>
																	<Trash size={16} />
																</Button>
															</div>
														</div>
													</div>
												)}
											</Field>
										</div>
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
											<FastField name="type">
												{({ field, meta }: FieldProps) => (
													<div className="grid w-full gap-2">
														<Label htmlFor="type" className="block text-sm">
															Type
														</Label>
														<MainInput
															id="type"
															type="text"
															placeholder="Enter type..."
															{...field}
															isInvalid={meta.touched && !!meta.error}
															errorMessage={meta.touched ? meta.error : ""}
														/>
													</div>
												)}
											</FastField>
											<FastField name="slug">
												{({ field, meta }: FieldProps) => (
													<div className="grid w-full gap-2">
														<Label htmlFor="slug" className="block text-sm">
															Slug
														</Label>
														<MainInput
															id="type"
															type="text"
															placeholder="Enter slug..."
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
														onClick={() => setModal({ createStore: false })}
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
														{isSubmitting ? "Creating..." : "Create store"}
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
