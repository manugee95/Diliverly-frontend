import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Star,
  CheckCircle,
  TrendingUp,
  Package
} from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";

export default function AgentProfileModal({ open, onClose, agent }) {
  if (!open || !agent) return null;

  const reviews = agent.reviews || [
    {
      name: "Michael",
      rating: 4,
      comment: "Great service! Delivered earlier than expected.",
      date: "Oct 12, 2025",
    },
    {
      name: "Sarah",
      rating: 5,
      comment: "Professional communication. Highly recommended.",
      date: "Oct 15, 2025",
    },
    {
      name: "David",
      rating: 4,
      comment: "Good experience overall.",
      date: "Oct 18, 2025",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-[520px] shadow-2xl overflow-y-auto max-h-[90vh] p-6 relative border border-gray-100"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 130 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <h2 className="text-[18px] font-bold mb-6 text-gray-800">
            Agent Profile
          </h2>

          {/* Header Card */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
              <Package className="text-green-600" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {agent.company}
                </h3>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
                <span className="flex items-center gap-1">
                  <Star className="text-yellow-500" size={16} /> {agent.rating}{" "}
                  Rating
                </span>
                <span>{agent.deliveries} Deliveries</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border rounded-2xl p-5 mb-6 bg-gray-50">
            <h4 className="font-medium mb-10 text-gray-800">
              Contact Information
            </h4>
            <div className="flex items-center text-[14px] gap-3 text-gray-700 mb-3">
              <Mail size={17} className="text-green-600" />
              {agent.email || "No email provided"}
            </div>
            <div className="flex items-center text-[14px] gap-3 text-gray-700">
              <Phone size={17} className="text-green-600" />
              {agent.phone || "No phone provided"}
            </div>
          </div>

          {/* Trust Score */}
          <div className="border rounded-2xl space-y-7 p-5 mb-7 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium text-[14px] text-gray-800">Trust Score</h4>
              <span className="text-blue-600 font-semibold flex items-center gap-1">
                <TrendingUp size={16} /> {agent.trustScore}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${agent.trustScore}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Based on delivery performance, customer ratings, & reliability.
            </p>
          </div>

          {/* Coverage Areas */}
          <div className="border rounded-2xl p-5 mb-8 bg-gray-50">
            <h4 className="font-medium mb-10 text-[14px] text-gray-800">Coverage Areas</h4>
            <div className="flex items-center gap-2 flex-wrap">
              <IoLocationOutline className="text-gray-500 text-[20px]" />
              {agent.states && agent.states.length > 0 ? (
                agent.states.map((state) => (
                  <span
                    key={state}
                    className="px-3 py-1 bg-gray-200 border rounded-full text-[12px] shadow-sm"
                  >
                    {state}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No coverage areas specified
                </span>
              )}
            </div>
          </div>

          {/* Customer Reviews */}
          <h4 className="font-semibold mb-4 text-gray-800">
            Customer Reviews ({reviews.length})
          </h4>
          <div className="space-y-4 mb-10">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-semibold text-gray-800">{review.name}</h5>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, starIdx) => (
                    <Star key={starIdx} className="text-yellow-500" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 text-[14px] leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Statistics Footer */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center border rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-2xl font-semibold text-green-600">
                {agent.deliveries}
              </h3>
              <p className="text-gray-600 text-sm">Total Deliveries</p>
            </div>
            <div className="text-center border rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-2xl font-semibold text-orange-500">
                {agent.rating}
              </h3>
              <p className="text-gray-600 text-sm">Average Rating</p>
            </div>
            <div className="text-center border rounded-2xl p-5 bg-white shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-600">
                {agent.trustScore}%
              </h3>
              <p className="text-gray-600 text-sm">Trust Score</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
