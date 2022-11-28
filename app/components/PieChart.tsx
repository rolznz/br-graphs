"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import { chartFontConfig, chartTextColor } from "lib/chartFontConfig";
import { defaultChartFilters } from "lib/defaultChartFilters";
import { getInRangeData } from "lib/getInRangeData";
import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartDataArray } from "types/ChartDataArray";
import { ChartFilters } from "types/ChartFilters";

const defaultPieChartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: chartFontConfig,
        color: chartTextColor,
      },
      position: "left",
      reverse: true, // zero conf
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const totalAmount = (
            tooltipItem.chart.data.datasets[0].data as number[]
          ).reduce((a, b) => a + b);

          return [
            tooltipItem.label,
            tooltipItem.raw +
              " (" +
              Math.round(((tooltipItem.raw as number) * 100) / totalAmount) +
              "%)",
          ];
        },
      },
    },
  },
};

type PieChartProps = {
  data: ChartData<"pie", ChartDataArray>;
  formatPercent?: boolean;
  filters?: ChartFilters;
};

export function PieChart({
  data,
  filters = defaultChartFilters,
}: PieChartProps) {
  const rangeData = React.useMemo(
    () => ({
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        data: getInRangeData(
          dataset.data.map((item) => ({ ...item, x: new Date(item.x) })),
          filters.startDate,
          filters.endDate
        ),
      })),
    }),
    [data, filters]
  );

  const pieData: ChartData<"pie"> = React.useMemo(
    () => ({
      labels: rangeData.labels,
      datasets: [
        {
          data: rangeData.datasets.map((dataset) =>
            dataset.data.map((item) => item.y).reduce((a, b) => a + b, 0)
          ),
          backgroundColor: rangeData.datasets.map(
            (dataset) => dataset.backgroundColor as string
          ),
          borderColor: rangeData.datasets[0].borderColor,
          borderWidth: rangeData.datasets[0].borderWidth,
        },
      ],
    }),
    [rangeData.datasets, rangeData.labels]
  );

  return <Pie data={pieData} options={defaultPieChartOptions} />;
}
