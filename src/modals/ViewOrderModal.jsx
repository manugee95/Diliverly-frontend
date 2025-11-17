import { motion, AnimatePresence } from "framer-motion";
import { X, Package } from "lucide-react";

export default function ViewOrderModal({ open, onClose, order }) {
  if (!open || !order) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 130 }}
            >
              {/* HEADER */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Order Details
                    </h2>
                    <p className="text-xs text-gray-500">{order.orderId}</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  type="button"
                  aria-label="Close"
                  className="text-gray-500 hover:text-gray-700 p-1.5 rounded-md transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-8">
                {/* TOP GRID INFO */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-6"
                >
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-600 uppercase">Request ID</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">
                      {order.requestId}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-600 uppercase">Status</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1.5 text-xs font-medium rounded-full ${
                        order.status === "pending info"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "active"
                          ? "bg-green-800 text-white"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-600 uppercase">Agent</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">
                      {order.agent}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-600 uppercase">Total Amount</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">
                      ₦{order.amount}
                    </p>
                  </div>
                </motion.div>

                {/* DELIVERY ITEMS */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Delivery Items ({order.items.length})
                  </h3>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-200 rounded-2xl p-5 bg-white hover:shadow-sm transition"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 font-medium uppercase">
                              Item {index + 1}
                            </p>
                            <p className="text-sm font-semibold text-gray-800 mt-2">
                              {item.address}
                            </p>

                            <div className="mt-3 flex items-center gap-2">
                              <span
                                className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                                  item.payment === "PREPAID"
                                    ? "bg-green-700 text-green-50"
                                    : "bg-gray-700 text-gray-100"
                                }`}
                              >
                                {item.payment}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-800">
                              ₦{item.amount}
                            </p>

                            <span
                              className={`inline-block mt-3 text-xs px-3 py-1.5 rounded-full font-medium ${
                                item.status === "pending"
                                  ? "bg-yellow-600 text-yellow-100"
                                  : "bg-green-600 text-green-50"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}