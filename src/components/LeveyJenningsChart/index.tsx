// components/qc/LeveyJenningsChart.tsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { QCRecord } from "../../types/qc";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LeveyJenningsChartProps {
  data: QCRecord[];
}

const LeveyJenningsChart: React.FC<LeveyJenningsChartProps> = ({ data }) => {
  const [mean, setMean] = useState<number>(0);
  const [stdDev, setStdDev] = useState<number>(0);

  useEffect(() => {
    if (data.length > 0) {
      const results = data.map((record) => record.result);
      const calculatedMean =
        results.reduce((acc, curr) => acc + curr, 0) / results.length;
      const variance =
        results.reduce(
          (acc, curr) => acc + Math.pow(curr - calculatedMean, 2),
          0
        ) / results.length;
      const calculatedStdDev = Math.sqrt(variance);

      setMean(calculatedMean);
      setStdDev(calculatedStdDev);
    }
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="no-data-message text-center text-gray-500">
        <p>No QC data available.</p>
        <p>Please upload a CSV file to visualize the Levey-Jennings chart.</p>
      </div>
    );
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: data.map((record) => record.date),
    datasets: [
      {
        label: "QC Results",
        data: data.map((record) => record.result),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: false,
        tension: 0.1,
        pointBackgroundColor: "rgba(75,192,192,1)",
      },
      {
        label: "Mean",
        data: Array(data.length).fill(mean),
        borderColor: "rgba(255, 206, 86, 1)",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
      {
        label: "UCL (Mean + 3σ)",
        data: Array(data.length).fill(mean + 3 * stdDev),
        borderColor: "rgba(255, 99, 132, 1)",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
      {
        label: "LCL (Mean - 3σ)",
        data: Array(data.length).fill(mean - 3 * stdDev),
        borderColor: "rgba(54, 162, 235, 1)",
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Levey-Jennings Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Result",
        },
        min: mean - 5 * stdDev,
        max: mean + 5 * stdDev,
      },
    },
  };

  return (
    <div className="levey-jennings-chart bg-white p-6 rounded shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LeveyJenningsChart;
