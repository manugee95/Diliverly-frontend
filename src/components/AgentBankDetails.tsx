import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BankDetails } from '../App';
import { motion } from 'motion/react';
import { Banknote, ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react';

type Props = {
  onComplete: (data: BankDetails) => void;
  onBack: () => void;
};

const nigerianBanks = [
  'Access Bank',
  'Citibank',
  'Ecobank Nigeria',
  'Fidelity Bank',
  'First Bank of Nigeria',
  'First City Monument Bank (FCMB)',
  'Guaranty Trust Bank (GTBank)',
  'Heritage Bank',
  'Keystone Bank',
  'Polaris Bank',
  'Providus Bank',
  'Stanbic IBTC Bank',
  'Standard Chartered',
  'Sterling Bank',
  'Union Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Unity Bank',
  'Wema Bank',
  'Zenith Bank'
];

export function AgentBankDetails({ onComplete, onBack }: Props) {
  const [formData, setFormData] = useState<BankDetails>({
    bankName: '',
    accountNumber: '',
    accountName: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [accountNameVerified, setAccountNameVerified] = useState(false);

  // Simulate account name lookup when account number and bank are provided
  useEffect(() => {
    if (formData.bankName && formData.accountNumber.length === 10) {
      setIsVerifying(true);
      setAccountNameVerified(false);
      
      // Simulate API call to verify account
      setTimeout(() => {
        // Mock account name lookup
        const mockAccountName = 'JOHN DOE ENTERPRISES';
        setFormData(prev => ({ ...prev, accountName: mockAccountName }));
        setAccountNameVerified(true);
        setIsVerifying(false);
      }, 1500);
    } else {
      setFormData(prev => ({ ...prev, accountName: '' }));
      setAccountNameVerified(false);
    }
  }, [formData.bankName, formData.accountNumber]);

  const handleInputChange = (field: keyof BankDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    return (
      formData.bankName.trim() !== '' &&
      formData.accountNumber.trim() !== '' &&
      formData.accountNumber.length === 10 &&
      accountNameVerified
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
            <Banknote className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="mb-2">Bank Account Details</h1>
          <p className="text-gray-600">
            Add your bank account to receive payments from vendors
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-green-600 rounded-full" />
            <div className="flex-1 h-2 bg-green-600 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
          </div>
          <p className="text-sm text-gray-600">Step 2 of 4</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Select
              value={formData.bankName}
              onValueChange={(value) => handleInputChange('bankName', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                {nigerianBanks.map(bank => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="0123456789"
              maxLength={10}
              value={formData.accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                handleInputChange('accountNumber', value);
              }}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your 10-digit account number
            </p>
          </div>

          {/* Account Name Verification */}
          {formData.accountNumber.length === 10 && formData.bankName && (
            <div className={`border rounded-lg p-4 transition-all ${
              accountNameVerified ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
            }`}>
              <Label className="mb-2 block">Account Name</Label>
              {isVerifying ? (
                <div className="flex items-center text-gray-600">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying account...
                </div>
              ) : accountNameVerified ? (
                <div className="flex items-center text-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {formData.accountName}
                </div>
              ) : null}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!canProceed()}
              className="flex-1"
            >
              Continue to Verification
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}