import { create } from "zustand";
import useTradeStore from "./useTradeStore";
import { getDateRange } from "../utils/dateFilter";

const computeStats = (trades) =>{
  let wins =0,
    losses = 0,
    totalProfit = 0,
    sumLoss = 0,
    totalPnl = 0;

    trades.forEach((t)=>{
      const qty = Number(t.qty) || 0;
      const pnl = Number(t.pnl) || 0;

      totalPnl += pnl;

      if(pnl>0){
        wins++;
        sumWin +=pnl;
      }else if(pnl<0){
        losses++;
        sumLoss += Maths.abs(pnl);
      }
    });
    
    return{
      wins,
      losses,
      avgWin : wins ? sumWin/wins : 0,
      avgLoss : losses ? sumLoss/losses : 0,
      totalPnl,
    };   
};

const filterTradesByRange = (trades , range) =>{
  if(!range || !range.start || !range.end) return trades;
  const {start ,end} = range;

  return trades.filter((t)=>{
    const d = new Date(t.date);
    return d>= range.start && d<=range.end;
  });
}

const deriveState = (trades, filterName) =>{
    const range = getDateRange(filterName);
    const filteredTrades = filterTradesByRange(trades,range);

    return {
      filteredTrades,
      stats : computeStats(filteredTrades),
    };
};

  const initialTrades = useTradeStore.getState().trades;
  const initialFilter = "All time";
  const initialDerivedState = deriveState(initialTrades,initialFilter);

  const useFilterStore = create((set,get)=>({
    activeFilter : initialFilter,
    filteredTrades : initialDerivedState.filteredTrades,
    stats : initialDerivedState.stats,

    applyFilter : (filterName) => {
      const trades = useTradeStore.getState().trades;
      const derived = deriveState(trades,filterName);

      set({
        activeFilter : filterName,
        filteredTrades : derived.filteredTrades,
        stats : derived.stats,
      })
    },

    setFilter : (filterName) => get().applyFilter(filterName),

    syncWithTrades : (incomingTrades) =>{
      const trades = incomingTrades || useTradeStore.getState().trades;
      
      const {activeFilter} = get();
      // const trades = useTradeStore.getState().trades;
      const derived = deriveState(trades,activeFilter);
      
      set({
        filteredTrades : derived.filteredTrades,
        stats : derived.stats,
      });
    }
   
  }));

//subcription keeps filter store in sync with trade store

useTradeStore.subscribe(
  (state) => state.trades,
  (trades)=>{
    useFilterStore.getState().syncWithTrades();
  }
);

export default useFilterStore;
