import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { graphsData } from "lib/graphsData";
import { convertDate, groupData, padEmpty } from "lib/lineChartDataUtils";

export function WalletTrendsData() {
  const groupedData = {
    ...graphsData.walletTimeTrendsData,
    datasets: graphsData.walletTimeTrendsData.datasets.map((set) => ({
      ...set,
      data: convertDate(padEmpty(groupData(set.data))),
    })),
  };

  return (
    <div className="w-full">
      <GraphCard>
        <LineChart<{ x: string; y: number }[]>
          data={groupedData}
          options={graphsData.walletTimeTrendsOptions}
        />
      </GraphCard>
    </div>
  );
}
