import { ChartDataArray } from "types/ChartDataArray";

export const sortData = (data: ChartDataArray<Date>) => {
  return data.sort((a, b) => a.x.getTime() - b.x.getTime());
};
