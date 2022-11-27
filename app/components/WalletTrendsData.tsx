import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  firstPurchaseDate,
  graphsData,
  lastPurchaseDate,
} from "lib/graphsData";
import { convertDate, groupData, padEmpty } from "lib/lineChartDataUtils";
import merge from "lodash.merge";
import { TimeFormatProps } from "types/TimeFormat";

type WalletTrendsDataProps = TimeFormatProps;

export function WalletTrendsData({
  timeFormat = "week",
}: WalletTrendsDataProps) {
  const groupedData = {
    ...graphsData.walletTimeTrendsData,
    datasets: graphsData.walletTimeTrendsData.datasets.map((set) => ({
      ...set,
      data: convertDate(groupData(padEmpty(set.data), timeFormat)),
    })),
  };

  const startDate =
    timeFormat === "day"
      ? startOfDay(firstPurchaseDate)
      : timeFormat === "week"
      ? startOfWeek(firstPurchaseDate)
      : startOfMonth(firstPurchaseDate);
  const endDate =
    timeFormat === "day"
      ? endOfDay(lastPurchaseDate)
      : timeFormat === "week"
      ? endOfWeek(lastPurchaseDate)
      : endOfMonth(lastPurchaseDate);

  return (
    <div className="w-full">
      <GraphCard>
        <LineChart
          startDateString={startDate.toISOString()}
          endDateString={endDate.toISOString()}
          data={groupedData}
          options={merge({}, graphsData.walletTimeTrendsOptions, {
            scales: {
              yAxis: {
                max: Math.max(
                  ...([] as number[]).concat(
                    ...groupedData.datasets.map((dataset) =>
                      dataset.data.map((datapoint) => datapoint.y)
                    )
                  )
                ),
              },
              xAxis: {
                time: {
                  unit: timeFormat,
                },
              },
            },
          })}
        />
      </GraphCard>
    </div>
  );
}
