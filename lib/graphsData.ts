import { ChartData, ChartOptions } from "chart.js";
import SampleDataSmall from "data/sample-data-sm.json";
import SampleDataFull from "data/sample-data.json";
import { format } from "date-fns";
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
console.log("Loaded wallets");
const uniqueWallets = Array.from(new Set(wallets.filter((wallet) => wallet)));
console.log("Loaded unique wallets");

const getDateLabel = (date: Date) => format(date, "d/M");

const purchaseDates = Array.from(
  new Set(
    purchases
      .map((purchase) => new Date(purchase.created_time))
      .sort((a, b) => a.getTime() - b.getTime())
      .map((date) => getDateLabel(date))
  )
);
console.log("Loaded purchase dates");

const walletUsageByDate = uniqueWallets.map((wallet) =>
  purchaseDates.map((date) => {
    return purchases.filter(
      (purchase) =>
        getDateLabel(new Date(purchase.created_time)) === date &&
        (purchase.user_wallet ?? UNKNOWN_WALLET) === wallet
    ).length;
  })
);

console.log("Loaded wallet usage by date");

type GraphsData = {
  walletsBreakdownData: ChartData<"pie">;
  walletsBreakdownOptions: ChartOptions<"pie">;
  walletTrendsData: ChartData<"line">;
  walletTrendsOptions: ChartOptions<"line">;
};

export const graphsData: GraphsData = {
  walletsBreakdownData: {
    labels: uniqueWallets,
    datasets: [
      {
        label: "# of Users",
        data: uniqueWallets.map(
          (currentWallet) =>
            wallets.filter((wallet) => wallet === currentWallet).length
        ),
        backgroundColor: uniqueWallets.map((_, i) => colors[i]),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  },
  walletsBreakdownOptions: {
    plugins: {
      title: {
        display: true,
        text: "Wallets Breakdown",
      },
    },
  },
  walletTrendsData: {
    labels: purchaseDates,
    datasets: uniqueWallets.map((wallet, walletIndex) => ({
      type: "line",
      backgroundColor: colors[walletIndex] + "33",
      borderColor: colors[walletIndex],
      data: walletUsageByDate[walletIndex],
      label: wallet,
    })),
  },
  walletTrendsOptions: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxis: {
        min: 0,
        max: Math.max(...([] as number[]).concat(...walletUsageByDate)),
        title: {
          text: "Number of purchases",
          display: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Wallet Trends",
      },
    },
  },
};
