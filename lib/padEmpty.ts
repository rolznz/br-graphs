import { add, startOfDay } from "date-fns";

export const padEmpty = (
  firstPurchaseDate: Date,
  lastPurchaseDate: Date,
  data: { x: Date; y: number }[]
) => {
  for (
    let date = startOfDay(firstPurchaseDate);
    date < startOfDay(lastPurchaseDate);
    date = add(date, { days: 1 })
  ) {
    if (!data.some((entry) => entry.x.getTime() === date.getTime())) {
      data.push({
        x: date,
        y: 0,
      });
    }
  }
  return data;
};
