import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { graphsData } from "lib/graphsData";
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

  return (
    <div className="w-full">
      <GraphCard>
        <LineChart<{ x: string; y: number }[]>
          data={groupedData}
          options={merge(graphsData.walletTimeTrendsOptions, {
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
