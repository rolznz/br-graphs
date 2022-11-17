import { PieChart } from "app/components/PieChart";
import { LineChart } from "app/components/TrendChart";
import { graphsData } from "lib/graphsData";

export function Graphs() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <PieChart
            data={graphsData.walletsBreakdownData}
            options={graphsData.walletsBreakdownOptions}
          />
        </div>
        <div className="md:col-span-2" style={{ minHeight: "500px" }}>
          <LineChart
            data={graphsData.walletTrendsData}
            options={graphsData.walletTrendsOptions}
          />
        </div>
        <div className="md:col-span-2" style={{ minHeight: "500px" }}>
          <LineChart
            data={graphsData.paymentMethodTrendsData}
            options={graphsData.paymentMethodTrendsOptions}
          />
        </div>
        <div className="col-span-1">
          <PieChart
            data={graphsData.zeroConfBreakdownData}
            options={graphsData.zeroConfBreakdownOptions}
            formatPercent
          />
        </div>
      </div>
    </>
  );
}
