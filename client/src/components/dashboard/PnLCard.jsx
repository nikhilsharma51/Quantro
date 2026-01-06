const PnLCard = ({ metrics }) => {
  const pnl = Number(metrics.pnl);
  const isPositive = pnl >= 0;

  return (
    <div className="bg-[#111827] rounded-xl px-4 py-4">
      <p className="text-xs text-gray-400 tracking-wide">PnL</p>

      <div className="flex items-center gap-2 mt-1">
        <p
          className={`text-xl font-semibold ${
            isPositive ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isPositive ? "+" : "-"}${Math.abs(pnl)}
        </p>

        <span
          className={`text-sm px-2 py-0.5 rounded-full ${
            isPositive
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-rose-500/20 text-rose-400"
          }`}
        >
          {metrics.pnlPercent}%
        </span>
      </div>
    </div>
  );
};

export default PnLCard;
