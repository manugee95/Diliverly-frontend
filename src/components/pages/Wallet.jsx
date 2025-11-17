import { useState, useMemo } from "react";
import Sidebar from "../Sidebar";
import { Pagination } from "../Pagination";
import { ArrowUpRight, Wallet as WalletIcon, Calendar } from "lucide-react";
import { CiWarning } from "react-icons/ci";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const formatCurrency = (n) =>
  `₦${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

function StatCard({ title, value, icon, bg }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </motion.div>
  );
}

function TransactionItem({ tx }) {
  const positive = tx.amount > 0;
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="bg-white rounded-xl p-5 flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
          <ArrowUpRight className="text-green-600 w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{tx.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{tx.date}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p
          className={`text-sm font-semibold ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {positive
            ? `+${formatCurrency(tx.amount)}`
            : `-${formatCurrency(Math.abs(tx.amount))}`}
        </p>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
            tx.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {tx.status}
        </span>
      </div>
    </motion.div>
  );
}

export default function Wallet() {
  const [page, setPage] = useState(1);
  const perPage = 5;

  const transactions = useMemo(
    () => [
      {
        id: 1,
        title: "Refund for cancelled order ORD-004",
        date: "2025-11-09",
        amount: 22500,
        status: "completed",
      },
      {
        id: 2,
        title: "Refund for cancelled order ORD-005",
        date: "2025-11-07",
        amount: 30000,
        status: "completed",
      },
      {
        id: 3,
        title: "Payout to bank",
        date: "2025-11-05",
        amount: -15000,
        status: "completed",
      },
      {
        id: 4,
        title: "Refund for cancelled order ORD-003",
        date: "2025-11-03",
        amount: 12500,
        status: "completed",
      },
      {
        id: 5,
        title: "Pending refund ORD-002",
        date: "2025-11-02",
        amount: 8000,
        status: "pending",
      },
      {
        id: 6,
        title: "Manual adjustment",
        date: "2025-10-28",
        amount: -2500,
        status: "completed",
      },
    ],
    []
  );

  const availableBalance = transactions.reduce((s, t) => s + t.amount, 0);
  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / perPage);
  const paginated = transactions.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 px-10 py-12 md:ml-64 overflow-y-auto">
        <motion.div variants={fadeIn} initial="hidden" animate="show">
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your wallet and view all transactions
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="bg-green-600 text-white rounded-2xl p-8 mt-8 shadow-md relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm mb-2">Available Balance</p>
              <h2 className="text-[30px] font-bold mb-8">
                {formatCurrency(availableBalance)}
              </h2>

              <ul className="space-y-3 text-sm text-green-50">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <CiWarning className="text-xs" />
                  </span>
                  Cancelled delivery payments are credited here.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-3 h-3" />
                  </span>
                  Auto-payout within 24 hours (business days).
                </li>
              </ul>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center"
            >
              <WalletIcon className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 mb-10">
          <StatCard
            title="Total Credits"
            value={formatCurrency(Math.max(availableBalance, 0))}
            icon={<ArrowUpRight className="text-green-600 w-5 h-5" />}
            bg="bg-green-50"
          />
          <StatCard
            title="Pending"
            value="0 transactions"
            icon={<Calendar className="text-yellow-600 w-5 h-5" />}
            bg="bg-yellow-50"
          />
          <StatCard
            title="Transactions"
            value={`${totalTransactions} total`}
            icon={<WalletIcon className="text-blue-600 w-5 h-5" />}
            bg="bg-blue-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-blue-900 mb-4">
                How Wallet Works
              </h3>

              <ul className="space-y-3">
                <li className="flex gap-2 text-sm text-blue-800">
                  <span className="font-bold text-blue-600">•</span> Refunds for
                  cancelled deliveries are added to your wallet.
                </li>
                <li className="flex gap-2 text-sm text-blue-800">
                  <span className="font-bold text-blue-600">•</span> Completed
                  deliveries credit the agent’s wallet.
                </li>
                <li className="flex gap-2 text-sm text-blue-800">
                  <span className="font-bold text-blue-600">•</span>{" "}
                  Auto-payouts run within 24 working hours.
                </li>
                <li className="flex gap-2 text-sm text-blue-800">
                  <span className="font-bold text-blue-600">•</span> You can
                  request a withdrawal anytime.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Transaction History
            </h2>

            <div className="space-y-2">
              {paginated.map((tx) => (
                <TransactionItem key={tx.id} tx={tx} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
