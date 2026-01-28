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
import { setCookie } from "@/helpers/cookie";

export const signupSchema = yup.object({
	email: yup
		.string()
		.trim()
		.email("Enter a valid email address")
		.required("Email is required"),

	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
});

export type UserRole = "vendor" | "agent";

export type SignupData = {
	email: string;
	password: string;
};

export function SigninForm() {
	const { showAndHideAlert } = useAlert();
	const router = useRouter();

	const initialValues: SignupData = {
		email: "",
		password: "",
	};

	const handleSubmit = async (
		values: SignupData,
		{ setFieldError }: FormikHelpers<SignupData>
	) => {
		try {
			const res: any = await http.post("/auth/sign-in", values);

			//console.log(res);

			setCookie("accessToken", res.accessToken, {
				hours: 2,
				sameSite: "Lax",
			});

			setCookie("refreshToken", res.refreshToken, {
				days: 7,
				sameSite: "Lax",
			});

			showAndHideAlert({ message: res.message, type: "success" });

			setTimeout(() => {
				router.replace(`/`);
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
					<h1 className="mb-2">Welcome Back!</h1>
					<p className="text-gray-600">
						Sign in to access your dashboard and start connecting with delivery
						partners
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
									"Sign In"
								)}{" "}
							</Button>
						</Form>
					)}
				</Formik>

				{/* Footer */}
				<p className="text-center mt-6 text-gray-600">
					Don't have an account?{" "}
					<Link href="/auth/signup" className="text-blue-600 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
