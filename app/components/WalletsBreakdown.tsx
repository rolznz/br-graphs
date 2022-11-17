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

type PurchasesBreakdownProps = {
  data: ChartData<"pie">;
  options: ChartOptions<"pie">;
};

export function WalletsBreakdown({ data, options }: PurchasesBreakdownProps) {
  return <Pie data={data} options={options} />;
}
