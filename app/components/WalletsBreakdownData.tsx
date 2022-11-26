import { BarChart } from "app/components/BarChart";
import { GraphCard } from "app/components/GraphCard";
import { PieChart } from "app/components/PieChart";
import { graphsData } from "lib/graphsData";

export function WalletsBreakdownData() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div>
        <GraphCard shrinkOnMobile>
          <PieChart
            formatPercent
            data={graphsData.walletsBreakdownPieData}
            options={graphsData.walletsBreakdownPieOptions}
          />
        </GraphCard>
      </div>
      <div>
        <GraphCard>
          <BarChart
            data={graphsData.walletsBreakdownBarData}
            options={graphsData.walletsBreakdownBarOptions}
          />
        </GraphCard>
      </div>
    </div>
  );
}
