import React from "react";
import useTradeStore from "../../store/useTradeStore";

const TradesTable = ({ trades }) => {

  const openTrade = useTradeStore((s) => s.openTrade);
  
  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden">
      <div className="grid grid-cols-9 text-xs text-gray-400 border-b border-gray-700">
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
          <div key={h} className="px-3 py-2">
            {h}
          </div>
        ))}
      </div>

      {trades.map((t) => {
        const entryTot = t.entry * t.qty;
        const exitTot = t.exit * t.qty;
        const pnl = exitTot - entryTot;
        const retPct = ((pnl / entryTot) * 100).toFixed(2);
        const positive = pnl >= 0;

        return (
          <div
            key={t.id}
            onClick={() => openTrade(t)}
            className="grid grid-cols-9 text-sm border-b border-gray-800 hover:bg-[#020617] cursor-pointer"
          >
            <div className="px-3 py-2">{t.date}</div>
            <div className="px-3 py-2">{t.symbol}</div>
            <div className="px-3 py-2">{t.qty}</div>
            <div className="px-3 py-2">${t.entry}</div>
            <div className="px-3 py-2">${t.exit}</div>
            <div className="px-3 py-2">${entryTot.toFixed(2)}</div>
            <div className="px-3 py-2">${exitTot.toFixed(2)}</div>
            <div
              className={`px-3 py-2 font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}
            >
              {positive ? "+" : "-"}${Math.abs(pnl).toFixed(2)}
            </div>
            <div
              className={`px-3 py-2 font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}
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
