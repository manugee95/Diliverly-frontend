import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { KYCData } from '../App';
import { motion } from 'motion/react';
import { ShieldCheck, Camera, Upload, CheckCircle2, ChevronLeft } from 'lucide-react';

type Props = {
  onComplete: (data: KYCData) => void;
  onSkip: () => void;
  onBack: () => void;
};

export function AgentKYCVerification({ onComplete, onSkip, onBack }: Props) {
  const [formData, setFormData] = useState<KYCData>({
    nin: '',
    bvn: '',
    cac: '',
    facialVerified: false
  });
  const [facialCaptured, setFacialCaptured] = useState(false);

  const handleInputChange = (field: keyof KYCData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFacialVerification = () => {
    // Simulate facial recognition
    setFacialCaptured(true);
    setFormData(prev => ({ ...prev, facialVerified: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    return (
      (formData.nin?.trim() !== '' || true) &&
      (formData.bvn?.trim() !== '' || true) &&
      (formData.cac?.trim() !== '' || true) &&
      (formData.facialVerified || true)
    );
  };

  // Check if all fields are filled for complete verification
  const isFullyVerified = () => {
    return (
      formData.nin && formData.nin.trim() !== '' &&
      formData.bvn && formData.bvn.trim() !== '' &&
      formData.cac && formData.cac.trim() !== '' &&
      formData.facialVerified
    );
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
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="mb-2">KYC Verification</h1>
          <p className="text-gray-600">
            Verify your identity to build trust with vendors
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-green-600 rounded-full" />
            <div className="flex-1 h-2 bg-green-600 rounded-full" />
            <div className="flex-1 h-2 bg-green-600 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
          </div>
          <p className="text-sm text-gray-600">Step 3 of 4</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="nin">National Identity Number (NIN)</Label>
            <Input
              id="nin"
              type="text"
              placeholder="12345678901"
              maxLength={11}
              value={formData.nin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                handleInputChange('nin', value);
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your 11-digit NIN
            </p>
          </div>

          <div>
            <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
            <Input
              id="bvn"
              type="text"
              placeholder="12345678901"
              maxLength={11}
              value={formData.bvn}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                handleInputChange('bvn', value);
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your 11-digit BVN
            </p>
          </div>

          <div>
            <Label htmlFor="cac">Corporate Affairs Commission (CAC) Number</Label>
            <Input
              id="cac"
              type="text"
              placeholder="RC1234567"
              value={formData.cac}
              onChange={(e) => handleInputChange('cac', e.target.value.toUpperCase())}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your business registration number (required for verification badge)
            </p>
          </div>

          {/* Facial Recognition */}
          <div>
            <Label>Facial Recognition</Label>
            <div className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              facialCaptured ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'
            }`}>
              {facialCaptured ? (
                <div className="space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <p className="text-green-700">
                    Facial verification complete
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFacialCaptured(false);
                      setFormData(prev => ({ ...prev, facialVerified: false }));
                    }}
                  >
                    Retake
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-600">
                    Click below to capture your face for verification
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFacialVerification}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Start Facial Recognition
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Optional but Important:</strong> Complete KYC verification to start receiving delivery requests and earn a verification badge. CAC verification alongside other verifications is required for the badge.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onSkip}
              className="flex-1"
            >
              Skip for Now
            </Button>
            <Button
              type="submit"
              disabled={!isFullyVerified()}
              className="flex-1"
            >
              {isFullyVerified() ? 'Complete Verification' : 'Fill All Fields'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}