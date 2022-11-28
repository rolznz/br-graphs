import { ChartFilter } from "app/components/ChartFilter";
import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { ChartData } from "chart.js";
import { firstPurchaseDate, lastPurchaseDate } from "lib/graphData";
import { ChartDataArray } from "types/ChartDataArray";

type TrendsProps = {
  data: ChartData<"line", ChartDataArray>;
};

export function Trends({ data }: TrendsProps) {
  return (
    <div className="w-full">
      <GraphCard>
        <ChartFilter
          firstPurchaseDateString={firstPurchaseDate.toISOString()}
          lastPurchaseDateString={lastPurchaseDate.toISOString()}
          showTimeFormat
        >
          <LineChart data={data} />
        </ChartFilter>
      </GraphCard>
    </div>
  );
}
