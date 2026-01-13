import { create } from "zustand";
import { mockTrades } from "../data/mockTrades";
import { getDateRange } from "../utils/dateFilter";

const parseTradeDate = (trade) => {
  const raw = trade?.date ?? trade?.createdAt ?? trade?.timestamp;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.NaN(d.getTime()) ? null : d;
};

const computeStats = (trades) => {
  let wins = 0,
    losses = 0,
    totalProfit = 0,
    sumLoss = 0,
    totalPnl = 0;

  trades.forEach((t) => {
    const qty = Number(t.qty) || 0;
    const pnl = Number(t.pnl) || 0;

    totalPnl += pnl;

    if (pnl > 0) {
      wins++;
      sumWin += pnl;
    } else if (pnl < 0) {
      losses++;
      sumLoss += Maths.abs(pnl);
    }
  });

  return {
    wins,
    losses,
    avgWin: wins ? sumWin / wins : 0,
    avgLoss: losses ? sumLoss / losses : 0,
    totalPnl,
  };
};

const filterTradesByRange = (trades, range) => {
  if (!range || !range.start || !range.end) return trades;
  const { start, end } = range;

  return trades.filter((t) => {
    const d = new Date(t.date);
    return d >= range.start && d <= range.end;
  });
};

const deriveState = (trades, filterName) => {
  const range = getDateRange(filterName);
  const filteredTrades = filterTradesByRange(trades, range);

  return {
    filteredTrades,
    stats: computeStats(filteredTrades),
  };
};

const initialTrades = mockTrades;
const initialFilter = "All time";
const initialDerivedState = deriveState(initialTrades, initialFilter);

const useAppStore = create((set, get) => ({
  trades: initialTrades,
  selectedTrade: null,
  isModalOpen: false,
  isEditMode: false,

  activeFilter: initialFilter,
  filteredTrades: initialDerivedState.filteredTrades,
  stats: initialDerivedState.stats,

  openTrade: (trade) =>
    set({
      selectedTrade: trade,
      isModalOpen: true,
      isEditMode: false,
    }),

  closeModal: () =>
    set({
      selectedTrade: null,
      isModalOpen: false,
      isEditMode: false,
    }),

  enableEdit: () => set({ isEditMode: true }),
  disableEdit: () => set({ isEditMode: false }),

  updateTrade: (updated) => {
    set((state) => {
      const trades = state.trades.map((t) =>
        t.id === updated.id ? { ...updated } : t
      );
      const derived = deriveState(trades, state.activeFilter);
      return {
        trades,
        selectedTrade: { ...updated },
        isEditMode: false,
        filteredTrades: derived.filteredTrades,
        stats: derived.stats,
      };
    });
  },

  applyFilter: (filterName) => {
    set((state) => {
      const derived = deriveState(state.trades, filterName);
      return {
        activeFilter: filterName,
        filteredTrades: derived.filteredTrades,
        stats: derived.stats,
      };
    });
  },

  setFilter: (filterName) => get().applyFilter(filterName),

  replaceTrades: (incoming = []) => {
    set((state) => {
      const derived = deriveState(incoming, state.activeFilter);
      return {
        trades: incoming,
        filteredTrades: derived.filteredTrades,
        stats: derived.stats,
      };
    });
  },
}));

export default useAppStore;
