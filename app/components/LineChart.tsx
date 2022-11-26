"use client";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

type LineChartProps<T = number> = {
  data: ChartData<"line", T>;
  options: ChartOptions<"line">;
};

export function LineChart<T>({ data, options }: LineChartProps<T>) {
  return <Line data={data} options={options} />;
}
