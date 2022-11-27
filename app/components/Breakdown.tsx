// import { BarChart } from "app/components/BarChart";
import { ChartFilter } from "app/components/ChartFilter";
import { GraphCard } from "app/components/GraphCard";
import { PieChart } from "app/components/PieChart";
import { ChartData } from "chart.js";
import { firstPurchaseDate, lastPurchaseDate } from "lib/graphsData";

type BreakdownData = {
  data: ChartData<"pie", { x: string; y: number }[]>;
};

export function Breakdown({ data }: BreakdownData) {
  return (
    <div className="w-full flex items-center justify-center">
      <GraphCard square>
        <ChartFilter
          firstPurchaseDateString={firstPurchaseDate.toISOString()}
          lastPurchaseDateString={lastPurchaseDate.toISOString()}
        >
          <PieChart data={data} />
        </ChartFilter>
      </GraphCard>
    </div>
  );
}
