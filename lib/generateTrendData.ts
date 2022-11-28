import { ChartData } from "chart.js";
import { colors } from "lib/colors";
import { firstPurchaseDate, lastPurchaseDate } from "lib/graphData";
import { groupData } from "lib/groupData";
import { padEmpty } from "lib/padEmpty";
import { ChartDataArray } from "types/ChartDataArray";
import { Purchase } from "types/Purchase";

export const generateTrendData = (
  uniqueEntities: string[],
  purchasesByEntity: { [entity: string]: Purchase[] }
): ChartData<"line", ChartDataArray> => ({
  datasets: uniqueEntities.map((entity, entityIndex) => ({
    type: "line",
    label: entity,
    data: groupData(
      padEmpty(
        firstPurchaseDate,
        lastPurchaseDate,
        purchasesByEntity[entity].map((p) => ({
          x: new Date(p.created_time),
          y: 1,
        }))
      ),
      "day"
    ).map((item) => ({ ...item, x: item.x.getTime() })),
    backgroundColor: colors[entityIndex] + "33",
    borderColor: colors[entityIndex],
  })),
});
