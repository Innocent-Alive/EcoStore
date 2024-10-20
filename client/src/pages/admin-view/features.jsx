import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut, Bar, Scatter, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement
);

const statusColors = {
  confirmed: "#2563EB",
  rejected: "#DC2626",
  delivered: "#16A34A",
  pending: "#F59E0B",
  inShipping: "#4BC0C0",
  default: "#6B7280",
};

function AdminFeatures() {
  const [orderChartData, setOrderChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [productChartData, setProductChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [stockChartData, setStockChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [userLoginChartData, setUserLoginChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/orders/order-status`)
      .then((response) => {
        const data = response.data;

        const labels = data.map((item) => item.status);
        const counts = data.map((item) => item.count);
        const backgroundColors = data.map(
          (item) => statusColors[item.status] || statusColors.default
        );

        setOrderChartData({
          labels,
          datasets: [
            {
              label: "Orders",
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
        console.error("Error fetching order chart data:", error);
      });

    // Fetch Product Stats Data
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/products/stats`)
      .then((response) => {
        const { categoryStats, stockStats } = response.data.data;

        const labels = categoryStats.map((stat) => stat._id);
        const values = categoryStats.map((stat) => stat.count);

        setProductChartData({
          labels: labels,
          datasets: [
            {
              label: "Products Count",
              data: values,
              backgroundColor: "#ba9659",
              borderColor: "#f4e8da",
              borderWidth: 2,
              barPercentage: 0.5,
              hoverBackgroundColor: "#ba9659",
              hoverBorderColor: "#838a60",
            },
          ],
        });

        const stockCounts = {
          outOfStock: 0,
          limitedStocks: 0,
          inStock: 0,
        };

        stockStats.forEach((product) => {
          if (product.totalStock === 0) {
            stockCounts.outOfStock += 1;
          } else if (product.totalStock < 10) {
            stockCounts.limitedStocks += 1;
          } else {
            stockCounts.inStock += 1;
          }
        });

        setStockChartData({
          labels: ["Out of Stock", "Limited Stocks (<10)", "In Stock"],
          datasets: [
            {
              label: "Stock Status",
              data: [
                stockCounts.outOfStock,
                stockCounts.limitedStocks,
                stockCounts.inStock,
              ],
              backgroundColor: ["#DC2626", "#F59E0B", "#16A34A"],
              borderColor: "#f4e8da",
              borderWidth: 2,
              hoverBackgroundColor: ["#B52A2A", "#D69E0B", "#148A2A"],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching product stats:", error);
      });

    // Fetch User Login Stats Data
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/userStats/stats`)
      .then((response) => {
        const data = response.data;

        // Ensure the data is sorted chronologically (by year and month)
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(`${a.month} 1, ${a.year}`);
          const dateB = new Date(`${b.month} 1, ${b.year}`);
          return dateA - dateB;
        });

        // Get the last 12 months of data
        const recentData = sortedData.slice(-12);

        const labels = recentData.map((item) => `${item.month} ${item.year}`);
        const counts = recentData.map((item) => item.count);

        setUserLoginChartData({
          labels,
          datasets: [
            {
              label: "New Users Every Month",
              data: labels.map((label, index) => ({
                x: index + 1,
                y: counts[index],
              })),
              backgroundColor: "#838a60",
              hoverBackgroundColor: "#ba9659",
              borderColor: "#f4e8da",
              borderWidth: 2,
              pointRadius: 10,
              hoverRadius: 11,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching user login stats:", error);
      });
  }, []);

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(186, 150, 89, 0.4)",
        },
        ticks: {
          color: "#ba9659",
        },
      },
      y: {
        grid: {
          color: "rgba(186, 150, 89, 0.4)",
        },
        ticks: {
          color: "#ba9659",
        },
      },
    },
  };
  const chartOptionsUser = {
    responsive: true,
    maintainAspectRatio: false,
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
            return `Users Registered: ${tooltipItem.raw.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        grid: {
          color: "rgba(186, 150, 89, 0.4)",
        },
        ticks: {
          color: "#ba9659",
          autoSkip: false,
        },
      },
      y: {
        grid: {
          color: "rgba(186, 150, 89, 0.4)",
        },
        ticks: {
          color: "#ba9659",
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className="admin-features flex flex-col">
      <div className="mb-16 w-11/12 self-center">
        <h2 className="text-primary text-center text-2xl md:text-3xl font-semibold mb-5">
          Product Count by Category
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-1 m-auto"
        >
          {productChartData.labels.length > 0 ? (
            <div style={{ position: "relative", height: "400px" }}>
              <Bar data={productChartData} options={chartOptions} />
            </div>
          ) : (
            <p>No product data available for chart.</p>
          )}
        </motion.div>
      </div>
      <div className="flex flex-wrap flex-col items-center lg:items-start lg:flex-row">
        <div className="mb-16 md:w-1/2 w-2/3">
          <h2 className="text-primary text-center text-2xl md:text-3xl font-semibold mb-5">
            Order Status Overview
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-1 m-auto"
          >
            <div style={{ position: "relative", height: "400px" }}>
              <Doughnut data={orderChartData} options={chartOptions} />
            </div>
          </motion.div>
        </div>
        <div className="md:w-1/2 w-2/3">
          <h2 className="text-primary text-center text-2xl md:text-3xl font-semibold mb-5">
            Stock Status Overview
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-1 m-auto"
          >
            <div style={{ position: "relative", height: "400px" }}>
              <Pie data={stockChartData} options={chartOptions} />{" "}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="mb-16 w-11/12 self-center">
        <h2 className="text-primary text-center text-2xl md:text-3xl font-semibold mb-5">
          User Login Stats
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-1 m-auto"
        >
          {userLoginChartData.datasets.length > 0 ? (
            <div style={{ position: "relative", height: "400px" }}>
              <Scatter data={userLoginChartData} options={chartOptionsUser} />
            </div>
          ) : (
            <p>No user login data available for chart.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminFeatures;
