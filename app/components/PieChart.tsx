"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
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
      label: (tooltipItem) => tooltipItem.raw + "%",
    },
  },
};

export function PieChart({ data, options, formatPercent }: PieChartProps) {
  const extendedOptions = React.useMemo(
    () => ({
      ...options,
      plugins: {
        ...options.plugins,
        ...(formatPercent ? formatPercentPlugins : {}),
      },
    }),
    [formatPercent, options]
  );
  return <Pie data={data} options={extendedOptions} />;
}
