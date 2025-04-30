"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainInput from "@/components/ui/main-input";
import { useUserStore } from "@/stores/auth";
import { useFormik } from "formik";
import { KeyRound, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
	type CodeFormValues,
	type PhoneFormValues,
	codeSchema,
	phoneSchema,
} from "../../model";
import { useRegisterFeatures } from "./features";

const Register = () => {
	const isAuthenticated = useIsAuthenticated();
	const { userData } = useUserStore();
	const { handlePhoneRegister, verifyCode } = useRegisterFeatures();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Form for the initial phone number submission
	const phoneForm = useFormik<PhoneFormValues>({
		initialValues: {
			phoneNumber: "",
		},
		validationSchema: toFormikValidationSchema(phoneSchema),
		onSubmit: async (values) => {
			setIsLoading(true);
			try {
				await handlePhoneRegister.mutateAsync(values);

				toast.success(`Code has been sent to ${values?.phoneNumber}`);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		},
	});

	// Form for the verification code
	const verificationForm = useFormik<CodeFormValues>({
		initialValues: {
			code: "",
		},
		validationSchema: toFormikValidationSchema(codeSchema),
		onSubmit: async (values) => {
			setIsLoading(true);
			try {
				await verifyCode.mutateAsync(values);

				toast.success("Code has been verified");
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<main className="flex items-center justify-center min-h-screen">
			<div className="w-full max-w-6xl p-8 py-24 mx-auto rounded-3xl border">
				<div className="grid md:grid-cols-2 gap-8 lg:gap-16 px-4 lg:px-8">
					{/* Left Column - Form */}
					<section className="flex flex-col items-center text-center justify-center">
						<h2 className="text-2xl font-semibold mb-4">
							{userData?.isPhoneVerified
								? "Please check your phone!"
								: "Register your phone number"}
						</h2>

						<p className="text-muted-foreground mb-8 max-w-sm">
							{userData?.isPhoneVerified
								? "We've just sent you a temporary password. Please enter it below."
								: "Please register your current phone number"}
						</p>

						{!userData?.isPhoneVerified ? (
							<form
								className="w-full max-w-md flex flex-col gap-4"
								onSubmit={phoneForm.handleSubmit}
							>
								<div className="w-full">
									<div className="relative">
										<Phone
											size={16}
											strokeWidth={1.5}
											className="absolute left-2.5 top-4 -translate-y-1/2 text-zinc-500"
											aria-hidden="true"
										/>
										<MainInput
											name="phoneNumber"
											placeholder="Enter your phone number"
											classNames={{
												input: "pl-8",
											}}
											value={phoneForm.values.phoneNumber}
											onChange={(e) => {
												phoneForm.setFieldValue(
													"phoneNumber",
													e.target.value.trim(),
												);
											}}
											onBlur={phoneForm.handleBlur}
											aria-label="Phone number"
											required
											isInvalid={
												!!phoneForm.touched.phoneNumber &&
												!!phoneForm.errors.phoneNumber
											}
											errorMessage={phoneForm.errors.phoneNumber}
										/>
									</div>
								</div>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Sending..." : "Continue"}
								</Button>
							</form>
						) : (
							<form
								className="w-full max-w-md flex flex-col gap-4"
								onSubmit={verificationForm.handleSubmit}
							>
								<div className="w-full">
									<div className="relative">
										<Phone
											size={16}
											strokeWidth={1.5}
											className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
											aria-hidden="true"
										/>
										<Input
											name="phone"
											value={userData?.phone}
											className="pl-8"
											disabled
											aria-label="Phone number"
										/>
									</div>
								</div>

								<div className="w-full">
									<div className="relative">
										<KeyRound
											size={16}
											strokeWidth={1.5}
											className="absolute left-2.5 top-4 -translate-y-1/2 text-zinc-500"
											aria-hidden="true"
										/>
										<MainInput
											name="code"
											placeholder="Enter temporary password"
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
									</div>
								</div>

								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Verifying..." : "Verify & Continue"}
								</Button>
							</form>
						)}
					</section>

					{/* Right Column - Information */}
					<section className="flex flex-col justify-center">
						<h1 className="text-2xl font-semibold mb-4">Welcome to Vendra.</h1>
						<p className="text-muted-foreground mb-6">
							Vendra is a radically new type of CRM. Built on an entirely new
							type of data architecture, you'll have profiles and records of
							every interaction within your network in minutes, always updated
							in real-time.
						</p>
						<p className="text-muted-foreground mb-6">
							You'll be able to customize and create your CRM{" "}
							<span className="italic">exactly</span> as you want it.
						</p>
						<p className="text-muted-foreground">Let's begin.</p>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Register;
