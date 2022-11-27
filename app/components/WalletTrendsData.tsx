import { GraphCard } from "app/components/GraphCard";
import { LineChart } from "app/components/LineChart";
import {
  firstPurchaseDate,
  graphsData,
  lastPurchaseDate,
} from "lib/graphsData";

export function WalletTrendsData() {
  return (
    <div className="w-full">
      <GraphCard>
        <LineChart
          firstPurchaseDateString={firstPurchaseDate.toISOString()}
          lastPurchaseDateString={lastPurchaseDate.toISOString()}
          data={graphsData.walletTimeTrendsData}
          options={graphsData.walletTimeTrendsOptions}
        />
      </GraphCard>
    </div>
  );
}
