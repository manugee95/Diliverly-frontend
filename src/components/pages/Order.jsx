import { useState } from "react";
import Sidebar from "../Sidebar";
import { OrdersTabs } from "../../order/OrderTabs";
import { OrdersList } from "../../order/OrdersList";
import { Pagination } from "../Pagination";
import ProvideDeliveryModal from "../../modals/ProvideDeliveryModal";
import ViewOrderModal from "../../modals/ViewOrderModal";

export default function Order() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [provideDeliveryOpen, setProvideDeliveryOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openProvideDeliveryModal = (order) => {
    setSelectedOrder(order);
    setProvideDeliveryOpen(true);
  };

  const openViewModal = (order) => {
    setSelectedOrder({
      orderId: order.orderId,
      requestId: order.requestId,
      agent: order.agent,
      amount: order.amount,
      status: order.status,
      items: order.deliveries,
    });
    setViewModalOpen(true);
  };

  const handleProvideDeliverySubmit = (formData) => {
    console.log("Delivery info submitted:", formData);
    // Close modal after submission
    setProvideDeliveryOpen(false);
    setSelectedOrder(null);
  };

  const orders = [
    {
      orderId: "ORD-001",
      requestId: "REQ-001",
      agent: "Swift Deliveries Ltd",
      amount: "47,250",
      createdDate: "2025-11-10",
      status: "pending info",
      deliveries: [
        { address: "123 Allen Avenue, Ikeja, Lagos", amount: "15,000", payment: "PREPAID", status: "pending" },
        { address: "45 Victoria Island, Lagos", amount: "15,000", payment: "COD", status: "pending" },
      ],
    },
    {
      orderId: "ORD-002",
      requestId: "REQ-002",
      agent: "Express Logistics",
      amount: "31,500",
      createdDate: "2025-11-09",
      status: "active",
      deliveries: [
        { address: "123 Allen Avenue, Ikeja, Lagos", amount: "15,750", payment: "PREPAID", status: "delivered" },
        { address: "45 Victoria Island, Lagos", amount: "15,750", payment: "COD", status: "pending" },
      ],
    },
    {
      orderId: "ORD-003",
      requestId: "REQ-003",
      agent: "Tech House Logistics",
      amount: "43,500",
      createdDate: "2025-11-09",
      status: "completed",
      deliveries: [
        { address: "123 Opebi Avenue, Ikeja, Lagos", amount: "15,750", payment: "PREPAID", status: "delivered" },
        { address: "45 Victoria Island, Lagos", amount: "15,750", payment: "COD", status: "delivered" },
        { address: "56 Lekki Phase 1, Lagos", amount: "15,750", payment: "PREPAID", status: "delivered" },
      ],
    },
  ];

  // Filter orders based on active tab
  const filtered = orders.filter((o) => {
    if (activeTab === "pending") return o.status === "pending info";
    if (activeTab === "active") return o.status === "active";
    if (activeTab === "completed") return o.status === "completed";
    return true;
  });

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 w-full md:ml-64 px-5 sm:px-10 py-14 md:py-8 overflow-y-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">Orders</h1>
        <p className="text-gray-500 mb-5">View all order information and delivery items</p>

        {/* Tabs */}
        <OrdersTabs
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1); // Reset page on tab change
          }}
          orders={orders}
        />

        {/* Orders List */}
        <OrdersList
          orders={paginatedOrders}
          onViewOrder={openViewModal}
          onProvideDelivery={(order) => order.status === "pending info" && openProvideDeliveryModal(order)}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <ViewOrderModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      {selectedOrder && (
        <ProvideDeliveryModal
          open={provideDeliveryOpen}
          onClose={() => {
            setProvideDeliveryOpen(false);
            setSelectedOrder(null);
          }}
          orderId={selectedOrder.orderId}
          locations={selectedOrder.deliveries}
          onSubmit={handleProvideDeliverySubmit}
        />
      )}
    </div>
  );
}
