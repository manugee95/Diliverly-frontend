import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function RequestDetailModal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-none flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* MODAL CARD */}
        <motion.div
          className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X size={22} />
          </button>

          {/* TITLE */}
          <h2 className="text-[18px] text-gray-800 font-semibold mb-4">{data.title}</h2>

          {/* DETAILS */}
          <div className="space-y-4 text-gray-800">

            <div>
              <p className="font-semibold text-sm">Request ID</p>
              <p className="text-gray-600 text-[14px]">{data.requestId}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Description</p>
              <p className="text-gray-600 text-[16px]">{data.desc}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">State</p>
              <p className="text-gray-600 text-[16px]">{data.city}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Status</p>
              <span
                className={`px-3 py-1 text-xs rounded-full capitalize ${
                  data.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : data.status === "assigned"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {data.status}
              </span>
            </div>

            <div>
              <p className="font-semibold text-sm">
                Delivery Addresses ({data.addresses.length})
              </p>

              <div className="mt-2 space-y-3">
                {data.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                  >
                    <p>{address.location}</p>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        address.payment === "PREPAID"
                          ? "bg-green-600 text-white font-medium"
                          : "bg-gray-400 text-black font-medium"
                      }`}
                    >
                      {address.payment}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
