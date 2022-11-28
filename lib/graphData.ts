import { generateBreakdownData } from "lib/generateBreakdownData";
import { generateTrendData } from "lib/generateTrendData";
import { sampleData } from "lib/sampleData";
import { Purchase } from "types/Purchase";

const UNKNOWN = "Unknown";

const startTime = Date.now();
const getTimeElapsed = () => (Date.now() - startTime) / 1000 + "s";

export const purchases = sampleData.rows as Purchase[];

export const sortedPurchaseDates = purchases
  .map((purchase) => new Date(purchase.created_time))
  .sort((a, b) => a.getTime() - b.getTime());

export const firstPurchaseDate = sortedPurchaseDates[0];
export const lastPurchaseDate =
  sortedPurchaseDates[sortedPurchaseDates.length - 1];

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

const zeroConfPurchases = purchases.filter(
  (purchase) => !!purchase.zero_conf_time
);
const onChainPurchases = purchases.filter(
  (purchase) => (purchase.time_to_onchain_conf ?? 0) > 0
);

const uniqueConfTypes = ["Zero Conf", "On-Chain Transactions"];
const purchasesByConfType = {
  [uniqueConfTypes[0]]: zeroConfPurchases,
  [uniqueConfTypes[1]]: onChainPurchases,
};

console.log("Loaded z-conf and onchain transactions", getTimeElapsed());

export const graphData = {
  walletTimeTrendsData: generateTrendData(uniqueWallets, purchasesByWallet),
  walletsBreakdownData: generateBreakdownData(uniqueWallets, purchasesByWallet),
  paymentMethodTrendsData: generateTrendData(
    uniquePaymentMethods,
    purchasesByPaymentMethod
  ),
  paymentMethodsBreakdownData: generateBreakdownData(
    uniquePaymentMethods,
    purchasesByPaymentMethod
  ),
  zeroConfTrendsData: generateTrendData(uniqueConfTypes, purchasesByConfType),
  zeroConfBreakdownData: generateBreakdownData(
    uniqueConfTypes,
    purchasesByConfType
  ),
};

console.log("Graph data size", JSON.stringify(graphData).length / 1000 + "kb");

console.log("Export", getTimeElapsed());
