import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { SignupData, VendorProfile } from '../../App';
import { User, Building2, Save } from 'lucide-react';

type Props = {
  userData: SignupData;
  profile: VendorProfile;
  onUpdate: (profile: VendorProfile) => void;
};

export function VendorSettings({ userData, profile, onUpdate }: Props) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: profile.businessName,
    businessAddress: profile.businessAddress
  });

  const handleSavePersonalInfo = () => {
    alert('Personal information updated successfully!');
  };

  const handleSaveBusinessInfo = () => {
    onUpdate({
      businessName: businessInfo.businessName,
      businessAddress: businessInfo.businessAddress
    });
    alert('Business information updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Settings</h2>
        <p className="text-gray-600">Manage your account and profile settings</p>
      </div>

      {/* Personal Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3>Personal Information</h3>
            <p className="text-sm text-gray-600">Update your personal details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <Button onClick={handleSavePersonalInfo} className="gap-2">
            <Save className="w-4 h-4" />
            Save Personal Information
          </Button>
        </div>
      </Card>

      {/* Business Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3>Business Information</h3>
            <p className="text-sm text-gray-600">Update your business details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessInfo.businessName}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input
              id="businessAddress"
              value={businessInfo.businessAddress}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessAddress: e.target.value }))}
            />
          </div>

          <Button onClick={handleSaveBusinessInfo} className="gap-2">
            <Save className="w-4 h-4" />
            Save Business Information
          </Button>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="mb-4">Security</h3>
        <Button variant="outline">Change Password</Button>
      </Card>
    </div>
  );
}
