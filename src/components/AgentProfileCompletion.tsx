import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { AgentProfile } from '../App';
import { motion } from 'motion/react';
import { User, X, ChevronLeft } from 'lucide-react';
import { Badge } from './ui/badge';

type Props = {
  onComplete: (data: AgentProfile) => void;
  onBack: () => void;
};

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export function AgentProfileCompletion({ onComplete, onBack }: Props) {
  const [formData, setFormData] = useState<AgentProfile>({
    businessName: '',
    businessAddress: '',
    bio: '',
    statesCovered: []
  });
  const [stateInput, setStateInput] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const handleInputChange = (field: keyof AgentProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addState = (state: string) => {
    if (!formData.statesCovered.includes(state)) {
      setFormData(prev => ({
        ...prev,
        statesCovered: [...prev.statesCovered, state]
      }));
    }
    setStateInput('');
    setShowStateDropdown(false);
  };

  const removeState = (state: string) => {
    setFormData(prev => ({
      ...prev,
      statesCovered: prev.statesCovered.filter(s => s !== state)
    }));
  };

  const filteredStates = nigerianStates.filter(state =>
    state.toLowerCase().includes(stateInput.toLowerCase()) &&
    !formData.statesCovered.includes(state)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed()) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    return (
      formData.businessName.trim() !== '' &&
      formData.businessAddress.trim() !== '' &&
      formData.bio.trim() !== '' &&
      formData.statesCovered.length > 0
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
            <User className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="mb-2">Complete Your Agent Profile</h1>
          <p className="text-gray-600">
            Tell us about your delivery business to complete your account setup
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-green-600 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
            <div className="flex-1 h-2 bg-gray-200 rounded-full" />
          </div>
          <p className="text-sm text-gray-600">Step 1 of 4</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              type="text"
              placeholder="e.g., Swift Logistics"
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

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell vendors about your delivery experience and services..."
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 50 characters
            </p>
          </div>

          <div>
            <Label htmlFor="statesCovered">States Covered</Label>
            <div className="relative">
              <Input
                id="statesCovered"
                type="text"
                placeholder="Search and select states..."
                value={stateInput}
                onChange={(e) => {
                  setStateInput(e.target.value);
                  setShowStateDropdown(true);
                }}
                onFocus={() => setShowStateDropdown(true)}
              />
              {showStateDropdown && filteredStates.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredStates.map(state => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => addState(state)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {formData.statesCovered.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.statesCovered.map(state => (
                  <Badge key={state} variant="secondary" className="pl-3 pr-2 py-1">
                    {state}
                    <button
                      type="button"
                      onClick={() => removeState(state)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

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
              Continue
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}