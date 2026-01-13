import { useEffect, useState } from "react";
import useAppStore from "../../store/useAppStore";

const filters = [
  "Today",
  "Yesterday",
  "This wk.",
  "Last wk.",
  "This mo.",
  "Last mo.",
  "Last 3 mo.",
  "This yr.",
  "Last yr.",
  "All time",
];

const DateFilter = () => {
  const active = useAppStore((state)=> state.activeFilter);
  const setFilter = useAppStore((state)=> state.setFilter);

  // const [active, setActive] = useState("Today");
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-transform duration-150 ease-in-out transform ${
              active === filter
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                : 'bg-[#1f2937] text-gray-400 hover:bg-[#374151] hover:scale-105'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* kept simple preset buttons only to preserve existing behavior */}
    </div>
  );
};


export default DateFilter;
