import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import groupBy from "lodash.groupby";
import { ChartDataArray } from "types/ChartDataArray";
import { TimeFormat } from "types/TimeFormat";

export const groupData = (
  data: ChartDataArray<Date>,
  timeFormat: TimeFormat
) => {
  const dateGroupFunction =
    timeFormat === "day"
      ? startOfDay
      : timeFormat === "week"
      ? startOfWeek
      : startOfMonth;

  const groupedData: ChartDataArray<Date> = Object.entries(
    groupBy(data, (e) => dateGroupFunction(e.x).getTime())
  ).map((group) => ({
    x: new Date(parseInt(group[0])),
    y: group[1].map((v) => v.y).reduce((a, b) => a + b),
  }));
  return groupedData;
};
