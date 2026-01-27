import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Package, Eye, Calendar, AlertCircle, Key, CheckCircle, XCircle, Bell } from 'lucide-react';
import { Order } from '../../types';

type Props = {
  agentId: string;
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
    totalAmount: 47250,
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
    ]
  },
  {
    id: 'ORD-002',
    requestId: 'REQ-002',
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    vendorPhone: '+234 801 111 2222',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    totalAmount: 31500,
    status: 'active',
    payoutDate: '2025-11-12',
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

export function AgentOrders({ agentId }: Props) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updateItemDialog, setUpdateItemDialog] = useState<{ orderId: string; itemId: string } | null>(null);
  const [deliveryPin, setDeliveryPin] = useState('');
  const [updateAction, setUpdateAction] = useState<'deliver' | 'cancel'>('deliver');

  const handleSendReminder = (orderId: string) => {
    alert('Reminder sent to vendor to provide delivery information');
  };

  const handleUpdateItem = () => {
    if (!updateItemDialog) return;

    const { orderId, itemId } = updateItemDialog;
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const item = order.items.find(i => i.id === itemId);
    if (!item) return;

    if (updateAction === 'deliver') {
      // Verify PIN
      if (deliveryPin !== item.deliveryPin) {
        alert('Invalid PIN! Please enter the correct delivery PIN.');
        return;
      }

      // Update item status
      const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
          const updatedItems = o.items.map(i => 
            i.id === itemId ? { ...i, status: 'delivered' as const } : i
          );
          return { ...o, items: updatedItems };
        }
        return o;
      });

      setOrders(updatedOrders);

      if (item.deliveryType === 'PREPAID') {
        alert(`Item marked as delivered! Payment of ₦${item.cost.toLocaleString()} has been added to your wallet.`);
      } else {
        alert('Item marked as delivered! Payment will be added to your wallet once vendor approves.');
      }
    } else {
      // Cancel item
      const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
          const updatedItems = o.items.map(i => 
            i.id === itemId ? { ...i, status: 'cancelled' as const } : i
          );
          return { ...o, items: updatedItems };
        }
        return o;
      });

      setOrders(updatedOrders);
      alert(`Item cancelled. Payment of ₦${item.cost.toLocaleString()} has been refunded to vendor wallet.`);
    }

    setUpdateItemDialog(null);
    setDeliveryPin('');
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
        <h2>My Orders</h2>
        <p className="text-gray-600">Manage orders assigned to you</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
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
                    <p>Vendor: {order.vendorName}</p>
                    <p>Phone: {order.vendorPhone}</p>
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
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendReminder(order.id)}
                    >
                      <Bell className="w-4 h-4 mr-1" />
                      Send Reminder
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
                      <strong>Waiting for vendor:</strong> The vendor has not provided delivery information yet. You can send a reminder.
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

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vendor</p>
                  <p className="text-gray-900">{selectedOrder.vendorName}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.vendorPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-gray-900">₦{selectedOrder.totalAmount.toLocaleString()}</p>
                </div>
                {selectedOrder.payoutDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payout Date</p>
                    <p className="text-green-600">{selectedOrder.payoutDate}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h4 className="mb-3">Delivery Items ({selectedOrder.items.length})</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-1">Item {index + 1}</p>
                          <p className="text-gray-900 mb-2">{item.address}</p>
                          <div className="flex gap-2">
                            <Badge variant={item.deliveryType === 'PREPAID' ? 'default' : 'secondary'}>
                              {item.deliveryType}
                            </Badge>
                            <span className={`px-3 py-1 rounded-full text-xs ${getItemStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-900">₦{item.cost.toLocaleString()}</p>
                      </div>

                      {/* Delivery Info */}
                      {item.deliveryInfo && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-600">Buyer Name</p>
                              <p className="text-sm text-gray-900">{item.deliveryInfo.buyerName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Buyer Phone</p>
                              <p className="text-sm text-gray-900">{item.deliveryInfo.buyerPhone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Item Name</p>
                              <p className="text-sm text-gray-900">{item.deliveryInfo.itemName}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">Quantity</p>
                              <p className="text-sm text-gray-900">{item.deliveryInfo.quantity}</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {item.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1"
                                onClick={() => {
                                  setUpdateItemDialog({ orderId: selectedOrder.id, itemId: item.id });
                                  setUpdateAction('deliver');
                                }}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark Delivered
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                className="flex-1"
                                onClick={() => {
                                  setUpdateItemDialog({ orderId: selectedOrder.id, itemId: item.id });
                                  setUpdateAction('cancel');
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
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

      {/* Update Item Dialog */}
      {updateItemDialog && (
        <Dialog open={true} onOpenChange={() => {
          setUpdateItemDialog(null);
          setDeliveryPin('');
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {updateAction === 'deliver' ? 'Mark as Delivered' : 'Cancel Delivery'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {updateAction === 'deliver' ? (
                <>
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Key className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-900">
                        <strong>Enter Delivery PIN:</strong> Request the PIN from the customer to verify delivery.
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label>Delivery PIN</Label>
                    <Input
                      type="text"
                      maxLength={4}
                      placeholder="Enter 4-digit PIN"
                      value={deliveryPin}
                      onChange={(e) => setDeliveryPin(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-900">
                      <strong>Cancel Delivery:</strong> The payment will be refunded to the vendor's wallet.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setUpdateItemDialog(null);
                    setDeliveryPin('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleUpdateItem}
                  disabled={updateAction === 'deliver' && deliveryPin.length !== 4}
                >
                  {updateAction === 'deliver' ? 'Confirm Delivery' : 'Confirm Cancellation'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
