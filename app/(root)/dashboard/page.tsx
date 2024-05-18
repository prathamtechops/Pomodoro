"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Page() {
  return (
    <main className="flex size-full flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">Study Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Stay organized and on top of your studies.
        </p>
      </div>
      <div className="flex size-full  items-center justify-center gap-4 ">
        <div className=" size-[400px] md:h-[300px] md:w-[600px] ">
          <BarChart />
        </div>
      </div>
    </main>
  );
}

const BarChart = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 255, 255, 0.3)",

        borderColor: [
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="size-full rounded-lg bg-background p-4 shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};
