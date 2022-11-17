import { ExampleLineChart } from "app/components/ExampleLineChart";
import { ExamplePieChart } from "app/components/ExamplePieChart";
import { WalletsBreakdown } from "app/components/WalletsBreakdown";
import { graphsData } from "lib/graphsData";

export function Graphs() {
  return (
    <>
      <WalletsBreakdown data={graphsData.purchasesBreakdownData} />
      <ExampleLineChart />
      <ExamplePieChart />
    </>
  );
}
