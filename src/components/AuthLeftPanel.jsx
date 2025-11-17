import { motion } from "framer-motion";
import { Mail, Truck, Users, ShieldCheck } from "lucide-react";

export default function AuthLeftPanel() {
  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex flex-col justify-between h-screen bg-linear-to-b from-green-600 via-green-700 to-green-800 text-white w-1/2 p-12 fixed left-0 top-0"
    >
      {/* Branding */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold head">DILIVERLY</h1>
        </div>

        <h2 className="text-[17px] font-semibold leading-snug opacity-90">
          Connecting vendors with trusted delivery agents nationwide
        </h2>

        <p className="mt-28 mb-5 text-[16px] font-medium text-green-100 tracking-wide">
          Why choose DILIVERLY?
        </p>

        <div className="space-y-6 text-sm">
          <Feature
            icon={<Mail className="w-5 h-5 text-green-200" />}
            title="For Vendors"
            text="Access a nationwide network of verified delivery agents ready to fulfill your orders."
          />
          <Feature
            icon={<Users className="w-5 h-5 text-green-200" />}
            title="For Agents"
            text="Grow your delivery business by partnering with ecommerce vendors across the country."
          />
          <Feature
            icon={<ShieldCheck className="w-5 h-5 text-green-200" />}
            title="Trusted Network"
            text="All agents are verified through our comprehensive KYC process for your peace of mind."
          />
        </div>
      </div>

      <p className="text-xs text-green-200 mt-10">
        © 2025 DILIVERLY. All rights reserved.
      </p>
    </motion.div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold text-[17px]">{title}</p>
        <p className="opacity-90 text-green-100 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}