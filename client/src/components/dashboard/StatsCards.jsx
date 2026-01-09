const StatCard = ({ label, value, color }) => (
  <div className="bg-[#0b1220] border border-gray-800 rounded-xl px-4 py-3 hover:shadow-lg transform hover:-translate-y-0.5 transition">
    <p className="text-xs text-gray-400 tracking-wide font-medium">{label}</p>
    <p
      className={`text-2xl font-bold mt-1 ${
        color === 'green' ? 'text-emerald-400' : 'text-rose-400'
      }`}
    >
      {value}
    </p>
  </div>
);

const StatsCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="WINS" value={metrics.wins} color="green" />
      <StatCard label="LOSSES" value={metrics.losses} color="red" />
      <StatCard label="AVG W" value={`$${metrics.avgWin}`} color="green" />
      <StatCard label="AVG L" value={`$${metrics.avgLoss}`} color="red" />
    </div>
  );
};

export default StatsCards;
