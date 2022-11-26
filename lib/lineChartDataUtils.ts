import { add, startOfDay } from "date-fns";
import { firstPurchase, lastPurchase } from "lib/graphsData";
import groupBy from "lodash.groupby";

export const groupData = (data: { x: Date }[]) => {
  const groupedData: { x: Date; y: number }[] = Object.entries(
    groupBy(data, (e) => startOfDay(e.x).getTime())
  ).map((group) => ({
    x: new Date(parseInt(group[0])),
    y: group[1].map(() => 1).reduce((a, b) => a + b),
  }));
  return groupedData;
};

export const padEmpty = (data: { x: Date; y: number }[]) => {
  for (
    let date = startOfDay(firstPurchase);
    date < startOfDay(lastPurchase);
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

export const convertDate = (data: { x: Date; y: number }[]) => {
  const sorted = data.sort((a, b) => a.x.getTime() - b.x.getTime());

  return sorted.map((entry) => ({ x: entry.x.toISOString(), y: entry.y }));
};
