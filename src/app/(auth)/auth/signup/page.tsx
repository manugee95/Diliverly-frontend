import { SignupForm } from "@/components/SignupForm";
import { StaticHero } from "@/components/StaticHero";
import React, { Suspense } from "react";

export default function page() {
	return (
		<Suspense>
			<div className="flex h-screen overflow-hidden bg-gray-50">
				<StaticHero />
				<SignupForm />
			</div>
		</Suspense>
	);
}
