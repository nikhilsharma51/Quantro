import useFilterStore from "../../store/useFilterStore";

const TradesSummaryRow = () => {
  const { wins, losses, avgWin, avgLoss, totalPnl } = useFilterStore((s) => s.stats);
  const positive = Number(totalPnl) >= 0;

  return (
    <div className="bg-[#0b1220] rounded-xl overflow-hidden mb-4 mt-4 border border-gray-800 shadow-sm">
      <div className="grid grid-cols-9 text-xs text-gray-400 border-b border-gray-800 bg-[#07121a]">
        {[
          "DATE",
          "SYMBOL",
          "QTY",
          "ENTRY",
          "EXIT",
          "ENTRY TOT",
          "EXIT TOT",
          "RETURN",
          "RETURN %"
        ].map((h) => (
          <div key={h} className="px-3 py-3 font-medium text-gray-300">
            {h}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-9 text-sm">
        <div className="px-3 py-3 text-gray-500"></div>
        <div className="px-3 py-3 text-gray-500"></div>
        <div className="px-3 py-3 text-gray-500"></div>
        <div className="px-3 py-3 text-gray-500"></div>
        <div className="px-3 py-3 text-gray-500"></div>

        <div className="px-3 py-3 text-gray-200 font-medium">${avgWin}</div>

        <div className="px-3 py-3 text-gray-200 font-medium">${avgLoss}</div>

        <div className={`px-3 py-3 font-medium ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {positive ? '+' : '-'}${Math.abs(totalPnl)}
        </div>

        <div className={`px-3 py-3 font-medium ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {((totalPnl / Math.abs(avgLoss)) * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default TradesSummaryRow;
