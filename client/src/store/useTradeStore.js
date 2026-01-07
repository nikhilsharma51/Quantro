import {create} from 'zustand';
import { mockTrades } from '../data/mockTrades';

const useTradeStore = create((set)=>({
    trades : mockTrades,
    selectedTrade : null,
    isModalOpen : false,
    isEditMode : false,

    openTrade : (trade) => set({
        selectedTrade : trade,
        isModalOpen : true,
        isEditMode : false
    }),

    closeModal : () => set({
        selectedTrade : null,
        isModalOpen : false,
        isEditMode : false
    }),

    enableEdit : () => set({isEditMode : true}),
    disableEdit : () => set({isEditMode : false}),

    updateTrade : (updatedTrade) => set((state)=>({
        trades : state.trades.map((t)=>
        t.id === updatedTrade.id ? updatedTrade : t
    ),
    selectedTrade : updatedTrade,
    isEditMode : false,
    }))
}));


export default useTradeStore;