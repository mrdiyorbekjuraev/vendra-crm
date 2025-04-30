import { Button } from "@/components/ui/button";
import MainInput from "@/components/ui/main-input";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { useUserStore } from "@/stores/auth";
import { CodeFormValues, codeSchema, phoneSchema } from "@/views/auth/model";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { KeyRound, Phone } from "lucide-react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Switcher from "../switcher";
import { useOwnerFormFeatures } from "./features";

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
const OwnerForm = () => {
	const { userData } = useUserStore();
	const {
		handlePhoneRegister,
		isPending,
		handleCodeCheck,
		isCodeChecking,
		resendCode,
	} = useOwnerFormFeatures();

	// Form for the initial phone number submission
	const phoneForm = useFormik<any>({
		initialValues: {
			phoneNumber: userData?.phone || "",
		},
		validationSchema: toFormikValidationSchema(phoneSchema),
		onSubmit: async (values) => {
			await handlePhoneRegister?.mutateAsync(values);
		},
	});

	// Form for the verification code
	const verificationForm = useFormik<CodeFormValues>({
		initialValues: {
			code: "",
		},
		validationSchema: toFormikValidationSchema(codeSchema),
		onSubmit: async (values) => {
			await handleCodeCheck.mutateAsync(values);
		},
	});
	return (
		<div className="w-full">
			{!userData?.isPhoneVerified ? (
				<motion.form
					onSubmit={phoneForm.handleSubmit}
					className="w-full space-y-4"
					variants={containerVariants}
				>
					<motion.div className="w-full relative" variants={itemVariants}>
						<MainInput
							name="phoneNumber"
							placeholder="+998 XX XXX XX XX"
							classNames={{
								input: "pl-8",
							}}
							value={phoneForm.values.phoneNumber}
							onChange={(e) => {
								phoneForm?.setFieldValue("phoneNumber", e.target.value);
							}}
							onBlur={phoneForm.handleBlur}
							aria-label="Phone number"
							required
							isInvalid={
								!!phoneForm.touched.phoneNumber &&
								!!phoneForm.errors.phoneNumber
							}
							errorMessage={String(phoneForm.errors.phoneNumber)}
						/>
						<Phone
							size={16}
							strokeWidth={1.5}
							className="absolute left-2.5 top-4 -translate-y-1/2 text-zinc-500"
						/>
					</motion.div>
					<motion.div variants={itemVariants}>
						<Switcher />
					</motion.div>
					<motion.div variants={itemVariants}>
						<Button className="w-full" type="submit" disabled={isPending}>
							{isPending ? "Sending..." : "Continue"}
						</Button>
					</motion.div>
				</motion.form>
			) : (
				<motion.form
					onSubmit={verificationForm.handleSubmit}
					className="w-full space-y-4"
					variants={containerVariants}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<motion.div className="w-full relative" variants={itemVariants}>
						<div className="text-xs text-muted-foreground text-center">
							Currently you are logging in with this{" "}
							<TooltipWrapper content={userData?.phone}>
								<span className="font-bold text-blue-500 underline">
									{userData?.phone}
								</span>
							</TooltipWrapper>{" "}
							number.
						</div>
					</motion.div>
					<motion.div className="w-full relative" variants={itemVariants}>
						<MainInput
							name="code"
							placeholder="Enter verification code"
							classNames={{
								input: "pl-8",
							}}
							type="text"
							value={verificationForm.values.code}
							onChange={verificationForm.handleChange}
							onBlur={verificationForm.handleBlur}
							aria-label="Verification code"
							required
							autoFocus
							isInvalid={
								!!verificationForm.touched.code &&
								!!verificationForm.errors.code
							}
							errorMessage={verificationForm.errors.code}
						/>
						<KeyRound
							size={16}
							strokeWidth={1.5}
							className="absolute left-2.5 top-4 -translate-y-1/2 text-zinc-500"
						/>
					</motion.div>
					<motion.div variants={itemVariants}>
						<Switcher />
					</motion.div>
					<motion.div variants={itemVariants}>
						<Button className="w-full" type="submit" disabled={isCodeChecking}>
							{isCodeChecking ? "Verifying..." : "Verify Code"}
						</Button>
					</motion.div>

					<motion.div className="text-center pt-2" variants={itemVariants}>
						<button
							type="button"
							onClick={async () => {
								await resendCode?.mutateAsync();
							}}
							className="text-sm text-blue-600 hover:underline"
							disabled={isCodeChecking}
						>
							Resend code
						</button>
					</motion.div>
				</motion.form>
			)}
		</div>
	);
};

export default OwnerForm;
