import { ChartData } from "chart.js";
import SampleDataSmall from "data/sample-data-sm.json";
import SampleDataFull from "data/sample-data.json";
import { colors } from "lib/colors";
import { Purchase } from "models/Purchase";

const UNKNOWN_WALLET = "Unknown";

const sampleData =
  process.env.USE_FULL_SAMPLE === "true" ? SampleDataFull : SampleDataSmall;
const purchases = sampleData.rows as Purchase[];
console.log("Sample size: " + purchases.length);

const wallets = purchases.map(
  (purchase) => purchase.user_wallet ?? UNKNOWN_WALLET
);
const uniqueWallets = Array.from(new Set(wallets.filter((wallet) => wallet)));

type GraphsData = {
  purchasesBreakdownData: ChartData<"pie">;
};

export const graphsData: GraphsData = {
  purchasesBreakdownData: {
    labels: uniqueWallets,
    datasets: [
      {
        label: "# of Users",
        data: uniqueWallets.map(
          (currentWallet) =>
            wallets.filter((wallet) => wallet === currentWallet).length
        ),
        backgroundColor: uniqueWallets.map((_, i) => colors[i] + "33"),
        borderColor: uniqueWallets.map((_, i) => colors[i]),
        borderWidth: 1,
      },
    ],
  },
};
