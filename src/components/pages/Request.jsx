import Sidebar from "../Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MapPin, FileText } from "lucide-react";
import { useState } from "react";
import RequestDetailModal from "../../modals/RequestDetailModal";
import QuoteModal from "../../modals/QuoteModal";
import { CreateDeliveryRequestModal } from "../../modals/CreateDeliveryModal";
import { Pagination } from "../Pagination";

function Request() {
  const tabs = ["All", "Pending", "Assigned", "Completed"];
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showQuotesModal, setShowQuotesModal] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [page, setPage] = useState(1);

  const [allRequests, setAllRequests] = useState([
    {
      id: 1,
      requestId: "REQ-001",
      title: "Electronics Delivery - Lagos",
      desc: "Deliver phones to 3 locations in Lagos",
      status: "pending",
      city: "Lagos",
      locations: 3,
      created: "2025-11-08",
      quotes: 2,
      quotesData: [
        {
          company: "Swift Deliveries Ltd",
          rating: 4.8,
          trustScore: 95,
          deliveries: 45,
          total: 45000,
          submitted: "2025-11-09",
          email: "swiftdeliveries@gmail.com",
          phone: "+234 801 234 5678",
          states: ["Lagos", "Abuja", "Port Harcourt"],
        },
        {
          company: "Express Logistics",
          rating: 4.6,
          trustScore: 88,
          deliveries: 32,
          total: 39000,
          submitted: "2025-11-09",
          email: "expresslogistics@gmail.com",
          phone: "+234 809 876 5432",
          states: ["Lagos", "Kano"],
        },
      ],
      addresses: [
        { location: "123 Allen Avenue, Ikeja", payment: "PREPAID" },
        { location: "45 Victoria Island", payment: "COD" },
        { location: "78 Lekki Phase 1", payment: "PREPAID" },
      ],
    },
    {
      id: 2,
      requestId: "REQ-002",
      title: "Furniture Pickup - Abuja",
      desc: "Pick up chairs from warehouse",
      status: "assigned",
      city: "Abuja",
      locations: 1,
      created: "2025-11-06",
      quotes: 1,
      quotesData: [
        {
          company: "Abuja Movers",
          rating: 4.4,
          trustScore: 82,
          deliveries: 19,
          total: 22000,
          submitted: "2025-11-06",
          email: "abujamovers@gmail.com",
          phone: "+234 903 873 7293",
          states: ["Abia State", "Lagos State", "Ekiti State"],
        },
      ],
      addresses: [{ location: "Warehouse 12, Jabi", payment: "PREPAID" }],
    },
  ]);

  const filtered =
    activeTab === "All"
      ? allRequests
      : allRequests.filter((item) => item.status === activeTab.toLowerCase());

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const fadeSlide = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleCreateRequest = (data) => {
    const newRequest = {
      id: allRequests.length + 1,
      requestId: `REQ-${(allRequests.length + 1).toString().padStart(3, "0")}`,
      title: data.title,
      desc: data.description,
      status: "pending",
      city: data.state,
      locations: data.addresses.length,
      created: new Date().toISOString().split("T")[0],
      quotes: 0,
      quotesData: [],
      addresses: data.addresses.map((a) => ({
        location: a.address,
        payment: a.paymentType.toUpperCase(),
      })),
    };
    setAllRequests([newRequest, ...allRequests]);
    setPage(1);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-9 overflow-y-auto md:ml-64">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-start mb-8"
        >
          <div>
            <p className="font-semibold text-gray-900 text-[24px]">
              Delivery Requests
            </p>
            <span className="text-[16px] text-gray-500 mt-2 block">
              Manage all your delivery requests
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            type="button"
            className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
          >
            + Create Request
          </motion.button>
        </motion.div>

        {/* TABS */}
        <div className=" p-4 mb-6">
          <div className="flex gap-6 font-medium overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                type="button"
                className={`pb-2 px-2 whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-green-600 border-green-600"
                    : "text-gray-600 border-transparent hover:text-green-600"
                }`}
              >
                {tab} (
                {tab === "All"
                  ? allRequests.length
                  : allRequests.filter(
                      (i) => i.status === tab.toLowerCase()
                    ).length}
                )
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + page}
            variants={fadeSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-base font-semibold text-gray-800">
                      {item.title}
                    </h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "assigned"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>

                  <div className="flex items-center text-gray-500 text-sm gap-6 mb-5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      {item.city}
                    </div>
                    <div>{item.locations} location</div>
                    <div>Created: {item.created}</div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 font-medium text-sm"
                    >
                      <FileText size={16} />
                      {item.quotes} quote(s)
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedRequest(item);
                        setSelectedQuotes(item.quotesData);
                        setSelectedTitle(item.title);
                        setShowQuotesModal(true);
                      }}
                      type="button"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg
                       hover:bg-green-700 transition font-medium text-sm"
                    >
                      View Quotes
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedRequest(item);
                        setShowModal(true);
                      }}
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 font-medium text-sm"
                    >
                      <Eye size={16} />
                      Details
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">No requests found</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </main>

      {/* MODALS */}
      <RequestDetailModal
        open={showModal}
        onClose={() => setShowModal(false)}
        data={selectedRequest}
      />

      <QuoteModal
        open={showQuotesModal}
        onClose={() => setShowQuotesModal(false)}
        quotes={selectedQuotes}
        title={selectedTitle}
        request={selectedRequest}
      />

      <CreateDeliveryRequestModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateRequest}
      />
    </div>
  );
}

export default Request;