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
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type PieChartProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
};

export function PieChart({ data, options }: PieChartProps) {
  return <Pie data={data} options={options} />;
}
