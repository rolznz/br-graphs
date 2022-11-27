"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import merge from "lodash.merge";
import React from "react";
import { Pie } from "react-chartjs-2";

type PieChartProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
  formatPercent?: boolean;
};

const formatPercentPlugins: ChartOptions<"pie">["plugins"] = {
  tooltip: {
    callbacks: {
      label: (tooltipItem) => [tooltipItem.label, tooltipItem.raw + "%"],
    },
  },
};

export function PieChart({ data, options, formatPercent }: PieChartProps) {
  const extendedOptions = React.useMemo(
    () =>
      formatPercent
        ? merge(options, {
            plugins: formatPercentPlugins,
          })
        : options,
    [formatPercent, options]
  );
  return <Pie data={data} options={extendedOptions} />;
}
