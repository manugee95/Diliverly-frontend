import { motion } from "framer-motion";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLeftPanel from "../AuthLeftPanel";
import { useNavigate } from "react-router-dom";

export default function VendorSetup() {
  const navigate = useNavigate();

  
  return (
    <div className="min-h-screen flex bg-white flex-col lg:flex-row">
      {/* LEFT PANEL - Only visible on large screens */}
      <div className="hidden lg:block lg:w-1/2">
        <AuthLeftPanel />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-20 py-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* ICON */}
          <div className="flex mb-5">
            <div className="bg-green-100 p-5 rounded-full">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* HEADER */}
          <h2 className="text-[22px] sm:text-[24px] font-bold text-gray-800">
            Complete Your Business Profile
          </h2>
          <p className="text-gray-500 mt-2 mb-6 text-sm sm:text-base">
            Tell us about your business to complete your vendor account setup.
          </p>

          {/* PROGRESS BAR */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
            <div className="h-2 bg-green-600 rounded-full w-1/2"></div>
          </div>
          <p className="text-sm text-gray-500 mb-6">Step 1 of 2</p>

          {/* FORM */}
          <form className="space-y-4">
            {/* Business Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                placeholder="e.g., ABC Store"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                text-[14px] focus:outline-none focus:ring-2 focus:ring-green-500/40"
              />
            </div>

            {/* Business Address */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Business Address
              </label>
              <input
                type="text"
                placeholder="e.g., 123 Main Street, Lagos, Nigeria"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 
                text-[14px] focus:outline-none focus:ring-2 focus:ring-green-500/40"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors 
              text-white py-2.5 rounded-lg font-medium"
            >
              Continue to Dashboard
            </motion.button>
          </form>

          {/* BACK BUTTON */}
          <div className="mt-6">
            <Link
              to="/verify"
              className="flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 
              text-sm font-medium border border-gray-200 rounded-lg py-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
