import { DashboardLayout } from "@/components/DashboardLayout";
import { http } from "@/helpers/http";
import { User, VendorProfile } from "@/types";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookiestore = await cookies();
	const accessToken = cookiestore.get("accessToken")?.value;
	let vendorProfile: VendorProfile | null = null;
	let user: User | null = null;

	try {
		const data: VendorProfile & { user: User } = await http.get(
			"/vendor/profile",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		vendorProfile = data;
		user = data.user;
		//console.log(data);
	} catch (error) {
		console.log(error);
	}

	if (!user) {
		return redirect("/auth/signin", RedirectType.replace);
	}

	return (
		<DashboardLayout
			userName={`${user?.firstName} ${user?.lastName}`}
			userRole="vendor">
			{children}
		</DashboardLayout>
	);
}
