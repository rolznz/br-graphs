import { BarChart } from "app/components/BarChart";
import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import { WalletsHero } from "app/components/WalletsHero";
import { graphsData } from "lib/graphsData";

export function WalletsSection() {
  return (
    <div data-theme="retro">
      <div className="min-h-screen">
        <WalletsHero />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="col-span-1 h-full">
            <GraphCard>
              <BarChart
                data={graphsData.walletsBreakdownBarData}
                options={graphsData.walletsBreakdownBarOptions}
              />
            </GraphCard>
          </div>
          <div className="md:col-span-2 h-full">
            <GraphCard>
              <LineChart
                data={graphsData.walletTrendsData}
                options={graphsData.walletTrendsOptions}
              />
            </GraphCard>
          </div>
        </div>
      </div>
    </div>
  );
}
