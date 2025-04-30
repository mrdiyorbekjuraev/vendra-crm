"use client";
import { Button } from "@/components/ui/button";
import MainInput from "@/components/ui/main-input";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Eye, EyeClosed, Key, Phone } from "lucide-react";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Switcher from "../switcher";
import { useWorkerFormFeatures } from "./feature";
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
const WorkerForm = () => {
	const { handleSubmit, isPending } = useWorkerFormFeatures();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const workerForm = useFormik<any>({
		initialValues: {
			phoneNumber: "",
			password: "",
		},
		// validationSchema: toFormikValidationSchema(),
		onSubmit: async (values) => {
			await handleSubmit?.mutateAsync(values);
		},
	});
	return (
		<>
			<motion.form
				className="w-full space-y-4"
				variants={containerVariants}
				onSubmit={workerForm.handleSubmit}
			>
				<motion.div className="w-full relative" variants={itemVariants}>
					<MainInput
						name="phoneNumber"
						type="tel"
						placeholder="+998 XX XXX XX XX"
						classNames={{
							input: "pl-8",
						}}
						minLength={0}
						maxLength={13}
						value={workerForm.values.phoneNumber}
						onChange={(e) => {
							workerForm?.setFieldValue("phoneNumber", e.target.value);
						}}
						onBlur={workerForm.handleBlur}
						aria-label="Phone number"
						required
						isInvalid={
							!!workerForm.touched.phoneNumber &&
							!!workerForm.errors.phoneNumber
						}
						errorMessage={String(workerForm.errors.phoneNumber)}
					/>
					<Phone
						size={16}
						strokeWidth={1.5}
						className="absolute left-2.5 top-4 -translate-y-1/2 text-zinc-500"
					/>
				</motion.div>
				{workerForm?.values?.phoneNumber?.length === 13 && (
					<motion.div className="w-full relative" variants={itemVariants}>
						<MainInput
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="******"
							classNames={{
								input: "pl-8",
							}}
							minLength={1}
							maxLength={10}
							value={workerForm.values.password}
							onChange={(e) => {
								workerForm?.setFieldValue("password", e.target.value);
							}}
							onBlur={workerForm.handleBlur}
							aria-label="password"
							required
							isInvalid={
								!!workerForm.touched.password && !!workerForm.errors.password
							}
							errorMessage={String(workerForm.errors.password)}
							autoComplete="current-password"
						/>
						<Key
							size={16}
							strokeWidth={1.5}
							className="absolute left-2.5 top-4 -translate-y-1/2 text-zinc-500"
						/>
						<TooltipWrapper
							content={showPassword ? "Hide password" : "Show passwordF"}
						>
							<Button
								type="button"
								className="absolute size-5 rounded-sm right-2.5 top-4.5 -translate-y-1/2 text-zinc-500"
								variant={"ghost"}
								size="icon"
								withAnimation={false}
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <Eye /> : <EyeClosed />}
							</Button>
						</TooltipWrapper>
					</motion.div>
				)}
				<Switcher />
				<motion.div variants={itemVariants}>
					<Button className="w-full" type="submit" disabled={isPending}>
						{isPending ? "Sending..." : "Continue"}
					</Button>
				</motion.div>
			</motion.form>
		</>
	);
};

export default WorkerForm;
