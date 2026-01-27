import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Package, Eye, Calendar, AlertCircle, Key, CheckCircle, Star } from 'lucide-react';
import { Order, DeliveryInfo } from '../../types';
import { Textarea } from '../ui/textarea';

type Props = {
  vendorId: string;
};

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    requestId: 'REQ-001',
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    vendorPhone: '+234 801 111 2222',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    totalAmount: 47250, // 45000 + 5%
    status: 'pending-info',
    createdAt: '2025-11-10',
    deliveryInfoProvided: false,
    items: [
      { 
        id: '1', 
        address: '123 Allen Avenue, Ikeja, Lagos', 
        deliveryType: 'PREPAID',
        cost: 15000, 
        status: 'pending'
      },
      { 
        id: '2', 
        address: '45 Victoria Island, Lagos', 
        deliveryType: 'COD',
        cost: 15000, 
        status: 'pending'
      },
      { 
        id: '3', 
        address: '78 Lekki Phase 1, Lagos', 
        deliveryType: 'PREPAID',
        cost: 15000, 
        status: 'pending'
      },
    ]
  },
  {
    id: 'ORD-002',
    requestId: 'REQ-002',
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    vendorPhone: '+234 801 111 2222',
    agentId: 'agent2@example.com',
    agentName: 'Express Logistics',
    totalAmount: 31500,
    status: 'active',
    payoutDate: '2025-11-11',
    createdAt: '2025-11-09',
    deliveryInfoProvided: true,
    items: [
      { 
        id: '1', 
        address: '12 Wuse 2, Abuja', 
        deliveryType: 'PREPAID',
        cost: 15000, 
        status: 'delivered',
        deliveryInfo: {
          buyerName: 'John Doe',
          buyerPhone: '+234 801 234 5678',
          itemName: 'Laptop',
          quantity: 1
        },
        deliveryPin: '8374'
      },
      { 
        id: '2', 
        address: '34 Garki, Abuja', 
        deliveryType: 'COD',
        cost: 15000, 
        status: 'pending',
        deliveryInfo: {
          buyerName: 'Jane Smith',
          buyerPhone: '+234 802 345 6789',
          itemName: 'Office Chair',
          quantity: 2
        },
        deliveryPin: '5291'
      },
    ]
  }
];

