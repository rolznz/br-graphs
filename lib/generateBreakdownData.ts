import { ChartData } from "chart.js";
import { colors } from "lib/colors";
import { groupData } from "lib/lineChartDataUtils";
import { ChartDataArray } from "types/ChartDataArray";
import { Purchase } from "types/Purchase";

export const generateBreakdownData = (
  uniqueEntities: string[],
  purchasesByEntity: { [entity: string]: Purchase[] }
): ChartData<"pie", ChartDataArray> => ({
  labels: uniqueEntities,
  datasets: uniqueEntities.map((entity, entityIndex) => ({
    data: groupData(
      purchasesByEntity[entity].map((p) => ({
        x: new Date(p.created_time),
        y: 1,
      })),
      "day"
    ).map((item) => ({ ...item, x: item.x.getTime() })),
    backgroundColor: colors[entityIndex],
    borderColor: "#fff",
    borderWidth: 1,
  })),
});
