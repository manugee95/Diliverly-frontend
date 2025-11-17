import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function CreateDeliveryRequestModal({
  open,
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [addresses, setAddresses] = useState([
    { address: "", paymentType: "prepaid" },
  ]);

  const addAddress = () =>
    setAddresses([...addresses, { address: "", paymentType: "prepaid" }]);

  const updateAddress = (index, field, value) => {
    const updated = [...addresses];
    updated[index] = { ...updated[index], [field]: value };
    setAddresses(updated);
  };

  const handleSubmit = () => {
    if (!title || !description || !state || addresses.some((a) => !a.address)) {
      alert("Please fill in all fields");
      return;
    }
    onSubmit?.({ title, description, state, addresses });
    onClose();
    // Reset form
    setTitle("");
    setDescription("");
    setState("");
    setAddresses([{ address: "", paymentType: "prepaid" }]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-none z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Modal Panel */}
            <motion.div
              className="bg-white rounded-2xl w-full max-w-[520px] shadow-2xl overflow-y-auto max-h-[90vh] p-6 relative border border-gray-100 mt-5"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-md transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <h1 className="text-[17px] font-semibold mb-5">
                Create New Delivery Request
              </h1>

              <div className="space-y-3">
                {/* Request Title */}
                <div>
                  <label className="block text-[14.5px] font-medium mb-0.5">Request Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Electronics Delivery - Lagos"
                    className="w-full border border-none rounded-lg px-4 py-2 text-[15px] bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500/40"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[14.5px] font-medium mb-0.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe what needs to be delivered"
                    className="w-full border text-[15px] border-none rounded-lg px-4 py-2 h-[65px] bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-500/40 resize-none"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-[14.5px] font-medium mb-0.5">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-none rounded-lg px-4 py-2.5 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/40"
                  >
                    <option value="" className="text-gray-500">Select state</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>

                {/* Delivery Addresses Header */}
                <div className="flex items-center justify-between">
                  <label className="block text-[14.5px] font-medium">Delivery Addresses</label>
                  <button
                    onClick={addAddress}
                    type="button"
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 text-sm rounded-lg bg-white hover:bg-gray-50 transition"
                  >
                    <Plus className="w-4 h-4" /> Add Address
                  </button>
                </div>

                {/* Address Blocks */}
                <div className="space-y-4">
                  {addresses.map((addr, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="font-medium text-sm mb-0.5">
                        Address {index + 1}
                      </div>

                      <input
                        type="text"
                        value={addr.address}
                        onChange={(e) =>
                          updateAddress(index, "address", e.target.value)
                        }
                        placeholder="Enter delivery address"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14.5px] bg-white mb-3 focus:outline-none focus:ring-1 focus:ring-green-500/40"
                      />

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Delivery Type
                        </label>
                        <select
                          value={addr.paymentType}
                          onChange={(e) =>
                            updateAddress(index, "paymentType", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-1 text-sm focus:ring-green-500/40"
                        >
                          <option value="prepaid">
                            PREPAID (Payment before delivery)
                          </option>
                          <option value="postpaid">CASH ON DELIVERY</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between gap-">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-16 border text-[14.5px] border-gray-300 rounded-lg hover:bg-green-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="px-16 py-2 text-[14.5px] bg-green-600 hover:bg-green-700 transition text-white rounded-lg font-medium"
                >
                  Create Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}