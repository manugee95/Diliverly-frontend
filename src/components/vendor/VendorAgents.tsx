import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Users, Send, Star, MapPin, CheckCircle2, Plus, X } from 'lucide-react';
import { AgentConnection } from '../../types';

type Props = {
  vendorId: string;
};

const mockAgents: AgentConnection[] = [
  {
    id: 'agent1',
    name: 'Swift Deliveries Ltd',
    email: 'swift@deliveries.com',
    phone: '+234 801 234 5678',
    statesCovered: ['Lagos', 'Ogun', 'Oyo'],
    verified: true,
    totalDeliveries: 45,
    rating: 4.8
  },
  {
    id: 'agent2',
    name: 'Express Logistics',
    email: 'express@logistics.com',
    phone: '+234 802 345 6789',
    statesCovered: ['FCT', 'Kano', 'Kaduna'],
    verified: true,
    totalDeliveries: 32,
    rating: 4.6
  },
  {
    id: 'agent3',
    name: 'Fast Track Couriers',
    email: 'fasttrack@couriers.com',
    phone: '+234 803 456 7890',
    statesCovered: ['Rivers', 'Bayelsa', 'Delta'],
    verified: false,
    totalDeliveries: 12,
    rating: 4.2
  }
];

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

export function VendorAgents({ vendorId }: Props) {
  const [selectedAgent, setSelectedAgent] = useState<AgentConnection | null>(null);
  const [isDirectRequestOpen, setIsDirectRequestOpen] = useState(false);
  const [directRequest, setDirectRequest] = useState({
    title: '',
    description: '',
    state: '',
    addresses: ['']
  });

  const handleAddAddress = () => {
    setDirectRequest(prev => ({
      ...prev,
      addresses: [...prev.addresses, '']
    }));
  };

  const handleRemoveAddress = (index: number) => {
    setDirectRequest(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleAddressChange = (index: number, value: string) => {
    setDirectRequest(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => i === index ? value : addr)
    }));
  };

  const handleSendDirectRequest = () => {
    alert(`Direct request sent to ${selectedAgent?.name}`);
    setIsDirectRequestOpen(false);
    setDirectRequest({ title: '', description: '', state: '', addresses: [''] });
    setSelectedAgent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>My Agents</h2>
        <p className="text-gray-600">Manage your connected delivery agents</p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAgents.map((agent) => (
          <Card key={agent.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4>{agent.name}</h4>
                  {agent.verified && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-900">{agent.rating}</span>
                  <span className="text-sm text-gray-500">({agent.totalDeliveries} deliveries)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>{agent.email}</p>
              <p>{agent.phone}</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {agent.statesCovered.map((state, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {state}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              className="w-full gap-2" 
              onClick={() => {
                setSelectedAgent(agent);
                setIsDirectRequestOpen(true);
              }}
            >
              <Send className="w-4 h-4" />
              Send Direct Request
            </Button>
          </Card>
        ))}
      </div>

      {/* Direct Request Dialog */}
      {selectedAgent && (
        <Dialog open={isDirectRequestOpen} onOpenChange={setIsDirectRequestOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Send Direct Request to {selectedAgent.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  This request will be sent directly to {selectedAgent.name} and won't be visible to other agents.
                </p>
              </div>

              <div>
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Electronics Delivery - Lagos"
                  value={directRequest.title}
                  onChange={(e) => setDirectRequest(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what needs to be delivered"
                  rows={3}
                  value={directRequest.description}
                  onChange={(e) => setDirectRequest(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select value={directRequest.state} onValueChange={(value) => setDirectRequest(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedAgent.statesCovered.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  This agent covers: {selectedAgent.statesCovered.join(', ')}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Delivery Addresses</Label>
                  <Button type="button" size="sm" variant="outline" onClick={handleAddAddress}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Address
                  </Button>
                </div>
                <div className="space-y-2">
                  {directRequest.addresses.map((address, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Address ${index + 1}`}
                        value={address}
                        onChange={(e) => handleAddressChange(index, e.target.value)}
                      />
                      {directRequest.addresses.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveAddress(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => {
                    setIsDirectRequestOpen(false);
                    setSelectedAgent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 gap-2" 
                  onClick={handleSendDirectRequest}
                  disabled={!directRequest.title || !directRequest.state || directRequest.addresses.filter(a => a.trim()).length === 0}
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
