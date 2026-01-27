import { Card } from '../ui/card';
import { Wallet as WalletIcon, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { WalletTransaction } from '../../types';

type Props = {
  vendorId: string;
};

const mockTransactions: WalletTransaction[] = [
  {
    id: 'TXN-001',
    type: 'credit',
    amount: 22500,
    description: 'Refund for cancelled order ORD-004',
    date: '2025-11-09',
    status: 'completed'
  },
  {
    id: 'TXN-002',
    type: 'credit',
    amount: 30000,
    description: 'Refund for cancelled order ORD-005',
    date: '2025-11-07',
    status: 'completed'
  },
  {
    id: 'TXN-003',
    type: 'credit',
    amount: 15000,
    description: 'Refund for cancelled order ORD-006',
    date: '2025-11-05',
    status: 'completed'
  }
];

export function VendorWallet({ vendorId }: Props) {
  const balance = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);

  const pendingTransactions = mockTransactions.filter(t => t.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Wallet</h2>
        <p className="text-gray-600">Manage your wallet and view transaction history</p>
      </div>

      {/* Wallet Info Card */}
      <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-green-100 mb-2">Available Balance</p>
            <h1 className="text-white">₦{balance.toLocaleString()}</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <WalletIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2 text-sm text-green-100">
          <p className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Cancelled delivery payments are credited to your wallet
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Auto-payout within 24 hours (business days only)
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Credits</p>
              <p className="text-gray-900">₦{balance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-gray-900">{pendingTransactions.length} transactions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-gray-900">{mockTransactions.length} total</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Box */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="text-blue-900 mb-2">How Wallet Works</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• When an agent cancels a delivery, the payment is refunded to your wallet</li>
          <li>• All approved delivery payments go to the agent's wallet</li>
          <li>• System auto-pays within 24 hours on business days only</li>
          <li>• You can withdraw funds from your wallet anytime</li>
        </ul>
      </Card>

      {/* Transaction History */}
      <div>
        <h3 className="mb-4">Transaction History</h3>
        <div className="space-y-3">
          {mockTransactions.length === 0 ? (
            <Card className="p-8 text-center">
              <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No transactions yet</p>
            </Card>
          ) : (
            mockTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        <TrendingUp className={`w-5 h-5 ${
                          transaction.type === 'credit' 
                            ? 'text-green-600' 
                            : 'text-red-600 rotate-180'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-gray-900 ${
                      transaction.type === 'credit' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
