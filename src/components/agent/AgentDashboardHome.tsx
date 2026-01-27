import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { FileText, CheckCircle, TrendingUp, AlertCircle, Eye, Send } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { DeliveryRequest, Order, AgentQuota } from '../../types';

type Props = {
  agentId: string;
  agentName: string;
  isVerified: boolean;
  quota: AgentQuota;
};

const mockAvailableRequests: DeliveryRequest[] = [
  {
    id: 'REQ-005',
    title: 'Furniture Delivery - Lagos',
    description: 'Deliver furniture items to 4 locations',
    state: 'Lagos',
    addresses: [
      { id: '1', address: '10 Ikoyi, Lagos', deliveryType: 'PREPAID' },
      { id: '2', address: '22 Lekki Phase 2', deliveryType: 'PREPAID' },
      { id: '3', address: '34 Ajah', deliveryType: 'COD' },
      { id: '4', address: '56 Victoria Island', deliveryType: 'PREPAID' },
    ],
    vendorId: 'vendor2@example.com',
    vendorName: 'Furniture Plus Ltd',
    status: 'pending',
    createdAt: '2025-11-10'
  },
  {
    id: 'REQ-006',
    title: 'Electronics - Lagos',
    description: 'Deliver electronics to 2 locations',
    state: 'Lagos',
    addresses: [
      { id: '1', address: '45 Ikeja, Lagos', deliveryType: 'PREPAID' },
      { id: '2', address: '78 Surulere', deliveryType: 'COD' },
    ],
    vendorId: 'vendor3@example.com',
    vendorName: 'Tech World',
    status: 'pending',
    createdAt: '2025-11-10'
  },
  {
    id: 'REQ-007',
    title: 'Fashion Items - Lagos',
    description: 'Deliver fashion items to 3 locations',
    state: 'Lagos',
    addresses: [
      { id: '1', address: '15 Surulere', deliveryType: 'PREPAID' },
      { id: '2', address: '89 Yaba', deliveryType: 'COD' },
      { id: '3', address: '45 Apapa', deliveryType: 'PREPAID' },
    ],
    vendorId: 'vendor4@example.com',
    vendorName: 'Fashion Hub',
    status: 'pending',
    createdAt: '2025-11-09'
  },
  {
    id: 'REQ-008',
    title: 'Groceries - Lagos',
    description: 'Deliver groceries to 5 locations',
    state: 'Lagos',
    addresses: [
      { id: '1', address: '12 VI, Lagos', deliveryType: 'COD' },
      { id: '2', address: '34 Ikoyi', deliveryType: 'COD' },
      { id: '3', address: '56 Lekki', deliveryType: 'PREPAID' },
      { id: '4', address: '78 Ajah', deliveryType: 'COD' },
      { id: '5', address: '90 Ikeja', deliveryType: 'PREPAID' },
    ],
    vendorId: 'vendor5@example.com',
    vendorName: 'Fresh Mart',
    status: 'pending',
    createdAt: '2025-11-09'
  },
  {
    id: 'REQ-009',
    title: 'Books - Lagos',
    description: 'Deliver books to 2 locations',
    state: 'Lagos',
    addresses: [
      { id: '1', address: '23 Yaba, Lagos', deliveryType: 'PREPAID' },
      { id: '2', address: '67 Surulere', deliveryType: 'PREPAID' },
    ],
    vendorId: 'vendor6@example.com',
    vendorName: 'Book Store',
    status: 'pending',
    createdAt: '2025-11-08'
  }
];

const mockActiveOrders: Order[] = [
  {
    id: 'ORD-001',
    requestId: 'REQ-001',
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    vendorPhone: '+234 801 234 5678',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    totalAmount: 45000,
    status: 'active',
    payoutDate: '2025-11-12',
    createdAt: '2025-11-10',
    deliveryInfoProvided: true,
    items: [
      { id: '1', address: '123 Allen Avenue, Ikeja, Lagos', deliveryType: 'PREPAID', cost: 15000, status: 'delivered' },
      { id: '2', address: '45 Victoria Island, Lagos', deliveryType: 'PREPAID', cost: 15000, status: 'pending' },
      { id: '3', address: '78 Lekki Phase 1, Lagos', deliveryType: 'COD', cost: 15000, status: 'pending' },
    ]
  }
];

