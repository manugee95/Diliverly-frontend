import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Send, Plus, MapPin } from "lucide-react";

export default function SendRequestModal({
  open,
  onClose,
  agent,
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [addresses, setAddresses] = useState([""]);
  const [errors, setErrors] = useState({});

  const addAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const updateAddress = (index, value) => {
    const updated = [...addresses];
    updated[index] = value;
    setAddresses(updated);
  };

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Request title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!state) newErrors.state = "State is required";
    if (addresses.some((a) => !a.trim()))
      newErrors.addresses = "All addresses must be filled";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      title,
      description,
      state,
      addresses: addresses.filter((a) => a.trim()),
    });

    // Reset form
    setTitle("");
    setDescription("");
    setState("");
    setAddresses([""]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="bg-white rounded-2xl w-full max-w-[550px] shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 130 }}
            >
              {/* HEADER */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Send className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Send Direct Request
                    </h2>
                    <p className="text-xs text-gray-500">{agent.name}</p>
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
              <div className="p-6 space-y-6">
                {/* INFO BANNER */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-900 leading-relaxed">
                    This request will be sent directly to {agent.name} and won't be visible to other agents.
                  </p>
                </motion.div>

                {/* REQUEST TITLE */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    REQUEST TITLE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Electronics Delivery - Lagos"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors({ ...errors, title: "" });
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 border text-sm focus:outline-none focus:ring-1 focus:ring-green-500/30 transition ${
                      errors.title
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-600 mt-1">{errors.title}</p>
                  )}
                </motion.div>

                {/* DESCRIPTION */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    DESCRIPTION
                  </label>
                  <textarea
                    placeholder="Describe what needs to be delivered..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) setErrors({ ...errors, description: "" });
                    }}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 border text-sm focus:outline-none focus:ring-1 focus:ring-green-500/30 transition resize-none ${
                      errors.description
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                  )}
                </motion.div>

                {/* STATE SELECT */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    STATE
                  </label>
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      if (errors.state) setErrors({ ...errors, state: "" });
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 border text-sm focus:outline-none focus:ring-1 focus:ring-green-500/30 transition ${
                      errors.state
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select state</option>
                    {agent.locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    This agent covers: {agent.locations.join(", ")}
                  </p>
                </motion.div>

                {/* DELIVERY ADDRESSES */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    DELIVERY ADDRESSES
                  </label>

                  <div className="space-y-3">
                    {addresses.map((addr, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="flex-1 relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                          <input
                            type="text"
                            placeholder={`Address ${i + 1}`}
                            value={addr}
                            onChange={(e) => {
                              updateAddress(i, e.target.value);
                              if (errors.addresses) setErrors({ ...errors, addresses: "" });
                            }}
                            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/30 transition"
                          />
                        </div>

                        {addresses.length > 1 && (
                          <button
                            onClick={() => removeAddress(i)}
                            type="button"
                            className="px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-red-50 transition"
                          >
                            <X size={18} className="text-red-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {errors.addresses && (
                    <p className="text-xs text-red-600 mt-2">{errors.addresses}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addAddress}
                    type="button"
                    className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 font-medium text-sm"
                  >
                    <Plus size={16} />
                    Add Address
                  </motion.button>
                </motion.div>
              </div>

              {/* FOOTER */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between gap-3">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-10 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-sm"
                >
                  Cancel
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  type="button"
                  className="px-10 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition shadow-sm flex items-center gap-2 text-sm"
                >
                  <Send size={16} />
                  Send Request
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}