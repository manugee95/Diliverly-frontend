"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { VendorProfile } from "@/types";
import { motion } from "motion/react";
import { Building2, ChevronLeft, CheckCircle2 } from "lucide-react";
import * as yup from "yup";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import { http, HttpError } from "@/helpers/http";
import useAlert from "@/hooks/useAlert";
import { useRouter } from "next/navigation";

export const vendorProfileSchema = yup.object({
	businessName: yup.string().trim().required("Business Name is required"),

	address: yup.string().trim().required("Business Address is required"),
});

export function VendorProfileCompletion() {
	const { showAndHideAlert } = useAlert();
	const router = useRouter();

	const initialValues: VendorProfile = {
		businessName: "",
		address: "",
	};

	const handleSubmit = async (
		values: VendorProfile,
		{ setSubmitting }: FormikHelpers<VendorProfile>
	) => {
		try {
			const res = await http.patch<VendorProfile, VendorProfile>(
				"/vendor/profile",
				values
			);

			showAndHideAlert({
				message: "Business profile updated successfully",
				type: "success",
			});

			router.refresh();
		} catch (error) {
			const err = error as HttpError;
			showAndHideAlert({
				message: err.message,
				type: "error",
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-xl">
				{/* Header */}
				<div className="mb-8">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
						<Building2 className="w-8 h-8 text-green-600" />
					</div>
					<h1 className="mb-2">Complete Your Business Profile</h1>
					<p className="text-gray-600">
						Tell us about your business to complete your vendor account setup
					</p>
				</div>

				{/* Progress */}
				<div className="mb-8">
					<div className="flex items-center gap-2 mb-2">
						<div className="flex-1 h-2 bg-green-600 rounded-full" />
						<div className="flex-1 h-2 bg-gray-200 rounded-full" />
					</div>
					<p className="text-sm text-gray-600">Step 1 of 2</p>
				</div>

				{/* Form */}
				<Formik
					initialValues={initialValues}
					validationSchema={vendorProfileSchema}
					onSubmit={handleSubmit}>
					{({ values, handleChange, isSubmitting }) => (
						<Form className="space-y-5">
							{/* Business Name */}
							<div className="flex flex-col gap-y-2">
								<Label htmlFor="businessName">Business Name</Label>
								<Input
									id="businessName"
									name="businessName"
									type="text"
									placeholder="e.g., ABC Store"
									value={values.businessName}
									onChange={handleChange}
								/>
								<ErrorMessage
									name="businessName"
									component="p"
									className="text-red-500 text-xs"
								/>
							</div>

							{/* Address */}
							<div className="flex flex-col gap-y-2">
								<Label htmlFor="address">Business Address</Label>
								<Input
									id="address"
									name="address"
									type="text"
									placeholder="e.g., 123 Main Street, Lagos, Nigeria"
									value={values.address}
									onChange={handleChange}
								/>
								<ErrorMessage
									name="address"
									component="p"
									className="text-red-500 text-xs"
								/>
							</div>

							{/* Submit */}
							<Button type="submit" disabled={isSubmitting} className="w-full">
								{isSubmitting ? (
									<>
										<CheckCircle2 className="w-4 h-4 mr-2 animate-spin" />
										Saving...
									</>
								) : (
									"Continue to Dashboard"
								)}
							</Button>

							{/* Back */}
							{/* <Button
								type="button"
								variant="outline"
								onClick={onBack}
								className="w-full">
								<ChevronLeft className="w-4 h-4 mr-2" />
								Back
							</Button> */}
						</Form>
					)}
				</Formik>
			</motion.div>
		</div>
	);
}
