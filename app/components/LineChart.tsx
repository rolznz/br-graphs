"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { chartFontConfig } from "lib/chartFontConfig";
import { defaultChartFilters } from "lib/defaultChartFilters";
import { convertDate, groupData, padEmpty } from "lib/lineChartDataUtils";
import merge from "lodash.merge";
import React from "react";
import { Line } from "react-chartjs-2";
import { ChartDataArray } from "types/ChartDataArray";
import { ChartFilters } from "types/ChartFilters";

const defaultLineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: chartFontConfig,
      },
    },
  },
  elements: {
    line: {
      tension: 0.5,
      fill: true,
    },
  },
  scales: {
    yAxis: {
      title: {
        display: true,
        text: "Number of purchases",
        font: chartFontConfig,
      },
    },
    xAxis: {
      type: "time",
    },
  },
};

type LineChartProps = {
  data: ChartData<"line", ChartDataArray>;
  title?: string;
  firstPurchaseDateString: string;
  lastPurchaseDateString: string;
  filters?: ChartFilters;
};

export function LineChart({
  data,
  firstPurchaseDateString,
  lastPurchaseDateString,
  filters = defaultChartFilters,
}: LineChartProps) {
  const firstPurchaseDate = React.useMemo(
    () => new Date(firstPurchaseDateString),
    [firstPurchaseDateString]
  );
  const lastPurchaseDate = React.useMemo(
    () => new Date(lastPurchaseDateString),
    [lastPurchaseDateString]
  );

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
            filters.timeFormat
          )
        ),
      })),
    }),
    [data, firstPurchaseDate, lastPurchaseDate, filters]
  );

  const rangeData = React.useMemo(
    () => ({
      ...groupedData,
      datasets: groupedData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter((v) => {
          const inRange =
            new Date(v.x) >= filters.startDate &&
            new Date(v.x) <= filters.endDate;

          // console.log("In range", inRange, v.x, selectionRange);
          return inRange;
        }),
      })),
    }),
    [groupedData, filters]
  );

  const extendedOptions = React.useMemo(
    () =>
      merge({}, defaultLineChartOptions, {
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
              unit: filters.timeFormat,
            },
          },
        },
      }),
    [rangeData.datasets, filters.timeFormat]
  );

  return <Line data={rangeData} options={extendedOptions} />;
}
