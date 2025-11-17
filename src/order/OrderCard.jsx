import { Eye, AlertCircle, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderCard({
  orderId,
  agent,
  amount,
  createdDate,
  status,
  deliveries = [],
  onView,
  onProvideInfo,
}) {
  const isActionRequired = status === "pending info";
  const deliveredCount = deliveries.filter((d) => d.status === "delivered").length;
  const totalDeliveries = deliveries.length;
  const progressPercentage = totalDeliveries > 0 ? (deliveredCount / totalDeliveries) * 100 : 0;

  return (
    <motion.div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-2 gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-gray-400 shrink-0" />
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h3 className="text-[15px] sm:text-[15.5px] font-semibold text-gray-800">
              {orderId}
            </h3>

            <span
              className={`text-[10px] sm:text-[11px] font-medium px-2 sm:px-3 py-1 rounded-full capitalize whitespace-nowrap ${
                status === "pending info"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "active"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-0">
          {isActionRequired && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProvideInfo}
              type="button"
              className="px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition text-xs sm:text-sm"
            >
              Provide Delivery Info
            </motion.button>
          )}

          <button
            onClick={onView}
            type="button"
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-xs sm:text-sm"
          >
            <Eye size={16} />
            View Items
          </button>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-1 text-[13px] sm:text-[15px] font-medium text-gray-600 mb-3">
        <p>
          Agent: <span className="font-semibold">{agent}</span>
        </p>
        <p>
          Total Amount: <span className="font-semibold">₦{amount}</span>
        </p>
        {createdDate && (
          <p>
            Created: <span className="font-semibold">{createdDate}</span>
          </p>
        )}
      </div>

      {/* Action Required Banner */}
      {isActionRequired && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3 flex items-start gap-2 sm:gap-3"
        >
          <AlertCircle size={18} className="text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-[12px] sm:text-sm text-yellow-800">
            <span className="font-semibold">Action Required:</span> Provide delivery information for each location to start delivery.
          </p>
        </motion.div>
      )}

      {/* Progress Bar */}
      {!isActionRequired && totalDeliveries > 0 && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">
              Delivery Progress
            </label>
            <span className="text-sm font-medium text-gray-600">
              {deliveredCount}/{totalDeliveries} delivered
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                progressPercentage === 100 ? "bg-green-600" : "bg-blue-600"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
