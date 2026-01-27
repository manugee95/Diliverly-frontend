import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Plus, X, Eye, MapPin, FileText, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { DeliveryRequest, Quote, DeliveryType } from '../../types';
import { AgentProfileView } from './AgentProfileView';
import { OrderSummary } from './OrderSummary';

type Props = {
  vendorId: string;
  onOrderCreated?: () => void;
};

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

const mockRequests: DeliveryRequest[] = [
  {
    id: 'REQ-001',
    title: 'Electronics Delivery - Lagos',
    description: 'Deliver phones to 3 locations in Lagos',
    state: 'Lagos',
    addresses: [
      { id: '1', address: '123 Allen Avenue, Ikeja', deliveryType: 'PREPAID' },
      { id: '2', address: '45 Victoria Island', deliveryType: 'COD' },
      { id: '3', address: '78 Lekki Phase 1', deliveryType: 'PREPAID' },
    ],
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    status: 'pending',
    createdAt: '2025-11-08',
    quotes: [
      {
        id: 'QUO-001',
        requestId: 'REQ-001',
        requestTitle: 'Electronics Delivery - Lagos',
        vendorName: 'Test Vendor',
        agentId: 'agent1',
        agentName: 'Swift Deliveries Ltd',
        agentInfo: {
          id: 'agent1',
          name: 'Swift Deliveries Ltd',
          email: 'swift@deliveries.com',
          phone: '+234 801 234 5678',
          statesCovered: ['Lagos', 'Ogun', 'Oyo'],
          verified: true,
          totalDeliveries: 45,
          rating: 4.8,
          trustScore: 95,
          reviews: [
            { id: '1', vendorName: 'Tech Store', rating: 5, comment: 'Excellent service, very professional', date: '2025-11-01' },
            { id: '2', vendorName: 'Fashion Hub', rating: 4, comment: 'Good delivery, slight delay', date: '2025-10-28' }
          ]
        },
        addresses: [
          { id: '1', address: '123 Allen Avenue, Ikeja', deliveryType: 'PREPAID', cost: 15000 },
          { id: '2', address: '45 Victoria Island', deliveryType: 'COD', cost: 15000 },
          { id: '3', address: '78 Lekki Phase 1', deliveryType: 'PREPAID', cost: 15000 },
        ],
        totalAmount: 45000,
        status: 'pending',
        createdAt: '2025-11-09'
      },
      {
        id: 'QUO-002',
        requestId: 'REQ-001',
        requestTitle: 'Electronics Delivery - Lagos',
        vendorName: 'Test Vendor',
        agentId: 'agent2',
        agentName: 'Express Logistics',
        agentInfo: {
          id: 'agent2',
          name: 'Express Logistics',
          email: 'express@logistics.com',
          phone: '+234 802 345 6789',
          statesCovered: ['Lagos', 'Ogun'],
          verified: true,
          totalDeliveries: 32,
          rating: 4.6,
          trustScore: 88,
          reviews: [
            { id: '1', vendorName: 'Office Depot', rating: 5, comment: 'Fast and reliable', date: '2025-10-30' }
          ]
        },
        addresses: [
          { id: '1', address: '123 Allen Avenue, Ikeja', deliveryType: 'PREPAID', cost: 12000 },
          { id: '2', address: '45 Victoria Island', deliveryType: 'COD', cost: 13000 },
          { id: '3', address: '78 Lekki Phase 1', deliveryType: 'PREPAID', cost: 14000 },
        ],
        totalAmount: 39000,
        status: 'pending',
        createdAt: '2025-11-09'
      }
    ]
  }
];

