"use client";

import React, { useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { db, addDoc, collection } from "@/firebase";
import { query, where, getDocs, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import styles from "./Whitelist.module.css";

export default function WhitelistPage() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets, disconnect } = useWallets();
  const router = useRouter();

  const [spookyUsername, setSpookyUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whitelistSuccess, setWhitelistSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const walletAddress = wallets[0]?.address || null;

  const formatWalletAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

  // ----------------- Wallet Functions -----------------
  const handleDisconnect = async () => {
    try {
      await logout();
      if (wallets.length > 0) await disconnect(wallets[0]);

      setWhitelistSuccess(false);
      setSpookyUsername("");
      setUsernameError("");

      router.push("/");
    } catch (err) {
      console.error("Error disconnecting:", err);
    }
  };

  // ----------------- Form Validation -----------------
  const validateUsername = (username) => {
    const trimmed = username.trim();
    if (!trimmed) return "Please enter a username";
    if (trimmed.length < 3) return "Username must be at least 3 characters";
    if (trimmed.length > 20) return "Username must be 20 characters or less";
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed))
      return "Username can only contain letters, numbers, and underscores";
    return "";
  };

  // ----------------- Submit to Firestore -----------------
  const submitToWhitelist = async () => {
    const validationError = validateUsername(spookyUsername);
    if (validationError) {
      setUsernameError(validationError);
      return;
    }
    if (!walletAddress) {
      setUsernameError("Please connect your wallet");
      return;
    }

    setIsSubmitting(true);
    setUsernameError("");

    try {
      const usernameQuery = query(
        collection(db, "whitelist_users"),
        where("spookyUsername", "==", spookyUsername.trim())
      );
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        setUsernameError("Username taken");
        setIsSubmitting(false);
        return;
      }

      const walletQuery = query(
        collection(db, "whitelist_users"),
        where("walletAddress", "==", walletAddress)
      );
      const walletSnapshot = await getDocs(walletQuery);
      if (!walletSnapshot.empty) {
        setUsernameError("This wallet is already whitelisted");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, "whitelist_users"), {
        walletAddress,
        spookyUsername: spookyUsername.trim(),
        timestamp: serverTimestamp(),
      });

      setWhitelistSuccess(true);
      setSpookyUsername("");
    } catch (error) {
      console.error("Submission error:", error);
      setUsernameError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = isSubmitting || !spookyUsername.trim();

  // ----------------- UI -----------------
  if (!ready) return <p>Loading Privy...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <Image src="/logo.svg" alt="Logo" width={200} height={50} priority />
        </div>
        <p className={styles.list}>Whitelist</p>

        {!authenticated ? (
          <button className={styles.buttonPurple} onClick={() => login({ 
          method: "wallet"
            
          })}>
            <Image src="/phantom.svg" alt="Wallet" width={30} height={30} priority />
            Connect Wallet
          </button>
        ) : whitelistSuccess ? (
          <div className={styles.successScreen}>
            <div className={styles.walletInfo}>
              <div className={styles.walletAddressGroup}>
                <Image
                  src="/phantom.svg"
                  alt="Wallet"
                  width={30}
                  height={30}
                  className={styles.walletLogo}
                />
                <span className={styles.walletAddress}>
                  {formatWalletAddress(walletAddress)}
                </span>
                <span className={styles.statusDot}></span>
              </div>
              <button onClick={handleDisconnect} className={styles.disconnectBtn}>
                Disconnect
              </button>
            </div>

            <Image src="/Feedback.svg" alt="Success" width={100} height={200} priority />
            <p>You entered the waiting list successfully</p>
            <button
              className={`${styles.button} ${styles.buttonGreen}`}
              onClick={() => {
                setWhitelistSuccess(false);
                setSpookyUsername("");
                setUsernameError("");
              }}
            >
              Back to Whitelist
            </button>
          </div>
        ) : (
          <div>
            <div className={styles.walletInfo}>
              <div className={styles.walletAddressGroup}>
                <Image src="/phantom.svg" alt="Wallet" width={30} height={30} priority />
                <span className={styles.walletAddress}>
                  {formatWalletAddress(walletAddress)}
                </span>
                <span className={styles.statusDot}></span>
              </div>
              <button onClick={handleDisconnect} className={styles.disconnectBtn}>
                Disconnect
              </button>
            </div>

            <div className={styles.inputGroup}>
              <input
                value={spookyUsername}
                onChange={(e) => setSpookyUsername(e.target.value)}
                placeholder="Spooky username"
                className={styles.input}
              />
              {usernameError && <p className={styles.errorText}>{usernameError}</p>}
            </div>

            <button
              onClick={submitToWhitelist}
              disabled={isButtonDisabled}
              className={`${styles.button} ${
                isButtonDisabled ? styles.buttonDisabled : styles.buttonGreen
              }`}
            >
              {isSubmitting ? "Submitting..." : "Join Whitelist"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}