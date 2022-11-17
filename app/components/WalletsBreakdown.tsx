"use client";
import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PurchasesBreakdownProps = {
  data: ChartData<"pie">;
};

export function WalletsBreakdown({ data }: PurchasesBreakdownProps) {
  return <Pie data={data} />;
}
