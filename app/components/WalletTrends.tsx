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
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

type WalletTrendsProps = {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
};

export function WalletTrends({ data, options }: WalletTrendsProps) {
  return <Line data={data} options={options} />;
}
