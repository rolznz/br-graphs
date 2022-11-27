"use client";
import { ChartData, ChartOptions } from "chart.js";
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
import { convertDate, groupData, padEmpty } from "lib/lineChartDataUtils";
import merge from "lodash.merge";
import React from "react";
import { Line } from "react-chartjs-2";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { TimeFormat, timeFormats } from "types/TimeFormat";

type LineChartProps = {
  data: ChartData<"line", { x: string; y: number }[]>;
  options: ChartOptions<"line">;
  firstPurchaseDateString: string;
  lastPurchaseDateString: string;
};

const rangePickerKey = "selection";

export function LineChart({
  data,
  options,
  firstPurchaseDateString,
  lastPurchaseDateString,
}: LineChartProps) {
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

  const [rangePickerOpen, setRangePickerOpen] = React.useState(false);
  const [selectionRange, setSelectionRange] = React.useState<Range>({
    startDate,
    endDate,
    key: rangePickerKey,
  });
  const handleSelect = React.useCallback((ranges: RangeKeyDict) => {
    setSelectionRange(ranges[rangePickerKey]);
  }, []);

  const groupedData = React.useMemo(
    () => ({
      ...data,
      datasets: data.datasets.map((set) => ({
        ...set,
        data: convertDate(
          groupData(
            padEmpty(
              firstPurchaseDate,
              lastPurchaseDate,
              set.data.map((d) => ({ ...d, x: new Date(d.x) }))
            ),
            timeFormat
          )
        ),
      })),
    }),
    [data, firstPurchaseDate, lastPurchaseDate, timeFormat]
  );

  const rangeData = React.useMemo(
    () => ({
      ...groupedData,
      datasets: groupedData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter((v) => {
          if (!selectionRange.startDate || !selectionRange.endDate) {
            throw new Error("Invalid selection range");
          }
          const inRange =
            new Date(v.x) >= selectionRange.startDate &&
            new Date(v.x) <= selectionRange.endDate;

          // console.log("In range", inRange, v.x, selectionRange);
          return inRange;
        }),
      })),
    }),
    [groupedData, selectionRange]
  );

  const extendedOptions = React.useMemo(
    () =>
      merge({}, options, {
        scales: {
          yAxis: {
            max: Math.max(
              ...([] as number[]).concat(
                ...rangeData.datasets.map((dataset) =>
                  dataset.data.map((datapoint) => datapoint.y)
                )
              )
            ),
          },
          xAxis: {
            time: {
              unit: timeFormat,
            },
          },
        },
      }),
    [rangeData.datasets, options, timeFormat]
  );

  return (
    <div className="relative w-full h-full">
      {rangePickerOpen && (
        <div className="absolute top-0 right-0 bg-secondary p-16 rounded-lg flex flex-col items-start justify-center">
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
          <p className="text-primary-content">Date range</p>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
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
            onChange={(e) => setRangePickerOpen(e.target.checked)}
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
      <Line data={rangeData} options={extendedOptions} />
    </div>
  );
}
