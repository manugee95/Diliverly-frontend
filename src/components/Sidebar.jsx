import { Home, FileText, Package, Users, Wallet, Settings, LogOut, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ user }) {
  const [open, setOpen] = useState(false);

  // Default user if not passed
  const currentUser = user || {
    name: "Olasile Doe",
    role: "Vendor",
    avatar: "https://i.pravatar.cc/100"
  };

  const menuItems = [
    { label: "Dashboard", icon: <Home size={18} />, to: "/dashboard" },
    { label: "Requests", icon: <FileText size={18} />, to: "/requests" },
    { label: "Orders", icon: <Package size={18} />, to: "/orders" },
    { label: "My Agents", icon: <Users size={18} />, to: "/agents" },
    { label: "Wallet", icon: <Wallet size={18} />, to: "/wallet" },
    { label: "Settings", icon: <Settings size={18} />, to: "/settings" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-40
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Top Section: Logo + Profile */}
        <div>
          <div className="px-6 py-6 border-b border-gray-200 flex flex-col items-center gap-3">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-green-600">DILIVERLY</h1>

            {/* Profile */}
            <div className="flex items-center gap-3 mt-4 w-full">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-600"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {currentUser.name}
                </span>
                <span className="text-xs text-gray-400">{currentUser.role}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-2 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-[16px] font-medium rounded-lg transition
                  ${isActive ? "bg-green-50 text-green-600" : "text-gray-600 hover:bg-gray-50"}`
                }
                onClick={() => setOpen(false)} // close on mobile
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Logout */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            type="button"
            className="flex items-center gap-2 text-[16px] text-gray-600 hover:text-red-600 transition font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}
    </>
  );
}
