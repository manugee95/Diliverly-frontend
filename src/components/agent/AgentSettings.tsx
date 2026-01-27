import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { SignupData, AgentProfile } from '../../App';
import { User, Building2, Save, X, Plus } from 'lucide-react';

type Props = {
  userData: SignupData;
  profile: AgentProfile;
  onUpdate: (profile: AgentProfile) => void;
};

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

export function AgentSettings({ userData, profile, onUpdate }: Props) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: profile.businessName,
    businessAddress: profile.businessAddress,
    bio: profile.bio,
    statesCovered: profile.statesCovered
  });

  const [stateInput, setStateInput] = useState('');

  const handleAddState = () => {
    if (stateInput && !businessInfo.statesCovered.includes(stateInput)) {
      setBusinessInfo(prev => ({
        ...prev,
        statesCovered: [...prev.statesCovered, stateInput]
      }));
      setStateInput('');
    }
  };

  const handleRemoveState = (state: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      statesCovered: prev.statesCovered.filter(s => s !== state)
    }));
  };

  const handleSavePersonalInfo = () => {
    alert('Personal information updated successfully!');
  };

  const handleSaveBusinessInfo = () => {
    onUpdate({
      businessName: businessInfo.businessName,
      businessAddress: businessInfo.businessAddress,
      bio: businessInfo.bio,
      statesCovered: businessInfo.statesCovered
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

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              placeholder="Tell vendors about your delivery service"
              value={businessInfo.bio}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>

          <div>
            <Label>States Covered for Delivery</Label>
            <div className="flex gap-2 mt-2 mb-3">
              <select
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="">Select a state</option>
                {nigerianStates
                  .filter(state => !businessInfo.statesCovered.includes(state))
                  .map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
              </select>
              <Button type="button" onClick={handleAddState} disabled={!stateInput}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {businessInfo.statesCovered.map(state => (
                <Badge key={state} variant="secondary" className="gap-1">
                  {state}
                  <button onClick={() => handleRemoveState(state)} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
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
