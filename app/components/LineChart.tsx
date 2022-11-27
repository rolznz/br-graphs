"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import React from "react";
import { Line } from "react-chartjs-2";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type LineChartProps = {
  data: ChartData<"line", { x: string; y: number }[]>;
  options: ChartOptions<"line">;
  startDateString: string;
  endDateString: string;
};

const rangePickerKey = "selection";

export function LineChart({
  data,
  options,
  startDateString,
  endDateString,
}: LineChartProps) {
  const [rangePickerOpen, setRangePickerOpen] = React.useState(false);
  const [selectionRange, setSelectionRange] = React.useState<Range>({
    startDate: new Date(startDateString),
    endDate: new Date(endDateString),
    key: rangePickerKey,
  });
  const handleSelect = React.useCallback((ranges: RangeKeyDict) => {
    setSelectionRange(ranges[rangePickerKey]);
  }, []);

  const rangeData = React.useMemo(
    () => ({
      ...data,
      datasets: data.datasets.map((dataset) => ({
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
    [data, selectionRange]
  );

  return (
    <div className="relative w-full h-full">
      {rangePickerOpen && (
        <div className="absolute top-0 right-0 bg-secondary p-16 rounded-lg">
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
      <Line data={rangeData} options={options} />
    </div>
  );
}