export function AgentDashboardHome({ agentId, agentName, isVerified, quota }: Props) {
  const [selectedRequest, setSelectedRequest] = useState<DeliveryRequest | null>(null);
  const [quoteAmounts, setQuoteAmounts] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate pagination
  const totalPages = Math.ceil(mockAvailableRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRequests = mockAvailableRequests.slice(startIndex, endIndex);

  const stats = [
    { label: 'Available Requests', value: '8', icon: FileText, color: 'bg-blue-500' },
    { label: 'Active Orders', value: '3', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Quotes Sent', value: '5', icon: Send, color: 'bg-purple-500' },
    { label: 'Completed', value: '24', icon: TrendingUp, color: 'bg-amber-500' },
  ];

  const handleQuoteAmountChange = (addressId: string, amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    setQuoteAmounts(prev => ({ ...prev, [addressId]: numAmount }));
  };

  const calculateTotal = () => {
    if (!selectedRequest) return 0;
    return selectedRequest.addresses.reduce((sum, addr) => {
      return sum + (quoteAmounts[addr.id] || 0);
    }, 0);
  };

  const handleSubmitQuote = () => {
    if (quota.used >= quota.total && !quota.isPro) {
      alert('You have reached your monthly quota limit. Upgrade to Pro for unlimited quotes.');
      return;
    }
    alert(`Quote submitted for ${calculateTotal().toLocaleString()} NGN`);
    setSelectedRequest(null);
    setQuoteAmounts({});
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2>Welcome back, {agentName}!</h2>
        <p className="text-gray-600">Here's what's happening with your deliveries today.</p>
      </div>

      {/* Verification Alert */}
      {!isVerified && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-amber-900 mb-1">Complete KYC Verification</h4>
              <p className="text-sm text-amber-800 mb-2">
                Complete your KYC verification including CAC to start receiving requests and earn a verification badge.
              </p>
              <Button size="sm" variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-100">
                Complete Verification
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Available Requests */}
      <div>
        <h3 className="mb-4">Available Requests</h3>
        {!isVerified ? (
          <Card className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">Complete KYC verification to view available requests</p>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedRequests.map((request) => (
                <Card key={request.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="mb-2">{request.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>State: {request.state}</span>
                        <span>{request.addresses.length} locations</span>
                        <span>Vendor: {request.vendorName}</span>
                      </div>
                    </div>
                    <Button onClick={() => setSelectedRequest(request)}>
                      <Send className="w-4 h-4 mr-1" />
                      Send Quote
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index + 1}>
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={currentPage === index + 1}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>

      {/* Active Orders */}
      <div>
        <h3 className="mb-4">Active Orders</h3>
        <div className="space-y-4">
          {mockActiveOrders.map((order) => {
            const deliveredItems = order.items.filter(item => item.status === 'delivered').length;
            const totalItems = order.items.length;
            
            return (
              <Card key={order.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4>{order.id}</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Vendor: {order.vendorName}</p>
                    <p className="text-sm text-gray-600">Total Amount: ₦{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Payout Date</p>
                    <p className="text-sm text-green-600">{order.payoutDate}</p>
                  </div>
                </div>
                
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivery Progress</span>
                    <span className="text-gray-900">{deliveredItems}/{totalItems} completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${(deliveredItems / totalItems) * 100}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quote Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Send Quote - {selectedRequest.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Vendor</p>
                <p className="text-gray-900">{selectedRequest.vendorName}</p>
                <p className="text-sm text-gray-600 mt-2 mb-1">Description</p>
                <p className="text-gray-900">{selectedRequest.description}</p>
              </div>

              <div>
                <h4 className="mb-3">Enter Cost for Each Address</h4>
                <div className="space-y-3">
                  {selectedRequest.addresses.map((addr, index) => (
                    <div key={addr.id} className="p-4 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Location {index + 1}</p>
                      <p className="text-gray-900 mb-3">{addr.address}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">₦</span>
                        <Input
                          type="number"
                          placeholder="Enter cost"
                          value={quoteAmounts[addr.id] || ''}
                          onChange={(e) => handleQuoteAmountChange(addr.id, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-900">Total Quote Amount</span>
                  <span className="text-green-900">₦{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedRequest(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 gap-2"
                  onClick={handleSubmitQuote}
                  disabled={calculateTotal() === 0}
                >
                  <Send className="w-4 h-4" />
                  Submit Quote
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}