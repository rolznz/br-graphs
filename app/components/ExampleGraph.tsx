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

export function ExampleGraph() {
  const userDates = ["10/11", "11/11"];
  const datasetData = [5, 10];

  const data: ChartData<"line"> = {
    labels: userDates,
    datasets: [
      {
        type: "line",
        backgroundColor: "#000",
        borderColor: "#f00",
        data: datasetData,
        label: "Test Label",
      },
    ],
  };
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      yAxis: {
        min: 0,
        max: 10,
        title: {
          text: "#users",
          display: true,
        },
        ticks: {
          callback: (val) => val,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Graph Title",
      },
    },
  };
  return <Line data={data} options={chartOptions} />;
}
