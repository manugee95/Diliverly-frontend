import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { VendorProfile } from '../App';
import { motion } from 'motion/react';
import { Building2, ChevronLeft } from 'lucide-react';

type Props = {
  onComplete: (data: VendorProfile) => void;
  onBack: () => void;
};

export function VendorProfileCompletion({ onComplete, onBack }: Props) {
  const [formData, setFormData] = useState<VendorProfile>({
    businessName: '',
    businessAddress: ''
  });

  const handleInputChange = (field: keyof VendorProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              type="text"
              placeholder="e.g., ABC Store"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input
              id="businessAddress"
              type="text"
              placeholder="e.g., 123 Main Street, Lagos, Nigeria"
              value={formData.businessAddress}
              onChange={(e) => handleInputChange('businessAddress', e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!canProceed()}
            className="w-full"
          >
            Continue to Dashboard
          </Button>
          
          {/* Back Button */}
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </form>
      </motion.div>
    </div>
  );
}