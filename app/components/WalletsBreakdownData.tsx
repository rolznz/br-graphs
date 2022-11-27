// import { BarChart } from "app/components/BarChart";
import { ChartFilter } from "app/components/ChartFilter";
import { GraphCard } from "app/components/GraphCard";
import { PieChart } from "app/components/PieChart";
import {
  firstPurchaseDate,
  graphsData,
  lastPurchaseDate,
} from "lib/graphsData";

export function WalletsBreakdownData() {
  return (
    <div className="w-full">
      <GraphCard shrinkOnMobile>
        <ChartFilter
          firstPurchaseDateString={firstPurchaseDate.toISOString()}
          lastPurchaseDateString={lastPurchaseDate.toISOString()}
        >
          <PieChart
            formatPercent
            data={graphsData.walletsBreakdownPieData}
            options={graphsData.walletsBreakdownPieOptions}
          />
        </ChartFilter>
      </GraphCard>
      {/* <div>
        <GraphCard>
          <ChartFilter
            firstPurchaseDateString={firstPurchaseDate.toISOString()}
            lastPurchaseDateString={lastPurchaseDate.toISOString()}
          >
            <BarChart
              data={graphsData.walletsBreakdownBarData}
              options={graphsData.walletsBreakdownBarOptions}
            />
          </ChartFilter>
        </GraphCard>
      </div> */}
    </div>
  );
}
