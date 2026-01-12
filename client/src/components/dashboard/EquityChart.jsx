import useFilterStore from "../../store/useFilterStore";

const EquityChart = () => {
  const trades = useFilterStore((s) => s.filteredTrades);

  return (
    <div className="bg-gradient-to-b from-[#0b1220] to-[#0f1724] rounded-xl p-5 flex-1 min-h-[200px] relative shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-sm tracking-wide text-gray-300 font-semibold">Equity Curve</span>
        <span className="text-xs text-gray-500">Cumulative PnL</span>
      </div>

      <div className="mt-4 h-[140px] flex items-center justify-center relative">
        {/* subtle gradient line as visual placeholder */}
        <div className="absolute inset-x-6 top-1/2 h-[3px] bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 rounded-full opacity-70 transform-gpu animate-pulse" />

        <span className="text-sm text-gray-400 z-10 bg-transparent px-2">
          Chart will appear here
        </span>
      </div>
    </div>
  );
};

export default EquityChart;
