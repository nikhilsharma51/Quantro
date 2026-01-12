import useFilterStore from "../../store/useFilterStore";

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

const StatsCards = () => {
  const stats = useFilterStore((s) => s.stats);

  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard label="WINS" value={stats.wins} color="green" />
      <StatCard label="LOSSES" value={stats.losses} color="red" />
      <StatCard label="AVG W" value={`$${stats.avgWin}`} color="green" />
      <StatCard label="AVG L" value={`$${stats.avgLoss}`} color="red" />
    </div>
  );
};

export default StatsCards;
