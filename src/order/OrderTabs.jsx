export function OrdersTabs({ activeTab, setActiveTab, orders = [] }) {
  const tabs = [
    { label: "All", key: "all" },
    { label: "Pending Info", key: "pending" },
    { label: "Active", key: "active" },
    { label: "Completed", key: "completed" },
  ];

  const getTabCount = (tabKey) => {
    if (tabKey === "all") return orders.length;
    if (tabKey === "pending") return orders.filter(o => o.status === "pending info").length;
    return orders.filter(o => o.status === tabKey).length;
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 border-b pb-3 mb-7 mt-6 font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          type="button"
          className={`
            flex items-center justify-center gap-2
            px-3 py-1 sm:py-2 rounded-md whitespace-nowrap transition-all
            text-sm sm:text-base
            ${activeTab === tab.key 
              ? "text-green-600 border-b-2 border-green-600 font-semibold" 
              : "text-gray-600 hover:text-green-600 hover:scale-105"}
          `}
        >
          <span>{tab.label}</span>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
            {getTabCount(tab.key)}
          </span>
        </button>
      ))}
    </div>
  );
}
