import { create } from "zustand";
import useTradeStore from "./useTradeStore";
import { getDateRange } from "../utils/dateFilter";

const computeStats = (trades) => {
  let wins = 0, losses = 0, sumWin = 0, sumLoss = 0, totalPnl = 0;
  trades.forEach((t) => {
    const entryTot = (Number(t.entry) || 0) * (Number(t.qty) || 0);
    const exitTot = (Number(t.exit) || 0) * (Number(t.qty) || 0);
    const pnl = exitTot - entryTot;
    totalPnl += pnl;
    if (pnl > 0) { wins++; sumWin += pnl; }
    else if (pnl < 0) { losses++; sumLoss += Math.abs(pnl); }
  });
  return {
    wins,
    losses,
    avgWin: wins ? sumWin / wins : 0,
    avgLoss: losses ? sumLoss / losses : 0,
    totalPnl,
  };
};

const filterByRange = (trades, { start, end }) =>
  trades.filter((t) => {
    const d = new Date(t.date);
    return d >= start && d <= end;
  });

const useFilterStore = create((set) => {
  const trades = useTradeStore.getState().trades || [];
  const defaultFilter = "Today";
  const range = getDateRange(defaultFilter);
  const initialFiltered = filterByRange(trades, range);

  return {
    activeFilter: defaultFilter,
    filteredTrades: initialFiltered,
    stats: computeStats(initialFiltered),

    setFilter: (filterName) => {
      const trades = useTradeStore.getState().trades || [];
      const range = getDateRange(filterName);
      const filtered = filterByRange(trades, range);
      set({ activeFilter: filterName, filteredTrades: filtered, stats: computeStats(filtered) });
    },

    // helper to force recompute from outside if needed
    recompute: () => {
      const { activeFilter } = useFilterStore.getState();
      const trades = useTradeStore.getState().trades || [];
      const range = getDateRange(activeFilter);
      const filtered = filterByRange(trades, range);
      set({ filteredTrades: filtered, stats: computeStats(filtered) });
    },
  };
});

// subscribe to trade changes so filteredTrades & stats stay in sync
useTradeStore.subscribe((state) => state.trades, (trades) => {
  const { activeFilter } = useFilterStore.getState();
  const range = getDateRange(activeFilter);
  const filtered = filterByRange(trades || [], range);
  useFilterStore.setState({ filteredTrades: filtered, stats: computeStats(filtered) });
});

export default useFilterStore;