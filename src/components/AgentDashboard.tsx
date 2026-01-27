import { useState } from 'react';
import { SignupData, AgentProfile, BankDetails, KYCData } from '../App';
import { DashboardLayout } from './DashboardLayout';
import { AgentDashboardHome } from './agent/AgentDashboardHome';
import { AgentQuotes } from './agent/AgentQuotes';
import { AgentOrders } from './agent/AgentOrders';
import { AgentWallet } from './agent/AgentWallet';
import { AgentKYCBank } from './agent/AgentKYCBank';
import { AgentSettings } from './agent/AgentSettings';

type Props = {
  userData: SignupData;
  profile: AgentProfile;
  bankDetails: BankDetails | null;
  kycData: KYCData | null;
};

export function AgentDashboard({ userData, profile, bankDetails, kycData }: Props) {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [profileData, setProfileData] = useState(profile);
  const [bankData, setBankData] = useState(bankDetails);
  const [kycInfo, setKycInfo] = useState(kycData);

  // Check if agent is verified (has CAC and all other verifications)
  const isVerified = !!(
    kycInfo?.cac && 
    kycInfo?.nin && 
    kycInfo?.bvn && 
    kycInfo?.facialVerified
  );

  // Mock quota data - in real app this would come from backend
  const [quota] = useState<import('../types').AgentQuota>({
    used: 45,
    total: 100,
    isPro: false
  });

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      window.location.reload();
    }
  };

  const handleUpdateProfile = (updatedProfile: AgentProfile) => {
    setProfileData(updatedProfile);
  };

  const handleUpdateBank = (updatedBank: BankDetails) => {
    setBankData(updatedBank);
  };

  const handleUpdateKYC = (updatedKYC: KYCData) => {
    setKycInfo(updatedKYC);
  };

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <AgentDashboardHome agentId={userData.email} agentName={profileData.businessName} isVerified={isVerified} quota={quota} />;
      case 'quotes':
        return <AgentQuotes agentId={userData.email} isVerified={isVerified} quota={quota} />;
      case 'orders':
        return <AgentOrders agentId={userData.email} isVerified={isVerified} />;
      case 'wallet':
        return <AgentWallet agentId={userData.email} />;
      case 'kyc':
        return <AgentKYCBank bankDetails={bankData} kycData={kycInfo} onUpdateBank={handleUpdateBank} onUpdateKYC={handleUpdateKYC} />;
      case 'settings':
        return <AgentSettings userData={userData} profile={profileData} onUpdate={handleUpdateProfile} />;
      default:
        return <AgentDashboardHome agentId={userData.email} agentName={profileData.businessName} isVerified={isVerified} quota={quota} />;
    }
  };

  return (
    <DashboardLayout
      userRole="agent"
      userName={`${userData.firstName} ${userData.lastName}`}
      currentModule={currentModule}
      onModuleChange={setCurrentModule}
      onLogout={handleLogout}
      isVerified={isVerified}
    >
      {renderModule()}
    </DashboardLayout>
  );
}