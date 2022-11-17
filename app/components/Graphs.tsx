import { WalletsBreakdown } from "app/components/WalletsBreakdown";
import { WalletTrends } from "app/components/WalletTrends";
import { graphsData } from "lib/graphsData";

export function Graphs() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <WalletsBreakdown
            data={graphsData.walletsBreakdownData}
            options={graphsData.walletsBreakdownOptions}
          />
        </div>
        <div className="md:col-span-2" style={{ minHeight: "500px" }}>
          <WalletTrends
            data={graphsData.walletTrendsData}
            options={graphsData.walletTrendsOptions}
          />
        </div>
      </div>
    </>
  );
}
