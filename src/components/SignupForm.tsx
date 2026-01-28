"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SocialSignIn } from "./SocialSignIn";
import { motion } from "motion/react";
import { Store, Truck, CheckCircle2 } from "lucide-react";
import * as yup from "yup";
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from "formik";
import { http, HttpError } from "@/helpers/http";
import { Alert } from "./ui/alert";
import useAlert from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const signupSchema = yup.object({
	firstName: yup.string().trim().required("First name is required"),

	lastName: yup.string().trim().required("Last name is required"),

	email: yup
		.string()
		.trim()
		.email("Enter a valid email address")
		.required("Email is required"),

	phone: yup.string().trim().required("Phone number is required"),

	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),

	role: yup
		.mixed<"vendor" | "agent">()
		.oneOf(["vendor", "agent"], "Select a role")
		.required("User role is required"),
});

export type UserRole = "vendor" | "agent";

export type SignupData = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	role: UserRole | "";
};

export function SignupForm() {
	const { showAndHideAlert } = useAlert();
	const router = useRouter();

	const initialValues: SignupData = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		role: "vendor",
	};

	const handleSubmit = async (
		values: SignupData,
		{ setFieldError }: FormikHelpers<SignupData>
	) => {
		try {
			const res: any = await http.post("/users", values);
			//console.log(res);
			showAndHideAlert({ message: res.message, type: "success" });
			setTimeout(() => {
				router.replace(
					`/auth/verify-otp?email=${encodeURIComponent(values.email)}`
				);
			}, 500);
		} catch (error: any) {
			const err = error as HttpError;
			showAndHideAlert({ message: err.message, type: "error" });
			if (err.data && err.data.errors) {
				Object.keys(err.data.errors).forEach((k) => {
					setFieldError(k, err.data.errors[k][0]);
				});
			}
			//console.log(err.data);
		}
	};

	return (
		<div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
			<div className="w-full max-w-xl">
				{/* Header */}
				<div className="mb-8">
					<h1 className="mb-2">Create your account</h1>
					<p className="text-gray-600">
						Join DILIVERLY and start connecting with delivery partners
					</p>
				</div>

				{/* Social Sign In */}
				{/* <div className="mb-8">
					<SocialSignIn />
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-white px-4 text-gray-500">
								Or continue with email
							</span>
						</div>
					</div>
				</div> */}

				{/* Form */}
				<Formik
					validationSchema={signupSchema}
					onSubmit={handleSubmit}
					initialValues={initialValues}>
					{({ setFieldValue, isSubmitting, values, errors, handleChange }) => (
						<Form className="space-y-5">
							{/* User Role Selection */}
							<div>
								<Label>I am a</Label>
								<div className="grid grid-cols-2 gap-4 mt-2">
									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setFieldValue("role", "vendor", false)}
										className={`p-4 rounded-lg border-2 transition-all ${
											values.role === "vendor"
												? "border-blue-600 bg-blue-50"
												: "border-gray-200 hover:border-gray-300"
										}`}>
										<Store
											className={`w-8 h-8 mx-auto mb-2 ${
												values.role === "vendor"
													? "text-blue-600"
													: "text-gray-400"
											}`}
										/>
										<div
											className={
												values.role === "vendor"
													? "text-blue-600"
													: "text-gray-700"
											}>
											Vendor
										</div>
										<p className="text-xs text-gray-500 mt-1">
											I need delivery services
										</p>
									</motion.button>

									<motion.button
										type="button"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setFieldValue("role", "agent", false)}
										className={`p-4 rounded-lg border-2 transition-all ${
											values.role === "agent"
												? "border-blue-600 bg-blue-50"
												: "border-gray-200 hover:border-gray-300"
										}`}>
										<Truck
											className={`w-8 h-8 mx-auto mb-2 ${
												values.role === "agent"
													? "text-blue-600"
													: "text-gray-400"
											}`}
										/>
										<div
											className={
												values.role === "agent"
													? "text-blue-600"
													: "text-gray-700"
											}>
											Agent
										</div>
										<p className="text-xs text-gray-500 mt-1">
											I provide delivery services
										</p>
									</motion.button>
								</div>
							</div>

							{/* Name Fields */}
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col gap-y-2 w-full">
									<Label htmlFor="firstName">First Name</Label>
									<Input
										id="firstName"
										type="text"
										placeholder="John"
										value={values.firstName}
										name="firstName"
										onChange={handleChange}
									/>
									<ErrorMessage
										name="firstName"
										component={"p"}
										className="text-red-500 text-xs"
									/>
								</div>
								<div className="flex flex-col gap-y-2 w-full">
									<Label htmlFor="lastName">Last Name</Label>
									<Input
										id="lastName"
										type="text"
										placeholder="Doe"
										value={values.lastName}
										name="lastName"
										onChange={handleChange}
									/>
									<ErrorMessage
										name="lastName"
										component={"p"}
										className="text-red-500 text-xs"
									/>
								</div>
							</div>

							{/* Email */}
							<div className="flex flex-col gap-y-2 w-full">
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									placeholder="john@example.com"
									value={values.email}
									name="email"
									onChange={handleChange}
								/>
								<ErrorMessage
									name="email"
									component={"p"}
									className="text-red-500 text-xs"
								/>
							</div>

							{/* Phone */}
							<div className="flex flex-col gap-y-2 w-full">
								<Label htmlFor="phone">Phone Number</Label>
								<Input
									id="phone"
									type="tel"
									placeholder="+234 800 000 0000"
									value={values.phone}
									name="phone"
									onChange={handleChange}
								/>
								<ErrorMessage
									name="phone"
									component={"p"}
									className="text-red-500 text-xs"
								/>
							</div>

							{/* Password */}
							<div className="flex flex-col gap-y-2 w-full">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Create a strong password"
									value={values.password}
									name="password"
									onChange={handleChange}
								/>
								<p className="text-xs text-gray-500 mt-1">
									Must be at least 8 characters
								</p>
								<ErrorMessage
									name="password"
									component={"p"}
									className="text-red-500 text-xs"
								/>
							</div>

							{/* Submit Button */}
							<Button disabled={isSubmitting} type="submit" className="w-full">
								{isSubmitting ? (
									<>
										<CheckCircle2 className="w-4 h-4 mr-2 animate-spin" />
										Submitting...
									</>
								) : (
									"Create Account"
								)}{" "}
							</Button>
						</Form>
					)}
				</Formik>

				{/* Footer */}
				<p className="text-center mt-6 text-gray-600">
					Already have an account?{" "}
					<Link href="/auth/signin" className="text-blue-600 hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
