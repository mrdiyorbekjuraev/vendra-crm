"use client";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MainInput from "@/components/ui/main-input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimePicker } from "@/components/ui/time-picker";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useWorkersModal } from "@/stores/main/workers";
import { formatDate } from "@/utils/format-date";
import { FastField, FieldProps, Form, Formik } from "formik";
import {
	Building,
	CalendarIcon,
	Lock,
	Maximize2,
	Minimize2,
	Phone,
	ShieldCheck,
	Trash,
	Upload,
	User,
} from "lucide-react";
import { useState } from "react";
import Footer from "./customs/footer";

const branchList = [
	{
		value: "tashkent_main",
		label: "Tashkent Main Branch",
		icon: Building,
	},
	{
		value: "samarkand_center",
		label: "Samarkand Center Branch",
		icon: Building,
	},
	{
		value: "bukhara_west",
		label: "Bukhara West Branch",
		icon: Building,
	},
	{
		value: "andijan_east",
		label: "Andijan East Branch",
		icon: Building,
	},
	{
		value: "fergana_north",
		label: "Fergana North Branch",
		icon: Building,
	},
];

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

export const CreateWorker = () => {
	const { createWorker, setModal } = useWorkersModal();
	const [fullWidth, setFullWidth] = useState<boolean>(false);

	const handleClose = () => {
		setModal({ createWorker: false });
	};

	return (
		<Dialog open={createWorker} onOpenChange={handleClose}>
			<DialogContent
				className={cn(
					" rounded-[16px] px-0.5 py-0.5 overflow-visible",
					fullWidth
						? "min-w-[100vw] h-full"
						: "sm:max-w-[825px] lg:max-w-[1200px]",
				)}
			>
				<div className="rounded-[16px] border">
					<DialogHeader className="px-4 py-2.5 relative">
						<DialogTitle>
							<div className="flex items-center gap-3 text-sm">
								<User size={16} className="text-zinc-500" />
								<span>Create Worker</span>
							</div>
						</DialogTitle>
						<TooltipWrapper content={fullWidth ? "Minimize" : "Maximize"}>
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-10 top-2 size-6 text-xs"
								withAnimation={false}
								onClick={() => setFullWidth(!fullWidth)}
							>
								{fullWidth ? (
									<Minimize2 size={16} strokeWidth={1.5} />
								) : (
									<Maximize2 size={10} strokeWidth={1.5} />
								)}
							</Button>
						</TooltipWrapper>
					</DialogHeader>
					<Separator />
					<div className="h-[calc(100vh-200px)] overflow-y-auto">
						<div className="h-15 bg-sidebar px-4 flex items-center">
							<div className="flex items-center gap-1">
								<Avatar className="size-10">
									<AvatarImage src={""} alt="Profile picture" />
									<AvatarFallback className="bg-blue-500 text-white uppercase">
										{"DJ"}
									</AvatarFallback>
								</Avatar>

								<div className="flex items-center gap-2">
									<div>
										<Typography variant="p" size="md">
											Profile Picture
										</Typography>
										<Typography variant="p" size="xs" type="muted">
											We only support PNGs, JPEGs and GIFs under 10MB
										</Typography>
									</div>
									<div className="flex gap-4 mt-1">
										<Button
											type="button"
											variant="default"
											className="flex items-center gap-2"
											size="sm"
										>
											<Upload size={16} aria-hidden="true" />
											<span>Upload image</span>
										</Button>
										<Button
											type="button"
											variant="destructive"
											className="cursor-pointer"
											size="sm"
											disabled
										>
											<Trash size={16} />
										</Button>
									</div>
								</div>
							</div>
						</div>
						<Formik
							initialValues={{
								firstName: "",
								lastName: "",
								phoneNumber: "",
								password: "",
								confirmPassword: "",
								birthDate: "",
								gender: "male",
								location: "",
								email: "",
								branches: ["tashkent_main"],
								roles: ["admin"],
								startTime: new Date(),
								endTime: new Date(),
							}}
							onSubmit={(values) => {
								console.log("Form submitted:", values);
							}}
						>
							{({ isSubmitting }) => (
								<Form className="my-4 space-y-4">
									{/* Form fields using FastField as shown above */}
									<div className="grid grid-cols-2 gap-4 px-4">
										<FastField name="firstName">
											{({ field, meta }: FieldProps) => (
												<div className="grid w-full gap-2">
													<Label htmlFor="firstName" className="block text-sm">
														First name
													</Label>
													<MainInput
														id="firstName"
														type="text"
														placeholder="Enter worker first name..."
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
														placeholder="Enter worker last name..."
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
													<Label
														htmlFor="phoneNumber"
														className="block text-sm "
													>
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
										<FastField name="email">
											{({ field, meta }: FieldProps) => (
												<div className="grid w-full gap-2">
													<Label htmlFor="email" className="block text-sm ">
														Email
													</Label>
													<MainInput
														id="email"
														type="text"
														placeholder="Enter worker email..."
														{...field}
														isInvalid={meta.touched && !!meta.error}
														errorMessage={meta.touched ? meta.error : ""}
													/>
												</div>
											)}
										</FastField>
										<FastField name="password">
											{({ field, meta }: FieldProps) => (
												<div className="grid w-full gap-2 relative">
													<Label htmlFor="password" className="block text-sm ">
														Enter password
													</Label>
													<MainInput
														id="password"
														placeholder="*************"
														classNames={{
															input: "pl-8",
														}}
														{...field}
														isInvalid={meta.touched && !!meta.error}
														errorMessage={meta.touched ? meta.error : ""}
													/>
													<Lock
														size={16}
														strokeWidth={1.5}
														className="absolute left-2.5 top-11.5 -translate-y-1/2 text-zinc-500"
													/>
												</div>
											)}
										</FastField>
										<FastField name="confirmPassword">
											{({ field, meta }: FieldProps) => (
												<div className="grid w-full gap-2 relative">
													<Label
														htmlFor="confirmPassword"
														className="block text-sm "
													>
														Confirm password
													</Label>
													<MainInput
														id="confirmPassword"
														placeholder="*************"
														classNames={{
															input: "pl-8",
														}}
														{...field}
														isInvalid={meta.touched && !!meta.error}
														errorMessage={meta.touched ? meta.error : ""}
													/>
													<Lock
														size={16}
														strokeWidth={1.5}
														className="absolute left-2.5 top-11.5 -translate-y-1/2 text-zinc-500"
													/>
												</div>
											)}
										</FastField>
									</div>
									<div className="h-15 bg-sidebar px-4 flex items-center">
										<Typography variant="h3">Branches and Roles</Typography>
									</div>
									<div className="grid grid-cols-2 gap-4 px-4">
										<FastField name="branches">
											{({ field, meta, form }: FieldProps) => (
												<div>
													<Label
														htmlFor="branches"
														className="block text-sm mb-2"
													>
														Store Branches
													</Label>
													<MultiSelect
														options={branchList}
														placeholder="Select branches"
														variant="inverted"
														onValueChange={(v) => {
															form?.setFieldValue("branches", v);
														}}
														animation={2}
														maxCount={1}
														defaultValue={field?.value}
													/>
												</div>
											)}
										</FastField>
										<FastField name="roles">
											{({ field, meta, form }: FieldProps) => (
												<div>
													<Label htmlFor="role" className="block text-sm mb-2">
														Role
													</Label>
													<MultiSelect
														options={roleList}
														placeholder="Select roles"
														variant="inverted"
														onValueChange={(v) => {
															form?.setFieldValue("roles", v);
														}}
														animation={2}
														maxCount={1}
														defaultValue={field?.value}
													/>
												</div>
											)}
										</FastField>
									</div>
									<div className="h-15 bg-sidebar px-4 flex items-center">
										<Typography variant="h3">Additional information</Typography>
									</div>
									<div className="grid grid-cols-2 gap-4 px-4">
										<FastField name="birthDate">
											{({ field, meta, form }: FieldProps) => (
												<div>
													<Label
														htmlFor="birthDate"
														className="block text-sm mb-2"
													>
														Birthdate
													</Label>
													<Popover>
														<PopoverTrigger asChild>
															<Button
																variant={"outline"}
																className={cn(
																	"w-full justify-start text-left font-normal",
																	!field?.value && "text-muted-foreground",
																)}
																withAnimation={false}
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field?.value ? (
																	formatDate(field?.value, "en")
																) : (
																	<span>Pick a date</span>
																)}
															</Button>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start"
														>
															<Calendar
																mode="single"
																selected={field?.value}
																onSelect={(e) => {
																	form?.setFieldValue("birthDate", e);
																}}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</div>
											)}
										</FastField>
										<FastField name="gender">
											{({ field, meta, form }: FieldProps) => (
												<div>
													<Label
														htmlFor="gender"
														className="block text-sm mb-2 w-full"
													>
														Gender
													</Label>
													<Tabs
														defaultValue={field?.value}
														className="w-full"
														value={field?.value}
														onSelect={(e) => console.log(e)}
													>
														<TabsList
															className="
						 w-full"
														>
															<TabsTrigger
																value="male"
																onClick={() =>
																	form.setFieldValue("gender", "male")
																}
															>
																Male
															</TabsTrigger>
															<TabsTrigger
																value="female"
																onClick={() =>
																	form.setFieldValue("gender", "female")
																}
															>
																Female
															</TabsTrigger>
														</TabsList>
													</Tabs>
												</div>
											)}
										</FastField>
										<FastField name="location">
											{({ field, meta, form }: FieldProps) => (
												<div className="grid w-full gap-2">
													<Label htmlFor="location" className="block text-sm">
														Location
													</Label>
													<MainInput
														id="location"
														type="text"
														placeholder="Enter worker location..."
														{...field}
														isInvalid={meta.touched && !!meta.error}
														errorMessage={meta.touched ? meta.error : ""}
													/>
												</div>
											)}
										</FastField>
										<div className="flex items-center justify-between">
											<FastField name="startTime">
												{({ field, meta, form }: FieldProps) => (
													<div className="grid w-full gap-2">
														<Label>Start Time</Label>
														<TimePicker
															value={field?.value}
															onChange={(e) => {
																form?.setFieldValue("startTime", e);
															}}
															language="uz"
														/>
													</div>
												)}
											</FastField>
											<FastField name="endTime">
												{({ field, meta, form }: FieldProps) => (
													<div className="grid w-full gap-2">
														<Label>End Time</Label>
														<TimePicker
															value={field?.value}
															onChange={(e) => {
																form?.setFieldValue("endTime", e);
															}}
															language="uz"
														/>
													</div>
												)}
											</FastField>
										</div>
									</div>
								</Form>
							)}
						</Formik>
					</div>
					<Separator />
					<Footer />
				</div>
			</DialogContent>
			<DialogOverlay className="bg-transparent" />
		</Dialog>
	);
};
