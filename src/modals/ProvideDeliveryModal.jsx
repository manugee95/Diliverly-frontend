import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Package } from "lucide-react";
import { useState } from "react";

export default function ProvideDeliveryModal({
  open,
  onClose,
  orderId,
  locations = [],
  onSubmit,
}) {
  const [formData, setFormData] = useState(
    locations.reduce(
      (acc, _, idx) => ({
        ...acc,
        [idx]: { buyerName: "", buyerPhone: "", itemName: "", quantity: 1 },
      }),
      {}
    )
  );

  const handleInputChange = (locIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [locIndex]: {
        ...prev[locIndex],
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onClose();
  };

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
              className="bg-white rounded-2xl w-full max-w-[540px] shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 130 }}
            >
              {/* HEADER */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="text-green-600" size={22} />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-gray-800">
                     Provide Delivery Information
                    </h2>
                    <p className="text-xs text-gray-500">{orderId}</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  type="button"
                  className="text-gray-500 hover:text-gray-700 transition p-1.5 hover:bg-gray-100 rounded-md"
                >
                  <X size={22} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* INFO BANNER */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-6"
                >
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 leading-relaxed">
                    Please provide delivery information for each location. A unique PIN
                    will be generated for each delivery that you must share with your customers.
                  </p>
                </motion.div>

                {/* LOCATION SECTIONS */}
                <div className="space-y-7">
                  {locations.map((loc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-2xl p-5 bg-white hover:shadow-sm transition"
                    >
                      {/* LOCATION HEADER */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-gray-800">
                          Location {index + 1}
                        </h3>
                        <span className="text-xs font-medium bg-green-700 text-white px-2.5 py-1 rounded-full">
                          {loc.payment}
                        </span>
                      </div>

                      {/* ADDRESS BOX */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
                        <p className="text-xs text-gray-600 font-medium mb-2">
                          DELIVERY ADDRESS
                        </p>
                        <p className="text-gray-900 font-medium text-sm leading-relaxed">
                          {loc.address}
                        </p>
                      </div>

                      {/* FORM INPUTS */}
                      <div className="space-y-4">
                        {/* Row 1: Buyer Name & Phone */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                              BUYER NAME
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={formData[index]?.buyerName || ""}
                              onChange={(e) =>
                                handleInputChange(index, "buyerName", e.target.value)
                              }
                              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/40 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                              BUYER PHONE
                            </label>
                            <input
                              type="tel"
                              placeholder="+234 801 234 5678"
                              value={formData[index]?.buyerPhone || ""}
                              onChange={(e) =>
                                handleInputChange(index, "buyerPhone", e.target.value)
                              }
                              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/40 transition"
                            />
                          </div>
                        </div>

                        {/* Row 2: Item Name & Quantity */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                              ITEM NAME
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Electronics"
                              value={formData[index]?.itemName || ""}
                              onChange={(e) =>
                                handleInputChange(index, "itemName", e.target.value)
                              }
                              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/40 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2">
                              QUANTITY
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={formData[index]?.quantity || 1}
                              onChange={(e) =>
                                handleInputChange(index, "quantity", parseInt(e.target.value) || 1)
                              }
                              className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/40 transition"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

              {/* FOOTER BUTTONS */}
              <div className="px-6 mt-7 flex justify-between items-center gap-3">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  type="button"
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition text-sm shadow-sm"
                >
                  Submit & Start Delivery
                </button>
              </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}