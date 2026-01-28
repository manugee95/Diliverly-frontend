import { ReactNode, useState } from "react";
import { User, VendorProfile } from "@/types";
import { DashboardLayout } from "./DashboardLayout";
import { VendorDashboardHome } from "./vendor/VendorDashboardHome";
import { VendorRequests } from "./vendor/VendorRequests";
import { VendorOrders } from "./vendor/VendorOrders";
import { VendorAgents } from "./vendor/VendorAgents";
import { VendorWallet } from "./vendor/VendorWallet";
import { VendorSettings } from "./vendor/VendorSettings";

type Props = {
	userData: User;
	profile: VendorProfile;
	children: ReactNode;
};

export function VendorDashboard({ userData, profile }: Props) {
	const [currentModule, setCurrentModule] = useState("dashboard");
	const [profileData, setProfileData] = useState(profile);

	const handleLogout = () => {
		if (confirm("Are you sure you want to logout?")) {
			window.location.reload();
		}
	};

	const handleUpdateProfile = (updatedProfile: VendorProfile) => {
		setProfileData(updatedProfile);
	};

	// const renderModule = () => {
	// 	switch (currentModule) {
	// 		case "dashboard":
	// 			return <VendorDashboardHome vendorName={profileData.businessName} />;
	// 		case "requests":
	// 			return <VendorRequests vendorId={userData.email} />;
	// 		case "orders":
	// 			return <VendorOrders vendorId={userData.email} />;
	// 		case "agents":
	// 			return <VendorAgents vendorId={userData.email} />;
	// 		case "wallet":
	// 			return <VendorWallet vendorId={userData.email} />;
	// 		case "settings":
	// 			return (
	// 				<VendorSettings
	// 					userData={userData}
	// 					profile={profileData}
	// 					onUpdate={handleUpdateProfile}
	// 				/>
	// 			);
	// 		default:
	// 			return <VendorDashboardHome vendorName={profileData.businessName} />;
	// 	}
	// };

	return (
		<DashboardLayout
			userRole="vendor"
			userName={`${userData.firstName} ${userData.lastName}`}>
			<VendorDashboardHome />
		</DashboardLayout>
	);
}
