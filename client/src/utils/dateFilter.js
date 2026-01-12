export const getDateRange = (filter) => {
  const now = new Date();

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

  const startOfWeek = (d) => {
    // week starts Monday
    const diff = (d.getDay() + 6) % 7;
    const s = new Date(d);
    s.setDate(d.getDate() - diff);
    return startOfDay(s);
  };

  const endOfWeek = (d) => {
    const s = startOfWeek(d);
    s.setDate(s.getDate() + 6);
    return endOfDay(s);
  };

  const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
  const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

  switch (filter) {
    case "Today": {
      return { start: startOfDay(now), end: endOfDay(now) };
    }
    case "Yesterday": {
      const y = new Date(now);
      y.setDate(now.getDate() - 1);
      return { start: startOfDay(y), end: endOfDay(y) };
    }
    case "This wk.": {
      return { start: startOfWeek(now), end: endOfWeek(now) };
    }
    case "Last wk.": {
      const last = new Date(now);
      last.setDate(now.getDate() - 7);
      return { start: startOfWeek(last), end: endOfWeek(last) };
    }
    case "This mo.": {
      return { start: startOfMonth(now), end: endOfMonth(now) };
    }
    case "Last mo.": {
      const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return { start: startOfMonth(last), end: endOfMonth(last) };
    }
    case "Last 3 mo.": {
      const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      const end = endOfMonth(new Date(now.getFullYear(), now.getMonth(), 1));
      return { start: startOfDay(start), end };
    }
    case "This yr.": {
      const s = new Date(now.getFullYear(), 0, 1);
      const e = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      return { start: s, end: e };
    }
    case "Last yr.": {
      const year = now.getFullYear() - 1;
      const s = new Date(year, 0, 1);
      const e = new Date(year, 11, 31, 23, 59, 59, 999);
      return { start: s, end: e };
    }
    case "All time" : {
      return { start : new Date(0),end : endOfDay(now)};
    }
    default:
      return { start: new Date(0), end: endOfDay(now) };
  }
};