export function VendorOrders({ vendorId }: Props) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending-info' | 'active' | 'completed'>('all');
  const [providingInfo, setProvidingInfo] = useState(false);
  const [deliveryInfoForms, setDeliveryInfoForms] = useState<{ [key: string]: DeliveryInfo }>({});
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return order.status === 'completed' || order.status === 'cancelled';
    return order.status === activeTab;
  });

  const handleDeliveryInfoChange = (itemId: string, field: keyof DeliveryInfo, value: string | number) => {
    setDeliveryInfoForms(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const handleSubmitDeliveryInfo = () => {
    if (!selectedOrder) return;
    
    const updatedOrder = {
      ...selectedOrder,
      status: 'active' as const,
      deliveryInfoProvided: true,
      items: selectedOrder.items.map(item => ({
        ...item,
        deliveryInfo: deliveryInfoForms[item.id],
        deliveryPin: Math.floor(1000 + Math.random() * 9000).toString()
      }))
    };

    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    setProvidingInfo(false);
    setSelectedOrder(null);
    setDeliveryInfoForms({});
    alert('Delivery information submitted! Agent can now start delivery.');
  };

  const handleApproveCompletion = () => {
    if (!completedOrder) return;
    
    const updatedOrder = {
      ...completedOrder,
      status: 'completed' as const
    };

    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    // Show rating dialog (implemented inline)
  };

  const handleSubmitRating = () => {
    alert(`Rating submitted: ${rating} stars - ${review}`);
    setCompletedOrder(null);
    setRating(0);
    setReview('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending-info': return 'bg-amber-100 text-amber-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Orders</h2>
        <p className="text-gray-600">View all order information and delivery items</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {['all', 'pending-info', 'active', 'completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.replace('-', ' ')} ({orders.filter(o => {
              if (tab === 'all') return true;
              if (tab === 'completed') return o.status === 'completed' || o.status === 'cancelled';
              return o.status === tab;
            }).length})
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const deliveredItems = order.items.filter(item => item.status === 'delivered').length;
          const totalItems = order.items.length;

          return (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <h4>{order.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Request ID: {order.requestId}</p>
                    <p>Agent: {order.agentName}</p>
                    <p>Total Amount: ₦{order.totalAmount.toLocaleString()}</p>
                    <p>Created: {order.createdAt}</p>
                    {order.payoutDate && (
                      <p className="flex items-center gap-1 text-green-600">
                        <Calendar className="w-4 h-4" />
                        Payout Date: {order.payoutDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {order.status === 'pending-info' && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => {
                        setSelectedOrder(order);
                        setProvidingInfo(true);
                      }}
                    >
                      Provide Delivery Info
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                    <Eye className="w-4 h-4 mr-1" />
                    View Items
                  </Button>
                </div>
              </div>

              {/* Alert for pending info */}
              {order.status === 'pending-info' && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-amber-900">
                      <strong>Action Required:</strong> Provide delivery information for each location to start delivery.
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {order.status === 'active' && (
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivery Progress</span>
                    <span className="text-gray-900">{deliveredItems}/{totalItems} delivered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${(deliveredItems / totalItems) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Provide Delivery Info Dialog */}
      {providingInfo && selectedOrder && (
        <Dialog open={true} onOpenChange={() => setProvidingInfo(false)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Provide Delivery Information - {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Please provide delivery information for each location. A unique PIN will be generated for each delivery that you must share with your customers.
                </p>
              </div>

              {selectedOrder.items.map((item, index) => (
                <Card key={item.id} className="p-4">
                  <h4 className="mb-3">Location {index + 1}</h4>
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                    <p className="text-gray-900">{item.address}</p>
                    <Badge variant={item.deliveryType === 'PREPAID' ? 'default' : 'secondary'} className="mt-2">
                      {item.deliveryType}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Buyer Name</Label>
                      <Input
                        placeholder="Enter buyer name"
                        onChange={(e) => handleDeliveryInfoChange(item.id, 'buyerName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Buyer Phone</Label>
                      <Input
                        placeholder="+234 801 234 5678"
                        onChange={(e) => handleDeliveryInfoChange(item.id, 'buyerPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Item Name</Label>
                      <Input
                        placeholder="What is being delivered"
                        onChange={(e) => handleDeliveryInfoChange(item.id, 'itemName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        placeholder="1"
                        onChange={(e) => handleDeliveryInfoChange(item.id, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setProvidingInfo(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSubmitDeliveryInfo}>
                  Submit & Start Delivery
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Order Details Dialog */}
      {selectedOrder && !providingInfo && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Request ID</p>
                  <p className="text-gray-900">{selectedOrder.requestId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Agent</p>
                  <p className="text-gray-900">{selectedOrder.agentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-gray-900">₦{selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="mb-3">Delivery Items ({selectedOrder.items.length})</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-1">Item {index + 1}</p>
                          <p className="text-gray-900 mb-2">{item.address}</p>
                          <Badge variant={item.deliveryType === 'PREPAID' ? 'default' : 'secondary'}>
                            {item.deliveryType}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900 mb-2">₦{item.cost.toLocaleString()}</p>
                          <span className={`px-3 py-1 rounded-full text-xs ${getItemStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      {item.deliveryInfo && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">Buyer</p>
                              <p className="text-gray-900">{item.deliveryInfo.buyerName}</p>
                              <p className="text-gray-600 text-xs">{item.deliveryInfo.buyerPhone}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Item</p>
                              <p className="text-gray-900">{item.deliveryInfo.itemName}</p>
                              <p className="text-gray-600 text-xs">Qty: {item.deliveryInfo.quantity}</p>
                            </div>
                          </div>

                          {/* Delivery PIN */}
                          {item.deliveryPin && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Key className="w-4 h-4 text-green-600" />
                                <p className="text-sm text-green-900">Delivery PIN</p>
                              </div>
                              <p className="text-2xl text-green-600 tracking-wider">{item.deliveryPin}</p>
                              <p className="text-xs text-green-700 mt-1">Share this PIN with {item.deliveryInfo.buyerName}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rating Dialog */}
      {completedOrder && (
        <Dialog open={true} onOpenChange={() => setCompletedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rate Agent - {completedOrder.agentName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Review</Label>
                <Textarea
                  rows={4}
                  placeholder="Share your experience with this agent"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleSubmitRating} disabled={rating === 0}>
                Submit Rating
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
