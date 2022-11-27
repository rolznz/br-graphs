import { ChartData } from "chart.js";
import { colors } from "lib/colors";
import { ChartDataArray } from "types/ChartDataArray";
import { Purchase } from "types/Purchase";

export const generateTrendData = (
  uniqueEntities: string[],
  purchasesByEntity: { [entity: string]: Purchase[] }
): ChartData<"line", ChartDataArray> => ({
  datasets: uniqueEntities.map((entity, entityIndex) => ({
    type: "line",
    label: entity,
    data: purchasesByEntity[entity].map((p) => ({
      x: new Date(p.created_time).getTime(),
      y: 1,
    })),
    backgroundColor: colors[entityIndex] + "33",
    borderColor: colors[entityIndex],
  })),
});
