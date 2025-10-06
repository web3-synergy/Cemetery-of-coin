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
          "green",   
          "#2A1A3D",   
          "#D2691E",   
          "#F5F5F5", 
          "#1C2526",
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
        display: false,
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
        <div className={styles.legendGrid}>
  {data.labels.map((label, index) => (
    <div key={label} className={styles.legendItem}>
      <span
        className={styles.legendColor}
        style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
      ></span>
      <span className={styles.legendLabel}>{label}</span>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default TokenomicsChart;
