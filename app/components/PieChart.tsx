"use client";
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

type PieChartProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
  formatPercent?: boolean;
};

const formatPercentPlugins: ChartOptions<"pie">["plugins"] = {
  datalabels: {
    formatter: function (value: string) {
      return value + "%";
    },
  },
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
