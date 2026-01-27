import { Card } from '../ui/card';
import { FileText, Package, TrendingUp, Clock } from 'lucide-react';
import { Order } from '../../types';

type Props = {
  vendorName: string;
};

// Mock data for active orders
const mockActiveOrders: Order[] = [
  {
    id: 'ORD-001',
    requestId: 'REQ-001',
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    agentId: 'agent@example.com',
    agentName: 'Swift Deliveries Ltd',
    totalAmount: 45000,
    status: 'active',
    payoutDate: '2025-11-12',
    createdAt: '2025-11-10',
    items: [
      { id: '1', address: '123 Allen Avenue, Ikeja, Lagos', cost: 15000, status: 'delivered' },
      { id: '2', address: '45 Victoria Island, Lagos', cost: 15000, status: 'pending' },
      { id: '3', address: '78 Lekki Phase 1, Lagos', cost: 15000, status: 'pending' },
    ]
  },
  {
    id: 'ORD-002',
    requestId: 'REQ-002',
    vendorId: 'vendor@example.com',
    vendorName: 'Test Vendor',
    agentId: 'agent2@example.com',
    agentName: 'Express Logistics',
    totalAmount: 30000,
    status: 'active',
    payoutDate: '2025-11-11',
    createdAt: '2025-11-09',
    items: [
      { id: '1', address: '12 Wuse 2, Abuja', cost: 15000, status: 'delivered' },
      { id: '2', address: '34 Garki, Abuja', cost: 15000, status: 'delivered' },
    ]
  }
];

export function VendorDashboardHome({ vendorName }: Props) {
  const stats = [
    { label: 'Total Requests', value: '12', icon: FileText, color: 'bg-blue-500' },
    { label: 'Active Orders', value: '5', icon: Package, color: 'bg-green-500' },
    { label: 'Completed', value: '7', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Pending Quotes', value: '3', icon: Clock, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2>Welcome back, {vendorName}!</h2>
        <p className="text-gray-600">Here's what's happening with your deliveries today.</p>
      </div>

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
                    <p className="text-sm text-gray-600">Agent: {order.agentName}</p>
                    <p className="text-sm text-gray-600">Total Amount: ₦{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Payout Date</p>
                    <p className="text-sm text-gray-900">{order.payoutDate}</p>
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

                {/* Items Preview */}
                <div className="mt-4 space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm py-2 border-t border-gray-100">
                      <span className="text-gray-600 flex-1">{item.address}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
