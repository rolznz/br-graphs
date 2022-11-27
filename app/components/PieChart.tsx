"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import { chartFontConfig } from "lib/chartFontConfig";
import { defaultChartFilters } from "lib/defaultChartFilters";
import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartFilters } from "types/ChartFilters";

const defaultPieChartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: chartFontConfig,
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
  data: ChartData<"pie", { x: string; y: number }[]>;
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
        data: dataset.data
          .filter((v) => {
            const inRange =
              new Date(v.x) >= filters.startDate &&
              new Date(v.x) <= filters.endDate;

            // console.log("In range", inRange, v.x, selectionRange);
            return inRange;
          })
          .map((d) => d.y)
          .reduce((a, b) => a + b, 0),
      })),
    }),
    [data, filters]
  );

  const pieData: ChartData<"pie"> = React.useMemo(
    () => ({
      labels: rangeData.labels,
      datasets: [
        {
          data: rangeData.datasets.map((dataset) => dataset.data),
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
