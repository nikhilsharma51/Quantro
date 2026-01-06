import React from 'react';
import DateFilter from './dashboard/DateFilter';
import EquityChart from './dashboard/EquityChart';
import StatsCards from './dashboard/StatsCards';
import PnLCard from './dashboard/PnLCard';
import TradesTable from './dashboard/TradesTable';
import TradesSummaryRow from './dashboard/TradesSummaryRow';

import { mockTrades } from '../data/mockTrades';
import { calculateTradeMetrics } from '../utils/tradeCalculations';

const MainContent = () => {
  const metrics = calculateTradeMetrics(mockTrades);

  return (
    <main className="p-6 overflow-y-auto text-white">
      {/* Date Filters */}
      <DateFilter />

      {/* Top section */}
      <div className="flex gap-4">
        {/* Chart */}
        <EquityChart trades = {mockTrades} />

        {/* Right side cards */}
        <div className="flex flex-col gap-4 w-[280px]">
          <StatsCards metrics = {metrics} />
          <PnLCard metrics = {metrics} />
        </div>
      </div>

     {/* SUMMARY ROW */}
      <TradesSummaryRow metrics={metrics} />

      {/* DETAILED TRADES */}
      <TradesTable trades={mockTrades} />
    </main>
  );
};

export default MainContent;
