import { ChartData, ChartOptions } from "chart.js";
import SampleDataSmall from "data/sample-data-sm.json";
import SampleDataFull from "data/sample-data.json";
import { format } from "date-fns";
import { colors } from "lib/colors";
import { Purchase } from "models/Purchase";

const UNKNOWN = "Unknown";

const startTime = Date.now();
const getTimeElapsed = () => (Date.now() - startTime) / 1000 + "s";

const sampleData =
  process.env.USE_FULL_SAMPLE === "true" ? SampleDataFull : SampleDataSmall;
const purchases = sampleData.rows as Purchase[];
console.log("Sample size: " + purchases.length, getTimeElapsed());

const wallets = purchases.map((purchase) => purchase.user_wallet ?? UNKNOWN);
console.log("Loaded wallets", getTimeElapsed());
const paymentMethods = purchases.map(
  (purchase) => purchase.payment_method ?? UNKNOWN
);
console.log("Loaded payment methods", getTimeElapsed());

const uniqueWallets = Array.from(new Set(wallets));
console.log("Loaded unique wallets", getTimeElapsed());

const uniquePaymentMethods = Array.from(new Set(paymentMethods));

const getDateLabel = (date: Date) => format(date, "d/M/yy");

const purchaseDates = Array.from(
  new Set(
    purchases
      .map((purchase) => new Date(purchase.created_time))
      .sort((a, b) => a.getTime() - b.getTime())
      .map((date) => getDateLabel(date))
  )
);
console.log("Loaded purchase dates", getTimeElapsed());

const purchasesByWallet: { [wallet: string]: Purchase[] } = {};
for (const wallet of uniqueWallets) {
  purchasesByWallet[wallet] = [];
}
for (const purchase of purchases) {
  const wallet = purchase.user_wallet ?? UNKNOWN;
  purchasesByWallet[wallet].push(purchase);
}

console.log("Loaded purchases by wallet", getTimeElapsed());

const purchasesByPaymentMethod: { [wallet: string]: Purchase[] } = {};
for (const paymentMethod of uniquePaymentMethods) {
  purchasesByPaymentMethod[paymentMethod] = [];
}
for (const purchase of purchases) {
  const paymentMethod = purchase.payment_method ?? UNKNOWN;
  purchasesByPaymentMethod[paymentMethod].push(purchase);
}

console.log("Loaded purchases by payment method", getTimeElapsed());

const walletUsageByDate = uniqueWallets.map((wallet) =>
  purchaseDates.map((date) => {
    return purchasesByWallet[wallet].filter(
      (purchase) => getDateLabel(new Date(purchase.created_time)) === date
    ).length;
  })
);
console.log("Loaded wallet usage by date", getTimeElapsed());

const paymentMethodUsageByDate = uniquePaymentMethods.map((paymentMethod) =>
  purchaseDates.map((date) => {
    return purchasesByPaymentMethod[paymentMethod].filter(
      (purchase) => getDateLabel(new Date(purchase.created_time)) === date
    ).length;
  })
);
console.log("Loaded payment method usage by date", getTimeElapsed());

const zeroConfPurchases = purchases.filter(
  (purchase) => !!purchase.zero_conf_time
);
const onChainPurchases = purchases.filter(
  (purchase) => (purchase.time_to_onchain_conf ?? 0) > 0
);

console.log("Loaded z-conf and onchain transactions", getTimeElapsed());

type GraphsData = {
  walletsBreakdownData: ChartData<"pie">;
  walletsBreakdownOptions: ChartOptions<"pie">;
  zeroConfBreakdownData: ChartData<"pie">;
  zeroConfBreakdownOptions: ChartOptions<"pie">;
  walletTrendsData: ChartData<"line">;
  walletTrendsOptions: ChartOptions<"line">;
  paymentMethodTrendsData: ChartData<"line">;
  paymentMethodTrendsOptions: ChartOptions<"line">;
};

export const graphsData: GraphsData = {
  walletsBreakdownData: {
    labels: uniqueWallets,
    datasets: [
      {
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
  zeroConfBreakdownData: {
    labels: ["Zero Conf", "On-Chain Transactions"],
    datasets: [
      {
        data: [
          Math.round((zeroConfPurchases.length / purchases.length) * 100),
          Math.round((onChainPurchases.length / purchases.length) * 100),
        ],

        backgroundColor: [0, 1].map((_, i) => colors[i]),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  },
  zeroConfBreakdownOptions: {
    plugins: {
      title: {
        display: true,
        text: "Zero Conf vs Onchain Transactions",
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
  paymentMethodTrendsData: {
    labels: purchaseDates,
    datasets: uniquePaymentMethods.map((wallet, walletIndex) => ({
      type: "line",
      backgroundColor: colors[walletIndex] + "33",
      borderColor: colors[walletIndex],
      data: paymentMethodUsageByDate[walletIndex],
      label: wallet,
    })),
  },
  paymentMethodTrendsOptions: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxis: {
        min: 0,
        max: Math.max(...([] as number[]).concat(...paymentMethodUsageByDate)),
        title: {
          text: "Number of purchases",
          display: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Payment Method Trends",
      },
    },
  },
};

console.log("Export", getTimeElapsed());
