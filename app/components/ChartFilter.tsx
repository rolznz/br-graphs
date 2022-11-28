"use client";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/solid";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import clsx from "clsx";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { defaultChartFilters } from "lib/defaultChartFilters";
import React from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
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

const formatDate = (date: Date, includeYear = false) =>
  format(date, `MMM d${includeYear ? ", yyyy" : ""}`);

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

  const resetDateRange = React.useCallback(() => {
    setDateRange({
      startDate,
      endDate,
      key: rangePickerKey,
    });
  }, [endDate, startDate]);

  React.useEffect(() => {
    resetDateRange();
  }, [resetDateRange]);

  const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<{
    startDate: Date;
    endDate: Date;
    key: typeof rangePickerKey;
  }>({
    startDate,
    endDate,
    key: rangePickerKey,
  });
  const handleChangeDateRange = React.useCallback((ranges: RangeKeyDict) => {
    if (ranges[rangePickerKey].startDate && ranges[rangePickerKey].endDate) {
      setDateRange({
        startDate: ranges[rangePickerKey].startDate,
        endDate: ranges[rangePickerKey].endDate,
        key: rangePickerKey,
      });
    }
  }, []);

  const resetFilters = React.useCallback(() => {
    setTimeFormat(defaultChartFilters.timeFormat);
    resetDateRange();
    setFilterMenuOpen(false);
  }, [resetDateRange]);

  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center gap-4">
      {filterMenuOpen && (
        <div className="absolute -top-20 -right-4 p-16 py-4 max-sm:p-4 rounded-lg flex flex-col items-start justify-center z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-slate-400 opacity-70 -z-10" />
          {showTimeFormat && (
            <>
              <p className="text-primary-content font-bold mb-2">View by</p>
              <div className="btn-group mb-4">
                {timeFormats.map((tab) => (
                  <button
                    key={tab}
                    className={clsx(
                      "btn btn-sm capitalize",
                      tab === timeFormat && "btn-active"
                    )}
                    onClick={() => {
                      setTimeFormat(tab);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </>
          )}
          <p className="text-primary-content font-bold mb-2">Date range</p>
          <DateRangePicker
            ranges={[dateRange]}
            onChange={handleChangeDateRange}
            staticRanges={[]}
            inputRanges={[]}
            className="rounded-lg overflow-hidden"
          />
          <div className="divider" />
          <div className="w-full flex justify-end">
            <button className="btn btn-primary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      )}
      <div className="absolute -top-16 right-0 z-20">
        <label className="btn btn-circle swap swap-rotate">
          <input
            type="checkbox"
            checked={filterMenuOpen}
            onChange={(e) => setFilterMenuOpen(e.target.checked)}
          />

          <FunnelIcon className="h-6 w-6 swap-off fill-current" />

          <XMarkIcon className="h-6 w-6 swap-on fill-current" />
        </label>
      </div>
      <h3 className="text-primary-content text-sm font-bold absolute -top-6">
        {showTimeFormat && <>by {timeFormat} • </>}
        {formatDate(dateRange.startDate)}-{formatDate(dateRange.endDate, true)}
      </h3>
      {React.cloneElement(
        children as React.ReactElement<{ filters: ChartFilters }>,
        {
          filters: {
            timeFormat,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        }
      )}
    </div>
  );
}
