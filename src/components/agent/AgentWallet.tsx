import { Card } from '../ui/card';
import { Wallet as WalletIcon, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { WalletTransaction } from '../../types';

type Props = {
  agentId: string;
};

const mockTransactions: WalletTransaction[] = [
  {
    id: 'TXN-001',
    type: 'credit',
    amount: 45000,
    description: 'Payment for order ORD-001',
    date: '2025-11-12',
    status: 'pending'
  },
  {
    id: 'TXN-002',
    type: 'credit',
    amount: 30000,
    description: 'Payment for order ORD-002',
    date: '2025-11-11',
    status: 'pending'
  },
  {
    id: 'TXN-003',
    type: 'credit',
    amount: 30000,
    description: 'Payment for order ORD-003',
    date: '2025-11-06',
    status: 'completed'
  },
  {
    id: 'TXN-004',
    type: 'credit',
    amount: 25000,
    description: 'Payment for order ORD-007',
    date: '2025-11-04',
    status: 'completed'
  }
];

export function AgentWallet({ agentId }: Props) {
  const completedBalance = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);

  const pendingBalance = mockTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0);

  const totalEarnings = completedBalance + pendingBalance;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2>Wallet</h2>
        <p className="text-gray-600">Manage your earnings and view transaction history</p>
      </div>

      {/* Wallet Info Card */}
      <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-green-100 mb-2">Available Balance</p>
            <h1 className="text-white">₦{completedBalance.toLocaleString()}</h1>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <WalletIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-green-100 mb-1">Pending</p>
            <p className="text-white">₦{pendingBalance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-green-100 mb-1">Total Earnings</p>
            <p className="text-white">₦{totalEarnings.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-gray-900">₦{completedBalance.toLocaleString()}</p>
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
              <p className="text-gray-900">₦{pendingBalance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
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
        <h4 className="text-blue-900 mb-2">Payout Information</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• All approved delivery payments are credited to your wallet</li>
          <li>• System auto-pays within 24 hours on business days only</li>
          <li>• Payout dates are shown for each pending transaction</li>
          <li>• Completed deliveries are paid to your registered bank account</li>
        </ul>
      </Card>

      {/* Transaction History */}
      <div>
        <h3 className="mb-4">Transaction History</h3>
        <div className="space-y-3">
          {mockTransactions.map((transaction) => (
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
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{transaction.date}</span>
                        {transaction.status === 'pending' && (
                          <span className="flex items-center gap-1 text-amber-600">
                            <Calendar className="w-3 h-3" />
                            Payout date
                          </span>
                        )}
                      </div>
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
          ))}
        </div>
      </div>
    </div>
  );
}
