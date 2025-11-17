import { useState } from "react";
import { User, Building2, Lock, Eye, EyeOff } from "lucide-react";
import Sidebar from "../Sidebar";
import { motion } from "framer-motion";

export default function SettingPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 max-w-[750px] p-9 overflow-y-auto md:ml-64">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-semibold text-gray-900 text-[28px] tracking-tight">Settings</p>
          <span className="text-[16px] text-gray-500 mt-1 block">
            Manage your account and profile settings
          </span>
        </motion.div>

        <div className="space-y-8 mt-10">
          {/* PERSONAL INFORMATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <User className="text-green-700 w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">Personal Information</h2>
                <p className="text-sm text-gray-500 mt-0.5">Update your personal details</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="First Name" placeholder="John" />
                <InputField label="Last Name" placeholder="Doe" />
              </div>

              <InputField label="Email Address" placeholder="example@gmail.com" type="email" />
              <InputField label="Phone Number" placeholder="+234 901 000 0000" type="tel" />

              <ActionButton text="Save Personal Information" />
            </div>
          </motion.div>

          {/* BUSINESS INFORMATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="text-blue-700 w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">Business Information</h2>
                <p className="text-sm text-gray-500 mt-0.5">Update your details</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">
              <InputField label="Business Name" placeholder="ABC Store" />
              <InputField label="Business Address" placeholder="123, Example Street, Lagos" />
              <ActionButton text="Save Business Information" />
            </div>
          </motion.div>

          {/* SECURITY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <Lock className="text-gray-700 w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">Security</h2>
                <p className="text-sm text-gray-500 mt-0.5">Password & security settings</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">
              <PasswordField
                label="Current Password"
                placeholder="Enter your current password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <InputField label="New Password" type="password" placeholder="Enter new password" />
              <InputField label="Confirm New Password" type="password" placeholder="Confirm new password" />

              <ActionButton text="Update Password" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Reusable Components
function InputField({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all"
      />
    </div>
  );
}

function PasswordField({ label, placeholder, showPassword, setShowPassword }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-2">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/30 transition-all"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function ActionButton({ text }) {
  return (
    <button
      type="button"
      className="w-full mt-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all shadow-sm hover:shadow"
    >
      {text}
    </button>
  );
}