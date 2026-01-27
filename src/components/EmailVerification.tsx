"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { Mail, CheckCircle2 } from "lucide-react";
import useAlert from "@/hooks/useAlert";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { http } from "@/helpers/http";
import { OtpInput } from "./OTPInput";

export const otpSchema = yup.object({
	code: yup.string().trim().required("Code is required").length(6),
	email: yup
		.string()
		.trim()
		.email("Enter a valid email address")
		.required("Email is required"),
});

type VerifyOtpData = {
	code: string;
	email: string;
};

export function EmailVerification() {
	const [code, setCode] = useState(["", "", "", "", "", ""]);

	const { showAndHideAlert } = useAlert();
	const router = useRouter();

	const params = useSearchParams();
	const email = params.get("email");

	const handleCodeChange = (index: number, value: string) => {
		if (value.length > 1) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		// Auto-focus next input
		if (value && index < 5) {
			const nextInput = document.getElementById(`code-${index + 1}`);
			nextInput?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			const prevInput = document.getElementById(`code-${index - 1}`);
			prevInput?.focus();
		}
	};

	const initialValues: VerifyOtpData = {
		code: "",
		email: email ?? "",
	};

	const handleSubmit = async (values: VerifyOtpData) => {
		try {
			const res: any = await http.post("/users/verify-email", values);
			//console.log(res);
			showAndHideAlert({ message: res.message, type: "success" });
			setTimeout(() => {
				router.replace(
					`/auth/verify-otp?email=${encodeURIComponent(values.email)}`
				);
			}, 500);
		} catch (error) {
			console.log(error);
		}
	};

	const handleResendCode = () => {
		// Simulate resending code
		alert("Verification code resent to your email");
	};

	const isComplete = code.every((digit) => digit !== "");

	return (
		<div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md">
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
						<Mail className="w-8 h-8 text-green-600" />
					</div>
					<h1 className="mb-2">Verify Your Email</h1>
					<p className="text-gray-600">
						We've sent a 6-digit verification code to your email address. Please
						enter it below.
					</p>
				</div>

				{/* Form */}
				<Formik
					validationSchema={otpSchema}
					onSubmit={handleSubmit}
					initialValues={initialValues}>
					{({ isSubmitting, errors, setFieldValue, values, handleSubmit }) => (
						<Form className="space-y-6">
							<div>
								<Label className="block text-center mb-3">
									Enter Verification Code
								</Label>
								<div className="flex gap-2 justify-center">
									<OtpInput
										value={values.code}
										onComplete={(code) => {
											setFieldValue("code", code);
											setTimeout(() => {
												handleSubmit();
											}, 200);
										}}
									/>

									<ErrorMessage
										name="code"
										component="p"
										className="text-sm text-red-500 text-center mt-2"
									/>
								</div>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting || values.code.length !== 6}
								className="w-full">
								{isSubmitting ? (
									<>
										<CheckCircle2 className="w-4 h-4 mr-2 animate-spin" />
										Verifying...
									</>
								) : (
									"Verify Email"
								)}
							</Button>

							<div className="text-center">
								<p className="text-sm text-gray-600 mb-2">
									Didn't receive the code?
								</p>
								<Button
									type="button"
									variant="link"
									onClick={handleResendCode}
									className="text-green-600">
									Resend Code
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</motion.div>
		</div>
	);
}
