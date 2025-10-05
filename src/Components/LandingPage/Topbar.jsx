"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./HeroSection.module.css";
import { Believers } from "../icons/Believers";
import { Tokenomics } from "../icons/Tokenomics";
import { Home } from "../icons/home";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.topbar}>
      {/* Logo */}
      <img src="/icon.png" alt="cemetery of coins" className={styles.heroicon} />

      {/* Desktop Menu */}
      <div className={styles.desktopMenu}>
        <Link href="/believers" className={styles.menuItem}>
          <Believers className={styles.menuicon} /> Believers
        </Link>
        <Link href="/Tokenomics" className={styles.menuItem}>
          <Tokenomics className={styles.menuicon} /> Tokenomics
        </Link>
        <span className={`${styles.menuItem} ${styles.disabled}`}>
          Dapp Soon
        </span>
        <Link href="/Whitelist" className={styles.minbutton}>
    Join Whitelist
  </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className={styles.mobileMenuOverlay}
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className={styles.mobileMenu}>
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              className={styles.closeButton}
            >
              ✕
            </button>

            {/* Top row */}
            <div className={styles.mobileTopRow}>
              <span className={`${styles.menuItem} ${styles.disabled}`}>
                dApp Soon
              </span>
              <Link href="/Whitelist" className={styles.minbutton}>
    Join Whitelist
  </Link>
            </div>

            {/* Links row */}
            <div className={styles.mobilelink}>
              <Link href="/" className={styles.menuitem} onClick={() => setMenuOpen(false)}>
              <Home className={styles.menuicon}/>Home
              </Link>
              <Link
                href="/believers"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <Believers className={styles.menuicon} /> Believers
              </Link>

              <Link
                href="/Tokenomics"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <Tokenomics className={styles.menuicon} /> Tokenomics
              </Link>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
