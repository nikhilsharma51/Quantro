import { useEffect, useState } from "react";
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
];

const DateFilter = () => {
  const [active, setActive] = useState("Today");
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`px-3 py-1.5 rounded-full text-sm transition
            ${
              active === filter
                ? "bg-blue-500 text-white"
                : "bg-[#1f2937] text-gray-400 hover:bg-[#374151]"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};


export default DateFilter;
