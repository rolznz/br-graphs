import { ChartDataArray } from "types/ChartDataArray";

export function getInRangeData(
  data: ChartDataArray<Date>,
  startDate: Date,
  endDate: Date
) {
  return data.filter((item) => {
    const inRange = item.x >= startDate && item.x <= endDate;

    return inRange;
  });
}
