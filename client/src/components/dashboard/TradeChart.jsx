import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

import useFilterStore from "../../store/useFilterStore";

const dummyData = [
  { time: "10:00", price: 10.5 },
  { time: "10:30", price: 10.8 },
  { time: "11:00", price: 11.2 },
  { time: "11:30", price: 11.8 },
];

const TradeChart = () => {
  const trades = useFilterStore((s) => s.filteredTrades);
  
  const trade = Array.isArray(trades) && trades.length ? trades[0] : null;


  return (
    <div className="bg-[#111827] rounded-xl p-4 h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData}>
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#38bdf8" />

          {/* Buy */}
          <ReferenceDot
            x="10:30"
            y={trade.entry}
            r={6}
            fill="green"
          />

          {/* Sell */}
          <ReferenceDot
            x="11:30"
            y={trade.exit}
            r={6}
            fill="red"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TradeChart;
