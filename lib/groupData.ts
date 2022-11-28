import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
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
