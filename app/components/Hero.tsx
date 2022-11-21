import { format } from "date-fns";
import { sortedPurchaseDates } from "lib/graphsData";

const formatHeroDate = (date: Date, includeYear = false) =>
  format(date, `MMM d${includeYear ? ", yyyy" : ""}`);

export function Hero() {
  return (
    <div className="w-full py-16 bg-black flex flex-col justify-center items-center gap-2">
      <h1 className="text-white text-5xl font-sans font-bold tracking-wide">
        Statistics
      </h1>
      <h2 className="text-white text-lg font-sans font-bold">
        All customers | {formatHeroDate(sortedPurchaseDates[0])} -{" "}
        {formatHeroDate(
          sortedPurchaseDates[sortedPurchaseDates.length - 1],
          true
        )}
      </h2>
    </div>
  );
}
