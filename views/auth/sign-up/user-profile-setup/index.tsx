"use client";

import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainInput from "@/components/ui/main-input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { upload } from "@/lib/axios-client";
// Hooks & Utilities
import { useUserStore } from "@/stores/auth";
import { userProfileSchema } from "../../model";
import {
	type TUserRegisterForm,
	useUserProfileSetUpFeatures,
} from "./features";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
};

const UserProfileSetup = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const { userData } = useUserStore();
	const { handleUserRegister } = useUserProfileSetUpFeatures();
	const fileInputRef = useRef<HTMLInputElement>(null);
	console.log(userData);
	const userForm = useFormik<TUserRegisterForm>({
		initialValues: {
			phoneNumber: userData?.phone || "",
			firstName: "",
			lastName: "",
			profilePhotoUrl: "",
		},
		validationSchema: toFormikValidationSchema(userProfileSchema),
		onSubmit: async (values) => {
			try {
				await handleUserRegister?.mutateAsync(values);
				toast.success("Profile setup completed successfully!");
			} catch (error) {
				toast.error("Failed to complete profile setup. Please try again.");
			}
		},
	});

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
				userForm.setFieldValue("profilePhotoUrl", response.data.url);
				toast.success("Image uploaded successfully");
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

	const handleRemoveImage = () => {
		userForm.setFieldValue("profilePhotoUrl", "");
		toast.success("Profile image removed");
	};

	const getInitials = () => {
		const { firstName, lastName } = userForm.values;
		if (firstName && lastName) {
			return `${firstName[0]}${lastName[0]}`.toUpperCase();
		}
		return "";
	};

	return (
		<motion.main
			className="flex items-center justify-center min-h-screen py-8"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<motion.div
				className="w-full max-w-6xl mx-auto rounded-3xl border overflow-hidden shadow-sm"
				variants={itemVariants}
			>
				<div className="grid md:grid-cols-2">
					{/* Left Column - Form */}
					<section className="p-6 md:p-10 lg:p-16">
						<motion.h1
							className="text-2xl font-semibold mb-8"
							variants={itemVariants}
						>
							Let's get to know you
						</motion.h1>

						<form onSubmit={userForm.handleSubmit} className="space-y-6">
							{/* Profile Picture */}
							<motion.fieldset variants={itemVariants}>
								<legend className="mb-3 font-medium">Profile picture</legend>
								<div className="flex items-center gap-4">
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Avatar className="size-20">
											<AvatarImage
												src={userForm.values.profilePhotoUrl || ""}
												alt="Profile picture"
											/>
											<AvatarFallback className="bg-blue-500 text-white uppercase">
												{getInitials()}
											</AvatarFallback>
										</Avatar>
									</motion.div>

									<div>
										<div className="flex gap-4">
											<motion.div
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Button
													type="button"
													variant="outline"
													className="flex items-center gap-2"
													onClick={triggerFileInput}
													disabled={isUploading}
												>
													<Upload size={16} aria-hidden="true" />
													<span>
														{isUploading ? "Uploading..." : "Upload image"}
													</span>
												</Button>
											</motion.div>
											<input
												type="file"
												ref={fileInputRef}
												className="hidden"
												accept="image/png, image/jpeg"
												onChange={handleImageUpload}
											/>
											<motion.div
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
											>
												<Button
													type="button"
													variant="outline"
													onClick={handleRemoveImage}
													disabled={!userForm.values.profilePhotoUrl}
												>
													Remove
												</Button>
											</motion.div>
										</div>
										<p className="text-xs text-muted-foreground mt-2">
											*.png, *.jpeg files up to 10MB at least 400px by 400px
										</p>
									</div>
								</div>
							</motion.fieldset>

							{/* Form Fields */}
							<motion.div className="space-y-4" variants={itemVariants}>
								<motion.div variants={itemVariants}>
									<Label htmlFor="firstName" className="block text-sm mb-2">
										First name
									</Label>
									<MainInput
										id="firstName"
										type="text"
										placeholder="Enter your first name..."
										value={userForm.values.firstName}
										onChange={(e) => {
											userForm.setFieldValue(
												"firstName",
												e.target.value.trim(),
											);
										}}
										onBlur={userForm.handleBlur}
										required
										isInvalid={
											!!userForm.touched.firstName &&
											!!userForm.errors.firstName
										}
										errorMessage={userForm.errors.firstName}
									/>
								</motion.div>

								<motion.div variants={itemVariants}>
									<Label htmlFor="lastName" className="block text-sm mb-2">
										Last name
									</Label>
									<MainInput
										id="lastName"
										type="text"
										placeholder="Enter your last name..."
										value={userForm.values.lastName}
										onChange={(e) => {
											userForm.setFieldValue("lastName", e.target.value.trim());
										}}
										onBlur={userForm.handleBlur}
										required
										isInvalid={
											!!userForm.touched.lastName && !!userForm.errors.lastName
										}
										errorMessage={userForm.errors.lastName}
									/>
								</motion.div>

								<motion.div variants={itemVariants}>
									<Label htmlFor="phone" className="block text-sm mb-2">
										Phone number
									</Label>
									<Input
										id="phone"
										type="tel"
										value={userData?.phone || ""}
										disabled
										aria-readonly="true"
										className="bg-muted"
									/>
								</motion.div>
							</motion.div>

							<Separator className="my-4" />

							{/* Subscribe Toggle */}
							<motion.div
								className="flex items-start gap-4 pt-2"
								variants={itemVariants}
							>
								<div className="flex-1">
									<Label
										htmlFor="subscribe-toggle"
										className="text-sm font-medium"
									>
										Subscribe to product update emails
									</Label>
									<p className="text-xs text-muted-foreground mt-1">
										Get the latest updates about features and product releases.
									</p>
								</div>
								<Switch id="subscribe-toggle" className="cursor-pointer" />
							</motion.div>

							{/* Continue Button */}
							<motion.div
								variants={itemVariants}
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									type="submit"
									className="w-full mt-6"
									disabled={userForm.isSubmitting || isUploading}
								>
									{userForm.isSubmitting
										? "Setting up your profile..."
										: "Continue"}
								</Button>
							</motion.div>
						</form>
					</section>

					{/* Right Column - App Preview */}
					<motion.div
						className="hidden md:block bg-secondary"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.3 }}
					>
						<div className="h-full w-full relative">
							<Image
								src="https://ui.shadcn.com/placeholder.svg"
								fill
								alt="Application preview"
								className="object-cover dark:invert"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</motion.main>
	);
};

export default UserProfileSetup;
