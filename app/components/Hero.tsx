import CountUp from "app/components/CountUp";
import { ViewStatisticsButton } from "app/components/ViewStatisticsButton";
import { format } from "date-fns";
import { purchases, sortedPurchaseDates } from "lib/graphData";

const formatHeroDate = (date: Date, includeYear = false) =>
  format(date, `MMM d${includeYear ? ", yyyy" : ""}`);

export function Hero() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content pb-16 text-center">
        <div className="max-w-lg">
          <h1 className="mb-4 text-6xl text-primary-content font-bold tracking-wide h-16">
            <CountUp end={purchases.length} duration={1} />
          </h1>
          <h1 className="mb-4 text-4xl text-primary-content font-bold tracking-wide">
            Customer Purchases
          </h1>
          <h3 className="mb-4 text-primary-content text-sm">
            {formatHeroDate(sortedPurchaseDates[0])} -{" "}
            {formatHeroDate(
              sortedPurchaseDates[sortedPurchaseDates.length - 1],
              true
            )}
          </h3>
          <ViewStatisticsButton />
        </div>
      </div>
    </div>
  );
}
