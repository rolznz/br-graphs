"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

type BarChartProps = {
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
};

export function BarChart({ data, options }: BarChartProps) {
  return <Bar data={data} options={options} />;
}
