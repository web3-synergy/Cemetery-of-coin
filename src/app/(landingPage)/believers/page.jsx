"use client";
import React, { useEffect, useState } from "react";
import Topbar from "@/Components/LandingPage/Topbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import styles from "./believers.module.css";

const BelieversTable = () => {
  const [believers, setBelievers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBelievers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "whitelist_users"));
        const data = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          index: index + 1,
          ...doc.data(),
        }));
        console.log("Fetched believers:", data);
        setBelievers(data);
      } catch (err) {
        console.error("Error fetching believers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBelievers();
  }, []);

  // Helper to truncate wallet address
  const formatWalletAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "N/A";

  return (
    <div className={styles.tableContainer}>
      {loading ? (
        <p>Loading believers...</p>
      ) : believers.length === 0 ? (
        <p>No believers found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.believersTable}>
            <thead>
              <tr>
                <th className={styles.Numbers}>#</th>
                <th className={styles.Users}>USERNAME</th>
                <th className={styles.Wallet}>WALLET</th>
              </tr>
            </thead>
            <tbody>
              {believers.map((b) => (
                <tr key={b.id}>
                  <td>{b.index}</td>
                  <td>{b.spookyUsername || "USERNAME"}</td>
                  <td>{formatWalletAddress(b.walletAddress)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default function BelieversPage() {
  return (
    <div className={styles.container}>
      <Topbar />
      <h1 className={styles.title}>BELIEVERS TABLE</h1>
      <BelieversTable />
    </div>
  );
}