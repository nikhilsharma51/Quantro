export const validateTrades = (req, res, next) => {
  const { symbol, qty, entry, exit, date } = req.body;

  //symobol validation
  if (
    !symbol ||
    typeof symbol !== "string" ||
    symbol.length < 1 ||
    symbol.length > 10
  ) {
    return res.status(400).json({ message: "Onvalid symbol" });
  }

  const qtyNum = parseInt(qty);
  if (isNaN(qtyNum) || qtyNum < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid quantity",
    });
  }

  const entryNum = parseFloat(entry);
  if (isNaN(entryNum) || entryNum < 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid entry price",
    });
  }

  if (exit !== undefined && exit !== null) {
    const exitNum = parseFloat(exit);
    if (isNaN(exitNum) || exitNum < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid exit price",
      });
    }
  }

  //date validation
  const dateObj = new Date(date);
  if(!date || isNaN(Date.parse(date) || dateObj > new Date())) {
    return res.status(400).json({
        message : "Invalid Date",
        success : false,
    })
  }

  next();
};
