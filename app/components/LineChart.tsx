"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { chartFontConfig } from "lib/chartFontConfig";
import { defaultChartFilters } from "lib/defaultChartFilters";
import { getInRangeData } from "lib/getInRangeData";
import { groupData } from "lib/groupData";
import { sortData } from "lib/sortData";
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
  filters?: ChartFilters;
};

export function LineChart({
  data,
  filters = defaultChartFilters,
}: LineChartProps) {
  const rangeData = React.useMemo(
    () => ({
      ...data,
      datasets: data.datasets.map((set) => ({
        ...set,
        data: sortData(
          groupData(
            getInRangeData(
              set.data.map((item) => ({ ...item, x: new Date(item.x) })),
              filters.startDate,
              filters.endDate
            ),
            filters.timeFormat
          )
        ).map((entry) => ({ x: entry.x.toISOString(), y: entry.y })),
      })),
    }),
    [data, filters]
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
