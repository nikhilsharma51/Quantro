export const calculateTradeMetrics = (trades) => {
  let wins = 0;
  let losses = 0;
  let totalWin = 0;
  let totalLoss = 0;
  let pnl = 0;
  let entryTotal = 0;
  let exitTotal = 0;

  trades.forEach((t) => {
    const tradeEntry = t.entry * t.qty;
    const tradeExit = t.exit * t.qty;
    const tradePnl = tradeExit - tradeEntry;

    entryTotal += tradeEntry;
    exitTotal += tradeExit;
    pnl += tradePnl;

    if (tradePnl > 0) {
      wins++;
      totalWin += tradePnl;
    } else {
      losses++;
      totalLoss += Math.abs(tradePnl);
    }
  });

  const returnPercent =
    entryTotal > 0 ? ((pnl / entryTotal) * 100).toFixed(2) : 0;

  return {
    wins,
    losses,
    avgWin: wins ? (totalWin / wins).toFixed(2) : 0,
    avgLoss: losses ? (totalLoss / losses).toFixed(2) : 0,
    pnl: pnl.toFixed(2),
    entryTotal: entryTotal.toFixed(2),
    exitTotal: exitTotal.toFixed(2),
    returnPercent,
  };
};
