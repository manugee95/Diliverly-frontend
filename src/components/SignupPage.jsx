import { useState } from "react";
import { motion } from "framer-motion";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthLeftPanel from "./AuthLeftPanel";

export default function SignupPage() {
  const [role, setRole] = useState("vendor");
  const MotionLink = motion(Link);

  return (
    <div className="min-h-screen flex bg-white font-inter">
      {/* LEFT PANEL */}
      <AuthLeftPanel />

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center py-4 w-full lg:w-1/2 px-8 sm:px-10 lg:ml-[50%]"
      >
        <div className="w-full max-w-md mx-auto py-5 bg-white">
          <h2 className="text-[26px] create font-semibold text-gray-800 mb-1">
            Create your account
          </h2>
          <p className="text-gray-500 text-[14px] mb-6">
            Join DILIVERLY and start connecting with delivery partners.
          </p>

          <div className="space-y-3">
            <SocialButton
              icon={
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
              }
              text="Continue with Google"
            />
          </div>

          <Divider text="Or continue with email" />

          {/* Role Selection */}
          <h3 className="mb-1 font-medium text-gray-600">I am a</h3>
          <div className="flex gap-3 mb-4">
            <RoleButton
              active={role === "vendor"}
              onClick={() => setRole("vendor")}
              title="Vendor"
              text="I need delivery services"
            />
            <RoleButton
              active={role === "agent"}
              onClick={() => setRole("agent")}
              title="Agent"
              text="I provide delivery services"
            />
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            <div className="flex gap-3">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="+234 800 000 0000" type="tel" />
            <Input placeholder="Create a strong password" type="password" />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p>

            <MotionLink
              to="/verify"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-2.5 rounded-lg font-medium shadow-sm block text-center"
            >
              Create Account
            </MotionLink>
          </form>

          <p className="text-sm text-center mt-5 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold underline-offset-3 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* --- Subcomponents --- */
function SocialButton({ icon, text }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      type="button"
    >
      {icon}
      <span className="font-medium text-gray-700">{text}</span>
    </motion.button>
  );
}

function Divider({ text }) {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-gray-300" />
      <span className="px-3 text-gray-400 text-sm">{text}</span>
      <div className="flex-1 h-px bg-gray-300" />
    </div>
  );
}

function RoleButton({ title, text, active, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type="button"
      className={`flex-1 border-2 rounded-lg py-3 font-medium transition-all ${
        active
          ? "border-green-600 bg-green-50 text-green-700 shadow-sm"
          : "border-gray-200 hover:bg-gray-50 text-gray-700"
      }`}
    >
      {title}
      <p className="text-xs text-gray-500 mt-1">{text}</p>
    </motion.button>
  );
}

function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/40 transition-all"
    />
  );
}