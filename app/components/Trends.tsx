import { ChartFilter } from "app/components/ChartFilter";
import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { ChartData } from "chart.js";
import { firstPurchaseDate, lastPurchaseDate } from "lib/graphsData";

type TrendsProps = {
  data: ChartData<"line", { x: string; y: number }[]>;
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
          <LineChart
            firstPurchaseDateString={firstPurchaseDate.toISOString()}
            lastPurchaseDateString={lastPurchaseDate.toISOString()}
            data={data}
          />
        </ChartFilter>
      </GraphCard>
    </div>
  );
}
