import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainInput from "@/components/ui/main-input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Typography } from "@/components/ui/typography";
import { upload } from "@/lib/axios-client";
import { useUserCache } from "@/services/main/base";
import { getInitials } from "@/utils/get-initial";
import { FastField, FieldProps, Form, Formik } from "formik";
import {
	Phone,
	Save,
	ShieldCheck,
	Store,
	Trash,
	Upload,
	User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useUserProfileFeatures } from "../../../../features";
import Loading from "./loading";

const roleList = [
	{
		value: "admin",
		label: "Admin",
		icon: ShieldCheck,
	},
	{
		value: "manager",
		label: "Manager",
		icon: User,
	},
];

const shopList = [
	{
		value: "vendra",
		label: "Vendra",
		icon: Store,
	},
	{
		value: "korzinka",
		label: "Korzinka",
		icon: Store,
	},
];

type TFormValues = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	profilePhotoUrl: string;
};

const Content = () => {
	const {
		user: { data: user, isLoading, refetch },
	} = useUserCache();
	const { handleUpdateUser } = useUserProfileFeatures();
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
		firstName: user?.data?.firstName ?? "",
		lastName: user?.data?.lastName ?? "",
		phoneNumber: user?.data?.phoneNumber ?? "",
		profilePhotoUrl: user?.data?.profilePhotoUrl ?? "",
		email: "",
	};

	if (isLoading) return <Loading />;

	return (
		<div>
			<Formik
				initialValues={initialValues}
				enableReinitialize
				onSubmit={async (values) => {
					await handleUpdateUser?.mutateAsync(values);
					refetch();
				}}
			>
				{({ isSubmitting, values, dirty }) => {
					return (
						<Form className="my-4 space-y-4">
							<FastField name="profilePhotoUrl">
								{({ field, meta, form }: FieldProps) => (
									<div className="flex items-center gap-4">
										<Avatar className="size-20">
											<AvatarImage src={field?.value} alt="Profile picture" />
											<AvatarFallback className="bg-blue-500 text-white uppercase">
												{getInitials(
													`${values?.firstName} ${values?.lastName}`,
												)}
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
														{isUploading ? "Uploading..." : "Upload image"}
													</span>
												</Button>
												<input
													type="file"
													ref={fileInputRef}
													className="hidden"
													accept="image/png, image/jpeg"
													onChange={async (e) => {
														const data = await handleImageUpload(e);
														form.setFieldValue("profilePhotoUrl", data);
														console.log(data);
													}}
												/>
												<Button
													type="button"
													variant="destructive"
													className="cursor-pointer"
													size="sm"
													onClick={() =>
														form?.setFieldValue("profilePhotoUrl", null)
													}
												>
													<Trash size={16} />
												</Button>
											</div>
										</div>
									</div>
								)}
							</FastField>

							<div className="grid grid-cols-2 gap-4">
								<FastField name="firstName">
									{({ field, meta }: FieldProps) => (
										<div className="grid w-full gap-2">
											<Label htmlFor="firstName" className="block text-sm">
												First name
											</Label>
											<MainInput
												id="firstName"
												type="text"
												placeholder="Enter your first name..."
												{...field}
												isInvalid={meta.touched && !!meta.error}
												errorMessage={meta.touched ? meta.error : ""}
											/>
										</div>
									)}
								</FastField>
								<FastField name="lastName">
									{({ field, meta }: FieldProps) => (
										<div className="grid w-full gap-2">
											<Label htmlFor="lastName" className="block text-sm">
												First name
											</Label>
											<MainInput
												id="lastName"
												type="text"
												placeholder="Enter your last name..."
												{...field}
												isInvalid={meta.touched && !!meta.error}
												errorMessage={meta.touched ? meta.error : ""}
											/>
										</div>
									)}
								</FastField>
								<FastField name="phoneNumber">
									{({ field, meta }: FieldProps) => (
										<div className="grid w-full gap-2 relative">
											<Label htmlFor="phoneNumber" className="block text-sm ">
												Phone Number
											</Label>
											<MainInput
												placeholder="+998 XX XXX XX XX"
												classNames={{
													input: "pl-8",
												}}
												{...field}
												isInvalid={meta.touched && !!meta.error}
												errorMessage={meta.touched ? meta.error : ""}
											/>
											<Phone
												size={16}
												strokeWidth={1.5}
												className="absolute left-2.5 top-11.5 -translate-y-1/2 text-zinc-500"
											/>
										</div>
									)}
								</FastField>
							</div>
							{dirty && (
								<div className="grid grid-cols-1">
									<Button
										type="submit"
										withAnimation={false}
										className="ml-auto"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Saving..." : "Save"}
									</Button>
								</div>
							)}
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default Content;
