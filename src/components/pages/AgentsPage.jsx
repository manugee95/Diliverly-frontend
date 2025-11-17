import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Phone, MapPin, Send, Star } from "lucide-react";
import Sidebar from "../Sidebar";
import { Pagination } from "../Pagination";
import SendRequestModal from "../../modals/SendRequestModal";

export default function AgentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const pageSize = 6;

  const agents = [
    {
      id: 1,
      name: "Swift Deliveries Ltd",
      rating: 4.8,
      totalDeliveries: 45,
      email: "swiftdeliveries@gmail.com",
      phone: "+234 801 234 5678",
      locations: ["Lagos", "Abuja", "Port Harcourt"],
    },
    {
      id: 2,
      name: "Express Logistics",
      rating: 4.6,
      totalDeliveries: 32,
      email: "expresslogistics@gmail.com",
      phone: "+234 809 876 5432",
      locations: ["Lagos", "Kano"],
    },
    {
      id: 3,
      name: "Abuja Movers",
      rating: 4.4,
      totalDeliveries: 19,
      email: "abujamovers@gmail.com",
      phone: "+234 903 873 7293",
      locations: ["Abia State", "Lagos State", "Ekiti State"],
    },
    {
      id: 4,
      name: "Lagos Express",
      rating: 4.9,
      totalDeliveries: 67,
      email: "lagosexpress@gmail.com",
      phone: "+234 812 345 6789",
      locations: ["Lagos", "Ogun"],
    },
    {
      id: 5,
      name: "National Couriers",
      rating: 4.5,
      totalDeliveries: 28,
      email: "nationalcouriers@gmail.com",
      phone: "+234 905 234 5678",
      locations: ["All States"],
    },
    {
      id: 6,
      name: "Speed Delivery Co",
      rating: 4.7,
      totalDeliveries: 54,
      email: "speeddelivery@gmail.com",
      phone: "+234 810 567 8901",
      locations: ["Lagos", "Abuja", "Enugu"],
    },
  ];

  const totalPages = Math.ceil(agents.length / pageSize);
  const paginatedAgents = agents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSendRequest = (agent) => {
    setSelectedAgent(agent);
    setSendModalOpen(true);
  };

  const handleSubmitRequest = (formData) => {
    console.log("Request submitted:", { agent: selectedAgent, ...formData });
    setSendModalOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />

      <div className="flex-1 w-full md:ml-64 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 overflow-y-auto bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-xl font-semibold text-gray-800">
              My Agents
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Manage your connected delivery agents
            </p>
          </div>

          {/* AGENTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {paginatedAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="border border-gray-100 rounded-2xl bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg transition"
              >
                {/* NAME & VERIFIED */}
                <div className="flex items-start gap-2 mb-3">
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
                      {agent.name}
                    </h2>
                  </div>
                  <CheckCircle2 className="text-green-600 w-5 h-5 shrink-0 mt-0.5" />
                </div>

                {/* RATING */}
                <div className="flex items-center gap-2 mb-5 pb-5 border-b border-gray-100">
                  <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                  <span className="font-semibold text-gray-800">{agent.rating}</span>
                  <span className="text-gray-500 text-xs">
                    ({agent.totalDeliveries} deliveries)
                  </span>
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-2 text-gray-700 text-sm mb-3 min-h-5">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="truncate text-xs sm:text-sm">
                    {agent.email}
                  </span>
                </div>

                {/* PHONE */}
                <div className="flex items-center gap-2 text-gray-700 text-sm mb-5 min-h-5">
                  <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="truncate text-xs sm:text-sm">
                    {agent.phone}
                  </span>
                </div>

                {/* LOCATIONS */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-gray-800 text-sm font-medium mb-3">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    Service Areas
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {agent.locations.slice(0, 2).map((loc, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-2.5 py-1 text-xs rounded-full font-medium"
                      >
                        {loc}
                      </span>
                    ))}
                    {agent.locations.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 text-xs rounded-full font-medium">
                        +{agent.locations.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSendRequest(agent)}
                  type="button"
                  className="w-full bg-green-600 text-white hover:bg-green-700 transition font-medium text-sm py-2.5 rounded-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          )}
        </div>
      </div>

      {/* SEND REQUEST MODAL */}
      {selectedAgent && (
        <SendRequestModal
          open={sendModalOpen}
          onClose={() => setSendModalOpen(false)}
          agent={selectedAgent}
          onSubmit={handleSubmitRequest}
        />
      )}
    </div>
  );
}