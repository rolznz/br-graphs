import { ChartData, ChartOptions, FontSpec } from "chart.js";
import fs from "fs";

import { format } from "date-fns";
import { colors } from "lib/colors";
import { Purchase } from "models/Purchase";
import { SampleData } from "models/SampleData";
const sampleData = JSON.parse(
  fs
    .readFileSync(
      `data/sample-data${
        process.env.USE_FULL_SAMPLE === "true" ? "" : "-sm"
      }.json`
    )
    .toString()
) as SampleData;

const UNKNOWN = "Unknown";

const chartFontConfig: Partial<FontSpec> = {
  family: "Poppins, sans-serif",
};

const startTime = Date.now();
const getTimeElapsed = () => (Date.now() - startTime) / 1000 + "s";

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

const getDateLabel = (date: Date) => format(date, "d/M");

export const sortedPurchaseDates = purchases
  .map((purchase) => new Date(purchase.created_time))
  .sort((a, b) => a.getTime() - b.getTime());

const purchaseDateLabels = Array.from(
  new Set(sortedPurchaseDates.map((date) => getDateLabel(date)))
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

const purchasesByPaymentMethod: { [paymentMethod: string]: Purchase[] } = {};
for (const paymentMethod of uniquePaymentMethods) {
  purchasesByPaymentMethod[paymentMethod] = [];
}
for (const purchase of purchases) {
  const paymentMethod = purchase.payment_method ?? UNKNOWN;
  purchasesByPaymentMethod[paymentMethod].push(purchase);
}
console.log("Loaded purchases by payment method", getTimeElapsed());

const walletUsageByDate = uniqueWallets.map((wallet) =>
  purchaseDateLabels.map((date) => {
    return purchasesByWallet[wallet].filter(
      (purchase) => getDateLabel(new Date(purchase.created_time)) === date
    ).length;
  })
);
console.log("Loaded wallet usage by date", getTimeElapsed());

const paymentMethodUsageByDate = uniquePaymentMethods.map((paymentMethod) =>
  purchaseDateLabels.map((date) => {
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
  walletsBreakdownBarData: ChartData<"bar">;
  walletsBreakdownBarOptions: ChartOptions<"bar">;
  walletsBreakdownPieData: ChartData<"pie">;
  walletsBreakdownPieOptions: ChartOptions<"pie">;
  zeroConfBreakdownData: ChartData<"pie">;
  zeroConfBreakdownOptions: ChartOptions<"pie">;
  walletTrendsData: ChartData<"line">;
  walletTrendsOptions: ChartOptions<"line">;
  paymentMethodTrendsData: ChartData<"line">;
  paymentMethodTrendsOptions: ChartOptions<"line">;
};

export const graphsData: GraphsData = {
  walletsBreakdownBarData: {
    labels: uniqueWallets,
    datasets: [
      {
        data: uniqueWallets.map(
          (currentWallet) =>
            wallets.filter((wallet) => wallet === currentWallet).length
        ),
        backgroundColor: uniqueWallets.map((_, i) => colors[i] + "AA"),
        borderColor: uniqueWallets.map((_, i) => colors[i]),
        borderWidth: 3,
      },
    ],
  },
  walletsBreakdownBarOptions: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        max: Math.max(
          ...Object.values(purchasesByWallet).map(
            (purchases) => purchases.length
          )
        ),
        title: {
          text: "Number of purchases",
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Wallet Breakdown",
      },
      legend: {
        display: false,
      },
    },
  },
  walletsBreakdownPieData: {
    labels: uniqueWallets,
    datasets: [
      {
        data: uniqueWallets.map(
          (currentWallet) => purchasesByWallet[currentWallet].length
        ),
        backgroundColor: uniqueWallets.map((_, i) => colors[i]),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  },
  walletsBreakdownPieOptions: {
    plugins: {
      title: {
        display: true,
        text: "Wallet Breakdown",
        font: chartFontConfig,
      },
      legend: {
        labels: {
          font: chartFontConfig,
        },
        position: "left",
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

        backgroundColor: [0, 8].map((i) => colors[i]),
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
        font: chartFontConfig,
      },
      legend: {
        labels: {
          font: chartFontConfig,
        },
        reverse: true,
      },
    },
  },
  walletTrendsData: {
    labels: purchaseDateLabels,
    datasets: uniqueWallets.map((wallet, walletIndex) => ({
      type: "line",
      backgroundColor: colors[walletIndex],
      borderColor: colors[walletIndex] + "CC",
      data: walletUsageByDate[walletIndex],
      label: wallet,
    })),
  },
  walletTrendsOptions: {
    elements: {
      line: {
        tension: 0.5,
      },
    },
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
        font: chartFontConfig,
      },
      legend: {
        display: false,
      },
    },
  },
  paymentMethodTrendsData: {
    labels: purchaseDateLabels,
    datasets: uniquePaymentMethods.map((paymentMethod, paymentMethodIndex) => ({
      type: "line",
      backgroundColor: colors[paymentMethodIndex] + "33",
      borderColor: colors[paymentMethodIndex],
      data: paymentMethodUsageByDate[paymentMethodIndex],
      label: paymentMethod,
    })),
  },
  paymentMethodTrendsOptions: {
    elements: {
      line: {
        tension: 0.5,
      },
    },
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
        font: chartFontConfig,
      },
      legend: {
        labels: {
          font: chartFontConfig,
        },
      },
    },
  },
};

console.log("Export", getTimeElapsed());
