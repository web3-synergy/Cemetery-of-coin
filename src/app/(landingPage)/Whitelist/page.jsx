"use client";

import React, { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import styles from "./Whitelist.module.css";

export default function WhitelistPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const router = useRouter();

  const [spookyUsername, setSpookyUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whitelistSuccess, setWhitelistSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const walletAddress = address || null;

  const formatWalletAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

  const validateUsername = (username) => {
    const trimmed = username.trim();
    if (!trimmed) return "Please enter a username";
    if (trimmed.length < 3) return "Username must be at least 3 characters";
    if (trimmed.length > 20) return "Username must be 20 characters or less";
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed))
      return "Username can only contain letters, numbers, and underscores";
    return "";
  };

  // ✅ Wallet connection handled entirely via AppKit
  const handleConnect = async () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    try {
      if (isMobile) {
        // ✅ Deep link for MetaMask mobile
        window.location.href = "https://metamask.app.link/dapp/https://cemetery-of-coin.vercel.app/";
  
        // Optional: fallback QR code for other wallets
        // You can implement a modal with WalletConnect QR code if needed
      } else {
        // Desktop: open AppKit modal
        await open();
      }
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  };
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
      // Check username uniqueness
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

      // Check wallet uniqueness
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

      // Add to Firestore
      await addDoc(collection(db, "whitelist_users"), {
        walletAddress,
        spookyUsername: spookyUsername.trim(),
        chainType: "evm",
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

  const handleDisconnect = async () => {
    try {
      disconnect();
      setWhitelistSuccess(false);
      setSpookyUsername("");
      setUsernameError("");
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  const isButtonDisabled = isSubmitting || !spookyUsername.trim();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <Image src="/logo.svg" alt="Logo" width={200} height={50} priority />
        </div>
        <p className={styles.list}>Whitelist</p>

        {!isConnected ? (
          <button onClick={handleConnect} className={styles.buttonPurple}>
            <Image src="/Wallet.svg" alt="Wallet" width={18} height={18} priority />
            Connect Wallet
          </button>
        ) : whitelistSuccess ? (
          <div className={styles.successScreen}>
            <div className={styles.walletInfo}>
              <div className={styles.walletAddressGroup}>
                <Image src="/Wallet.svg" alt="Wallet" width={20} height={20} className={styles.WalletLogo} />
                <span className={styles.walletAddress}>{formatWalletAddress(walletAddress)}</span>
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
              onClick={() => router.push("/believers")}
            >
              Back to Whitelist
            </button>
          </div>
        ) : (
          <div>
            <div className={styles.walletInfo}>
              <div className={styles.walletAddressGroup}>
                <Image src="/Wallet.svg" alt="Wallet" width={20} height={20} priority />
                <span className={styles.walletAddress}>
                  {formatWalletAddress(walletAddress) || "No wallet connected"}
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