import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { PieChart } from "app/components/PieChart";
import { graphsData } from "lib/graphsData";

export function Graphs() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-2 h-full">
          <GraphCard>
            <LineChart
              data={graphsData.paymentMethodTrendsData}
              options={graphsData.paymentMethodTrendsOptions}
            />
          </GraphCard>
        </div>
        <div className="col-span-1 h-full">
          <GraphCard>
            <PieChart
              data={graphsData.zeroConfBreakdownData}
              options={graphsData.zeroConfBreakdownOptions}
              formatPercent
            />
          </GraphCard>
        </div>
      </div>
    </>
  );
}
