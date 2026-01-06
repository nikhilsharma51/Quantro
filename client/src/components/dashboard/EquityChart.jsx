const EquityChart = () => {
  return (
    <div className="bg-[#111827] rounded-xl p-4 flex-1 min-h-[200px] relative">
      <span className="text-xs tracking-wide text-gray-400">
        Equity Curve
      </span>

      <div className="mt-4 h-[140px] flex items-center justify-center relative">
        {/* Fake line */}
        <div className="absolute inset-x-6 top-1/2 h-[2px] bg-linear-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full" />

        <span className="text-sm text-gray-500 z-10 bg-[#111827] px-2">
          Chart will appear here
        </span>
      </div>
    </div>
  );
};

export default EquityChart;
