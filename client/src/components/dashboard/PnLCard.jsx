import useFilterStore from "../../store/useFilterStore";

const PnLCard = () => {
  const { totalPnl, wins, losses } = useFilterStore((s) => s.stats);
  const pnl = Number(totalPnl) || 0;
  const isPositive = pnl >= 0;

  const totalTrades = (wins || 0) + (losses || 0);
  const winRate = totalTrades ? Math.round((wins / totalTrades) * 100) : 0;

  return (
    <div className="bg-[#0b1220] rounded-xl px-4 py-4 border border-gray-800 shadow-sm">
      <p className="text-xs text-gray-400 tracking-wide font-medium">PnL</p>

      <div className="flex items-center gap-3 mt-2">
        <p
          className={`text-2xl font-bold ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isPositive ? '+' : '-'}${Math.abs(pnl)}
        </p>

        <span
          className={`text-sm px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}
        >
          {winRate}% Win rate
        </span>
      </div>
    </div>
  );
};

export default PnLCard;
