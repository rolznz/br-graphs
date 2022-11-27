import { add, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import groupBy from "lodash.groupby";
import { TimeFormat } from "types/TimeFormat";

export const groupData = (
  data: { x: Date; y: number }[],
  timeFormat: TimeFormat
) => {
  const dateGroupFunction =
    timeFormat === "day"
      ? startOfDay
      : timeFormat === "week"
      ? startOfWeek
      : startOfMonth;

  const groupedData: { x: Date; y: number }[] = Object.entries(
    groupBy(data, (e) => dateGroupFunction(e.x).getTime())
  ).map((group) => ({
    x: new Date(parseInt(group[0])),
    y: group[1].map((v) => v.y).reduce((a, b) => a + b),
  }));
  return groupedData;
};

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

export const convertDate = (data: { x: Date; y: number }[]) => {
  const sorted = data.sort((a, b) => a.x.getTime() - b.x.getTime());

  return sorted.map((entry) => ({ x: entry.x.toISOString(), y: entry.y }));
};
