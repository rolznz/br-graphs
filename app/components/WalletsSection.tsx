import { WalletsBreakdownData } from "app/components/WalletsBreakdownData";
import { WalletsTabGroup } from "app/components/WalletsTabGroup";
import { WalletTab } from "app/components/WalletTab";
import { WalletTrendsData } from "app/components/WalletTrendsData";

export function WalletsSection() {
  return (
    <div
      data-theme="retro"
      className="bg-gradient-to-b from-base-100 to-base-300 min-h-screen flex flex-col items-center"
    >
      <div className="hero">
        <div className="hero-content pt-16 pb-4 text-center">
          <div className="max-w-md">
            <h2 className="text-4xl text-primary-content font-bold tracking-wide">
              User Wallets
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col items-center">
        <WalletsTabGroup>
          <WalletTab description="The below chart shows which wallets users made purchases with, and how user preferences have changed over time.">
            <WalletTrendsData />
          </WalletTab>
          <WalletTab description="The below charts show the popularity of different wallets, based on how many purchases were made per wallet.">
            <WalletsBreakdownData />
          </WalletTab>
        </WalletsTabGroup>
      </div>
    </div>
  );
}
