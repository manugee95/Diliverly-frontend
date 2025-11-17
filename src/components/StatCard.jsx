const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 mb-2 text-sm">{label}</p>
        <h2 className="text-[18px] font-normal text-gray-800">{value}</h2>
      </div>
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white`}
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;