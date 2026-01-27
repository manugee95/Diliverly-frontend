import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { FileText, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Quote, AgentQuota } from '../../types';

type Props = {
  agentId: string;
  isVerified: boolean;
  quota: AgentQuota;
};

const mockQuotes: Quote[] = [
  {
    id: 'QUO-001',
    requestId: 'REQ-005',
    requestTitle: 'Furniture Delivery - Lagos',
    vendorName: 'Furniture Plus Ltd',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    addresses: [
      { id: '1', address: '10 Ikoyi, Lagos', deliveryType: 'PREPAID', cost: 12000 },
      { id: '2', address: '22 Lekki Phase 2', deliveryType: 'PREPAID', cost: 15000 },
      { id: '3', address: '34 Ajah', deliveryType: 'COD', cost: 18000 },
      { id: '4', address: '56 Victoria Island', deliveryType: 'PREPAID', cost: 10000 },
    ],
    totalAmount: 55000,
    status: 'pending',
    createdAt: '2025-11-10'
  },
  {
    id: 'QUO-002',
    requestId: 'REQ-006',
    requestTitle: 'Electronics - Lagos',
    vendorName: 'Tech World',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    addresses: [
      { id: '1', address: '45 Ikeja, Lagos', deliveryType: 'PREPAID', cost: 10000 },
      { id: '2', address: '78 Surulere', deliveryType: 'COD', cost: 12000 },
    ],
    totalAmount: 22000,
    status: 'accepted',
    createdAt: '2025-11-09'
  },
  {
    id: 'QUO-003',
    requestId: 'REQ-007',
    requestTitle: 'Office Supplies - Lagos',
    vendorName: 'Office Depot',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    addresses: [
      { id: '1', address: '12 Marina, Lagos', deliveryType: 'PREPAID', cost: 8000 },
      { id: '2', address: '34 CMS, Lagos', deliveryType: 'PREPAID', cost: 9000 },
    ],
    totalAmount: 17000,
    status: 'rejected',
    createdAt: '2025-11-08'
  }
];

export function AgentQuotes({ agentId, isVerified, quota }: Props) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'accepted': return CheckCircle;
      case 'rejected': return XCircle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Quotes</h2>
        <p className="text-gray-600">Manage your quotes and track submissions</p>
      </div>

      {/* Quota Banner */}
      {!quota.isPro && (
        <Card className={`p-4 ${quota.used >= quota.total ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <AlertCircle className={`w-5 h-5 mt-0.5 ${quota.used >= quota.total ? 'text-red-600' : 'text-blue-600'}`} />
              <div className="flex-1">
                <h4 className={quota.used >= quota.total ? 'text-red-900 mb-1' : 'text-blue-900 mb-1'}>
                  {quota.used >= quota.total ? 'Quota Limit Reached' : 'Monthly Quote Limit'}
                </h4>
                <p className={`text-sm mb-2 ${quota.used >= quota.total ? 'text-red-800' : 'text-blue-800'}`}>
                  {quota.used >= quota.total 
                    ? 'You have used all your free quotes for this month. Upgrade to Pro for unlimited quotes.'
                    : `You have used ${quota.used} of ${quota.total} free quotes this month.`
                  }
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
            >
              Upgrade to Pro - ₦7,500
            </Button>
          </div>
        </Card>
      )}

      {quota.isPro && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-green-900 mb-1">Pro Member</h4>
              <p className="text-sm text-green-800">
                You have unlimited quotes. Send as many quotes as you need!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Sent Quotes */}
      <div>
        <h3 className="mb-4">Sent Quotes ({mockQuotes.length})</h3>
        <div className="space-y-4">
          {mockQuotes.map((quote) => {
            const StatusIcon = getStatusIcon(quote.status);
            return (
              <Card key={quote.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <h4>{quote.requestTitle}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(quote.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {quote.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Quote ID: {quote.id}</p>
                      <p>Vendor: {quote.vendorName}</p>
                      <p>Total Amount: ₦{quote.totalAmount.toLocaleString()}</p>
                      <p>Submitted: {quote.createdAt}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedQuote(quote)}>
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* View Quote Dialog */}
      {selectedQuote && (
        <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Quote Details - {selectedQuote.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Request Title</p>
                  <p className="text-gray-900">{selectedQuote.requestTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(selectedQuote.status)}`}>
                    {selectedQuote.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vendor</p>
                  <p className="text-gray-900">{selectedQuote.vendorName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted Date</p>
                  <p className="text-gray-900">{selectedQuote.createdAt}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-3">Quote Breakdown ({selectedQuote.addresses.length} locations)</h4>
                <div className="space-y-2">
                  {selectedQuote.addresses.map((addr, index) => (
                    <div key={addr.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Location {index + 1}</p>
                        <p className="text-gray-900">{addr.address}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-600">
                          {addr.deliveryType}
                        </span>
                      </div>
                      <p className="text-gray-900">₦{addr.cost?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-green-900">Total Quote Amount</span>
                  <span className="text-green-900">₦{selectedQuote.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
