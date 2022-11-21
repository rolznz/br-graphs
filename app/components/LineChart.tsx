"use client";
import {
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

type LineChartProps = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
};

export function LineChart({ data, options }: LineChartProps) {
  return <Line data={data} options={options} />;
}
