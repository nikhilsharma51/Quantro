import React from 'react';
import DateFilter from './dashboard/DateFilter';
import EquityChart from './dashboard/EquityChart';
import StatsCards from './dashboard/StatsCards';
import PnLCard from './dashboard/PnLCard';
import TradesTable from './dashboard/TradesTable';
import TradesSummaryRow from './dashboard/TradesSummaryRow';
import TradeModal from './dashboard/TradeModal';

import { mockTrades } from '../data/mockTrades';
import { calculateTradeMetrics } from '../utils/tradeCalculations';
import useTradeStore from '../store/useTradeStore';

const MainContent = () => {
  const {trades} = useTradeStore(); 
  
  const metrics = calculateTradeMetrics(trades);

  return (
    <main className="p-8 overflow-y-auto text-white font-sans space-y-6">
      {/* Date Filters */}
      <DateFilter />

      {/* Top section */}
      <div className="flex gap-4 items-start">
        {/* Chart */}
        <EquityChart trades = {trades} />

        {/* Right side cards */}
        <div className="flex flex-col gap-4 w-[320px]">
          <StatsCards metrics = {metrics} />
          <PnLCard metrics = {metrics} />
        </div>
      </div>

     {/* SUMMARY ROW */}
      <TradesSummaryRow metrics={metrics} />

      {/* DETAILED TRADES */}
      <TradesTable trades={trades} />

      <TradeModal />

    </main>
  );
};

export default MainContent;
