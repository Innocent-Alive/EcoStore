// ReviewChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const statusColors = {
  1: "#2563EB", // 1 star
  2: "#F59E0B", // 2 stars
  3: "#FBBF24", // 3 stars
  4: "#16A34A", // 4 stars
  5: "#4BC0C0", // 5 stars
};

function ReviewChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch review data from backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/reviews`)
      .then((response) => {
        const data = response.data.data; // Adjust this based on your API response structure

        // Prepare labels and data for the chart
        const labels = Object.keys(statusColors);
        const counts = labels.map(
          (star) =>
            data.filter((review) => review.reviewValue === parseInt(star))
              .length
        );

        const backgroundColors = labels.map(
          (star) => statusColors[star] || "#000000"
        );

        setChartData({
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor: backgroundColors,
              borderColor: "#f4e8da",
              borderWidth: 2,
              hoverBackgroundColor: backgroundColors.map((color) =>
                lightenColor(color, 8)
              ),
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching review data:", error);
      });
  }, []);

  // Function to lighten the color for hover effect and borders
  function lightenColor(hex, percent) {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h3 className="text-primary">Product Reviews Overview</h3>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
}

const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: "#838a60",
      },
    },
    tooltip: {
      backgroundColor: "#838a60",
      titleColor: "#f4e8da",
      bodyColor: "#f4e8da",
      borderColor: "#838a60",
      borderWidth: 2,
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label} stars: ${tooltipItem.raw} reviews`;
        },
      },
    },
  },
};

export default ReviewChart;
