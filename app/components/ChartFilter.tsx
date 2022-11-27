"use client";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import clsx from "clsx";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { defaultChartFilters } from "lib/defaultChartFilters";
import React from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ChartFilters } from "types/ChartFilters";
import { TimeFormat, timeFormats } from "types/TimeFormat";

type ChartFilterProps = {
  firstPurchaseDateString: string;
  lastPurchaseDateString: string;
  showTimeFormat?: boolean;
};

const rangePickerKey = "selection";

export function ChartFilter({
  firstPurchaseDateString,
  lastPurchaseDateString,
  showTimeFormat,
  children,
}: React.PropsWithChildren<ChartFilterProps>) {
  const [timeFormat, setTimeFormat] = React.useState<TimeFormat>("week");

  const firstPurchaseDate = React.useMemo(
    () => new Date(firstPurchaseDateString),
    [firstPurchaseDateString]
  );
  const lastPurchaseDate = React.useMemo(
    () => new Date(lastPurchaseDateString),
    [lastPurchaseDateString]
  );

  const startDate = React.useMemo(
    () =>
      timeFormat === "day"
        ? startOfDay(firstPurchaseDate)
        : timeFormat === "week"
        ? startOfWeek(firstPurchaseDate)
        : startOfMonth(firstPurchaseDate),
    [firstPurchaseDate, timeFormat]
  );
  const endDate = React.useMemo(
    () =>
      timeFormat === "day"
        ? endOfDay(lastPurchaseDate)
        : timeFormat === "week"
        ? endOfWeek(lastPurchaseDate)
        : endOfMonth(lastPurchaseDate),
    [lastPurchaseDate, timeFormat]
  );

  const [rangePickerOpen, setFilterMenuOpen] = React.useState(false);
  const [selectionRange, setSelectionRange] = React.useState<Range>({
    startDate,
    endDate,
    key: rangePickerKey,
  });
  const handleChangeDateRange = React.useCallback((ranges: RangeKeyDict) => {
    setSelectionRange(ranges[rangePickerKey]);
  }, []);

  return (
    <div className="relative w-full h-full">
      {rangePickerOpen && (
        <div className="absolute top-0 right-0 bg-secondary p-16 max-sm:p-4 rounded-lg flex flex-col items-start justify-center">
          {showTimeFormat && (
            <>
              <p className="text-primary-content">View by</p>
              <div className="btn-group mb-4">
                {timeFormats.map((tab) => (
                  <button
                    key={tab}
                    className={clsx(
                      "btn btn-sm capitalize",
                      tab === timeFormat && "btn-active"
                    )}
                    onClick={() => setTimeFormat(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </>
          )}
          <p className="text-primary-content">Date range</p>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleChangeDateRange}
            staticRanges={[]}
            inputRanges={[]}
          />
        </div>
      )}
      <div className="absolute top-0 right-0 p-4">
        <label className="btn btn-circle swap swap-rotate">
          <input
            type="checkbox"
            checked={rangePickerOpen}
            onChange={(e) => setFilterMenuOpen(e.target.checked)}
          />

          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      {React.cloneElement(
        children as React.ReactElement<{ filters: ChartFilters }>,
        {
          filters: {
            timeFormat,
            startDate:
              selectionRange.startDate || defaultChartFilters.startDate,
            endDate: selectionRange.endDate || defaultChartFilters.endDate,
          },
        }
      )}
    </div>
  );
}