export function VendorRequests({ vendorId, onOrderCreated }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'assigned' | 'completed'>('all');
  const [requests, setRequests] = useState<DeliveryRequest[]>(mockRequests);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DeliveryRequest | null>(null);
  const [viewQuotesRequest, setViewQuotesRequest] = useState<DeliveryRequest | null>(null);
  const [selectedAgentInfo, setSelectedAgentInfo] = useState<any>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  
  // New request form state
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    state: '',
    addresses: [{ address: '', deliveryType: 'PREPAID' as DeliveryType }]
  });

  const handleAddAddress = () => {
    setNewRequest(prev => ({
      ...prev,
      addresses: [...prev.addresses, { address: '', deliveryType: 'PREPAID' as DeliveryType }]
    }));
  };

  const handleRemoveAddress = (index: number) => {
    setNewRequest(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleAddressChange = (index: number, field: 'address' | 'deliveryType', value: string) => {
    setNewRequest(prev => ({
      ...prev,
      addresses: prev.addresses.map((addr, i) => 
        i === index ? { ...addr, [field]: value } : addr
      )
    }));
  };

  const handleCreateRequest = () => {
    const request: DeliveryRequest = {
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
      title: newRequest.title,
      description: newRequest.description,
      state: newRequest.state,
      addresses: newRequest.addresses.filter(a => a.address.trim()).map((addr, i) => ({
        id: String(i + 1),
        address: addr.address,
        deliveryType: addr.deliveryType
      })),
      vendorId,
      vendorName: 'Test Vendor',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      quotes: []
    };

    setRequests([request, ...requests]);
    setIsCreateDialogOpen(false);
    setNewRequest({ title: '', description: '', state: '', addresses: [{ address: '', deliveryType: 'PREPAID' }] });
  };

  const handleAcceptQuote = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'assigned') return req.status === 'assigned' || req.status === 'in-progress';
    if (activeTab === 'completed') return req.status === 'completed' || req.status === 'cancelled';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'assigned': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Delivery Requests</h2>
          <p className="text-gray-600">Manage all your delivery requests</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Delivery Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Electronics Delivery - Lagos"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what needs to be delivered"
                  rows={3}
                  value={newRequest.description}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select value={newRequest.state} onValueChange={(value) => setNewRequest(prev => ({ ...prev, state: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Delivery Addresses</Label>
                  <Button type="button" size="sm" variant="outline" onClick={handleAddAddress}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Address
                  </Button>
                </div>
                <div className="space-y-3">
                  {newRequest.addresses.map((addressData, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label className="text-xs">Address {index + 1}</Label>
                            <Input
                              placeholder="Enter delivery address"
                              value={addressData.address}
                              onChange={(e) => handleAddressChange(index, 'address', e.target.value)}
                            />
                          </div>
                          {newRequest.addresses.length > 1 && (
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() => handleRemoveAddress(index)}
                              className="mt-5"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div>
                          <Label className="text-xs">Delivery Type</Label>
                          <Select 
                            value={addressData.deliveryType} 
                            onValueChange={(value) => handleAddressChange(index, 'deliveryType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PREPAID">PREPAID (Payment before delivery)</SelectItem>
                              <SelectItem value="COD">COD (Cash on Delivery)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleCreateRequest}
                  disabled={!newRequest.title || !newRequest.state || newRequest.addresses.filter(a => a.address.trim()).length === 0}
                >
                  Create Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {['all', 'pending', 'assigned', 'completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab} ({requests.filter(r => {
              if (tab === 'all') return true;
              if (tab === 'assigned') return r.status === 'assigned' || r.status === 'in-progress';
              if (tab === 'completed') return r.status === 'completed' || r.status === 'cancelled';
              return r.status === tab;
            }).length})
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4>{request.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  {request.quotes && request.quotes.length > 0 && request.status === 'pending' && (
                    <Badge variant="outline" className="gap-1">
                      <FileText className="w-3 h-3" />
                      {request.quotes.length} quotes
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {request.state}
                  </span>
                  <span>{request.addresses.length} locations</span>
                  <span>Created: {request.createdAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {request.status === 'pending' && request.quotes && request.quotes.length > 0 && (
                  <Button variant="default" size="sm" onClick={() => setViewQuotesRequest(request)}>
                    View {request.quotes.length} Quotes
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
            </div>

            {request.agentName && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Assigned to: <span className="text-gray-900">{request.agentName}</span>
                  {request.quotedAmount && (
                    <span className="ml-4">
                      Quote: <span className="text-gray-900">₦{request.quotedAmount.toLocaleString()}</span>
                    </span>
                  )}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* View Quotes Dialog */}
      {viewQuotesRequest && (
        <Dialog open={!!viewQuotesRequest} onOpenChange={() => setViewQuotesRequest(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Quotes for {viewQuotesRequest.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {viewQuotesRequest.quotes?.map((quote) => (
                <Card key={quote.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4>{quote.agentName}</h4>
                        {quote.agentInfo?.verified && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {quote.agentInfo?.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          Trust Score: {quote.agentInfo?.trustScore}%
                        </span>
                        <span>{quote.agentInfo?.totalDeliveries} deliveries</span>
                      </div>
                      <p className="text-gray-900 mb-2">Total: ₦{quote.totalAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Submitted: {quote.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedAgentInfo(quote.agentInfo)}
                      >
                        View Profile
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAcceptQuote(quote)}
                      >
                        Accept Quote
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* View Request Details Dialog */}
      {selectedRequest && !viewQuotesRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedRequest.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Request ID</Label>
                <p className="text-gray-900">{selectedRequest.id}</p>
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-gray-900">{selectedRequest.description}</p>
              </div>
              <div>
                <Label>State</Label>
                <p className="text-gray-900">{selectedRequest.state}</p>
              </div>
              <div>
                <Label>Status</Label>
                <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </span>
              </div>
              <div>
                <Label>Delivery Addresses ({selectedRequest.addresses.length})</Label>
                <div className="mt-2 space-y-2">
                  {selectedRequest.addresses.map((addr) => (
                    <div key={addr.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-900 mb-1">{addr.address}</p>
                      <Badge variant={addr.deliveryType === 'PREPAID' ? 'default' : 'secondary'}>
                        {addr.deliveryType}
                      </Badge>
                      {addr.cost && (
                        <p className="text-sm text-gray-600 mt-1">Cost: ₦{addr.cost.toLocaleString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Agent Profile View */}
      {selectedAgentInfo && (
        <AgentProfileView 
          agentInfo={selectedAgentInfo} 
          onClose={() => setSelectedAgentInfo(null)} 
        />
      )}

      {/* Order Summary & Payment */}
      {selectedQuote && (
        <OrderSummary 
          quote={selectedQuote} 
          request={viewQuotesRequest!}
          onClose={() => setSelectedQuote(null)}
          onPaymentComplete={() => {
            setSelectedQuote(null);
            setViewQuotesRequest(null);
            if (onOrderCreated) onOrderCreated();
          }}
        />
      )}
    </div>
  );
}
