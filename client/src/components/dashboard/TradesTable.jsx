import React from "react";
import useTradeStore from "../../store/useTradeStore";
import useFilterStore from "../../store/useFilterStore";

const TradesTable = () => {
  const openTrade = useTradeStore((s) => s.openTrade);
  const trades = useFilterStore((s) => s.filteredTrades);

  return (
    <div className="bg-[#0b1220] rounded-xl overflow-hidden shadow-sm border border-gray-800">
      <div className="grid grid-cols-9 text-xs text-gray-400 border-b border-gray-800 bg-gradient-to-r from-[#071021] to-[#091224]">
        {[
          "DATE",
          "SYMBOL",
          "QTY",
          "ENTRY",
          "EXIT",
          "ENTRY TOT",
          "EXIT TOT",
          "RETURN",
          "RETURN %",
        ].map((h) => (
          <div key={h} className="px-3 py-3 font-medium text-gray-300">
            {h}
          </div>
        ))}
      </div>

      {trades.map((t, idx) => {
        const entryTot = t.entry * t.qty;
        const exitTot = t.exit * t.qty;
        const pnl = exitTot - entryTot;
        const retPct = ((pnl / entryTot) * 100).toFixed(2);
        const positive = pnl >= 0;
        return (
          <div
            key={t.id}
            onClick={() => openTrade(t)}
            className={`grid grid-cols-9 text-sm border-b border-gray-800 cursor-pointer transition-colors duration-150 ${
              idx % 2 === 0 ? "bg-transparent" : "bg-[#07121a]"
            } hover:bg-[#021026]`}
          >
            <div className="px-3 py-3 text-gray-200">{t.date}</div>
            <div className="px-3 py-3 text-gray-200 font-medium">{t.symbol}</div>
            <div className="px-3 py-3 text-gray-200">{t.qty}</div>
            <div className="px-3 py-3 text-gray-200">${t.entry}</div>
            <div className="px-3 py-3 text-gray-200">${t.exit}</div>
            <div className="px-3 py-3 text-gray-200">${entryTot.toFixed(2)}</div>
            <div className="px-3 py-3 text-gray-200">${exitTot.toFixed(2)}</div>
            <div
              className={`px-3 py-3 font-medium ${
                positive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {positive ? "+" : "-"}${Math.abs(pnl).toFixed(2)}
            </div>
            <div
              className={`px-3 py-3 font-medium ${
                positive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {retPct}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TradesTable;
