import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BankDetails, KYCData } from '../../App';
import { Banknote, ShieldCheck, Save, CheckCircle2, Loader2, Camera } from 'lucide-react';

type Props = {
  bankDetails: BankDetails | null;
  kycData: KYCData | null;
  onUpdateBank: (data: BankDetails) => void;
  onUpdateKYC: (data: KYCData) => void;
};

const nigerianBanks = [
  'Access Bank', 'Citibank', 'Ecobank Nigeria', 'Fidelity Bank', 'First Bank of Nigeria',
  'First City Monument Bank (FCMB)', 'Guaranty Trust Bank (GTBank)', 'Heritage Bank',
  'Keystone Bank', 'Polaris Bank', 'Providus Bank', 'Stanbic IBTC Bank',
  'Standard Chartered', 'Sterling Bank', 'Union Bank of Nigeria', 'United Bank for Africa (UBA)',
  'Unity Bank', 'Wema Bank', 'Zenith Bank'
];

export function AgentKYCBank({ bankDetails, kycData, onUpdateBank, onUpdateKYC }: Props) {
  const [bankForm, setBankForm] = useState<BankDetails>({
    bankName: bankDetails?.bankName || '',
    accountNumber: bankDetails?.accountNumber || '',
    accountName: bankDetails?.accountName || ''
  });

  const [kycForm, setKYCForm] = useState<KYCData>({
    nin: kycData?.nin || '',
    bvn: kycData?.bvn || '',
    cac: kycData?.cac || '',
    facialVerified: kycData?.facialVerified || false
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [accountNameVerified, setAccountNameVerified] = useState(!!bankDetails?.accountName);
  const [facialCaptured, setFacialCaptured] = useState(kycData?.facialVerified || false);

  // Verify account name when bank and account number are provided
  useEffect(() => {
    if (bankForm.bankName && bankForm.accountNumber.length === 10) {
      setIsVerifying(true);
      setAccountNameVerified(false);
      
      setTimeout(() => {
        const mockAccountName = 'JOHN DOE ENTERPRISES';
        setBankForm(prev => ({ ...prev, accountName: mockAccountName }));
        setAccountNameVerified(true);
        setIsVerifying(false);
      }, 1500);
    } else {
      setBankForm(prev => ({ ...prev, accountName: '' }));
      setAccountNameVerified(false);
    }
  }, [bankForm.bankName, bankForm.accountNumber]);

  const handleSaveBank = () => {
    onUpdateBank(bankForm);
    alert('Bank details updated successfully!');
  };

  const handleSaveKYC = () => {
    onUpdateKYC(kycForm);
    alert('KYC information updated successfully!');
  };

  const handleFacialVerification = () => {
    setFacialCaptured(true);
    setKYCForm(prev => ({ ...prev, facialVerified: true }));
  };

  const isFullyVerified = !!(
    kycForm.nin && 
    kycForm.bvn && 
    kycForm.cac && 
    kycForm.facialVerified
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>KYC & Bank Details</h2>
        <p className="text-gray-600">Update your bank account and complete KYC verification</p>
      </div>

      {/* Verification Status */}
      {isFullyVerified && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="text-green-900">Verified Agent</h4>
              <p className="text-sm text-green-800">
                You have completed full KYC verification including CAC and earned the verification badge!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Bank Details Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Banknote className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3>Bank Account Details</h3>
            <p className="text-sm text-gray-600">Update your payout account information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Select
              value={bankForm.bankName}
              onValueChange={(value) => setBankForm(prev => ({ ...prev, bankName: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                {nigerianBanks.map(bank => (
                  <SelectItem key={bank} value={bank}>{bank}</SelectItem>
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
              value={bankForm.accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setBankForm(prev => ({ ...prev, accountNumber: value }));
              }}
            />
          </div>

          {/* Account Name Verification */}
          {bankForm.accountNumber.length === 10 && bankForm.bankName && (
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
                  {bankForm.accountName}
                </div>
              ) : null}
            </div>
          )}

          <Button onClick={handleSaveBank} disabled={!accountNameVerified} className="gap-2">
            <Save className="w-4 h-4" />
            Save Bank Details
          </Button>
        </div>
      </Card>

      {/* KYC Verification Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3>KYC Verification</h3>
            <p className="text-sm text-gray-600">Complete verification to earn the verification badge</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nin">National Identity Number (NIN)</Label>
            <Input
              id="nin"
              type="text"
              placeholder="12345678901"
              maxLength={11}
              value={kycForm.nin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setKYCForm(prev => ({ ...prev, nin: value }));
              }}
            />
          </div>

          <div>
            <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
            <Input
              id="bvn"
              type="text"
              placeholder="12345678901"
              maxLength={11}
              value={kycForm.bvn}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setKYCForm(prev => ({ ...prev, bvn: value }));
              }}
            />
          </div>

          <div>
            <Label htmlFor="cac">Corporate Affairs Commission (CAC) Number</Label>
            <Input
              id="cac"
              type="text"
              placeholder="RC1234567"
              value={kycForm.cac}
              onChange={(e) => setKYCForm(prev => ({ ...prev, cac: e.target.value.toUpperCase() }))}
            />
            <p className="text-xs text-gray-500 mt-1">
              Required for verification badge
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
                  <p className="text-green-700">Facial verification complete</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFacialCaptured(false);
                      setKYCForm(prev => ({ ...prev, facialVerified: false }));
                    }}
                  >
                    Retake
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-600">Click below to capture your face</p>
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
              <strong>Note:</strong> Complete all fields including CAC verification to earn the verification badge and start receiving requests.
            </p>
          </div>

          <Button 
            onClick={handleSaveKYC} 
            disabled={!isFullyVerified} 
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isFullyVerified ? 'Update KYC Information' : 'Complete All Fields'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
