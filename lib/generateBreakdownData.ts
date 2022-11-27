import { ChartData } from "chart.js";
import { colors } from "lib/colors";
import { ChartDataArray } from "types/ChartDataArray";
import { Purchase } from "types/Purchase";

export const generateBreakdownData = (
  uniqueEntities: string[],
  purchasesByEntity: { [entity: string]: Purchase[] }
): ChartData<"pie", ChartDataArray> => ({
  labels: uniqueEntities,
  datasets: uniqueEntities.map((entity, entityIndex) => ({
    data: purchasesByEntity[entity].map((p) => ({
      x: new Date(p.created_time).getTime(),
      y: 1,
    })),
    backgroundColor: colors[entityIndex],
    borderColor: "#fff",
    borderWidth: 1,
  })),
});
