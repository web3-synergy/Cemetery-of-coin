"use client";
import React from "react";
import Topbar from "@/Components/LandingPage/Topbar";
import { Pie } from "react-chartjs-2";
import styles from "./Tokenomics.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TokenomicsChart = () => {
  const data = {
    labels: ["Team", "Investors", "Community / Rewards", "Liquidity", "Marketing"],
    datasets: [
      {
        label: "Token Allocation",
        data: [20, 15, 30, 20, 15],
        backgroundColor: [
          "rgba(57, 249, 69, 0.8)",   
          "rgba(57, 200, 57, 0.6)",   
          "rgba(34, 139, 34, 0.4)",   
          "rgba(144, 238, 144, 0.5)", 
          "rgba(0, 128, 0, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "40%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 16 },
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>TOKENOMICS</h2>
        
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TokenomicsChart;
