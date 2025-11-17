import { FileText, Package, TrendingUp, Clock } from "lucide-react";
import Sidebar from "../Sidebar";
import StatCard from "../StatCard";
import OrderCard from "../../order/OrderCard";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 md:px-10 px-6 md:py-12 py-15 overflow-y-auto md:ml-64">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-bold text-gray-900 md:text-[24px] text-[20px]">
            Welcome back, ABC Store!
          </p>
          <span className="md:text-[16px] text-[14px] text-gray-500 mt-2 block">
            Here's what's happening with your deliveries today.
          </span>
        </motion.div>

        {/* STATS GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StatCard
            label="Total Requests"
            value="12"
            icon={<FileText size={20} />}
            color="#2563EB"
          />
          <StatCard
            label="Active Orders"
            value="5"
            icon={<Package size={20} />}
            color="#16A34A"
          />
          <StatCard
            label="Completed"
            value="7"
            icon={<TrendingUp size={20} />}
            color="#8B5CF6"
          />
          <StatCard
            label="Pending Quotes"
            value="3"
            icon={<Clock size={20} />}
            color="#F59E0B"
          />
        </motion.div>

        {/* ACTIVE ORDERS */}
        <motion.h2
          className="md:mt-12 mt-9 mb-5 font-semibold text-gray-800 text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Active Orders
        </motion.h2>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OrderCard
              orderId="ORD-001"
              agent="Swift Deliveries Ltd"
              amount="45,000"
              payoutDate="2025-11-12"
              progress={33}
              status="active"
              deliveries={[
                { address: "123 Allen Avenue, Ikeja, Lagos", status: "delivered" },
                { address: "45 Victoria Island, Lagos", status: "pending" },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <OrderCard
              orderId="ORD-002"
              agent="Swift Deliveries Ltd"
              amount="22,500"
              payoutDate="2025-11-12"
              progress={100}
              status="active"
              deliveries={[
                { address: "123 Allen Avenue, Ikeja, Lagos", status: "delivered" },
              ]}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}