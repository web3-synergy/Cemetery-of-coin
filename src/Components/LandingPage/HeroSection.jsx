'use client';
import React, { useEffect, useRef, useState } from "react";
import { Pixelify_Sans, Red_Hat_Display, Rubik_Pixels } from "next/font/google";
import styles from "./HeroSection.module.css";
import Link from "next/link";
import { AkarIconsXFill } from "../icons/AkarIconsXFill";
import { BxBxlTelegram } from "../icons/BxBxlTelegram";
import { Dexscreener } from "../icons/dexscreener";
import { Paper } from "../icons/paper";
import { Tokenomics} from "../icons/Tokenomics";
import { Believers } from "../icons/Believers";


// Fonts
const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixelify",
});
const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-redhat",
});
const rubikPixels = Rubik_Pixels({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubikpixels",
});

export default function HeroSection() {
  const videoRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Countdown timer
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-09-30");
    const difference = targetDate - new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Contract Address Copy Logic
  const [copied, setCopied] = useState(false);
  const contractAddress = "Coming soon";

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Enable sound
  const enableSound = () => {
    if (videoRef.current && !soundEnabled) {
      videoRef.current.muted = false;
      videoRef.current.removeAttribute("muted");
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) =>
          console.log("Error playing video with sound:", error)
        );
      }
      setSoundEnabled(true);
    }
  };

  // Attach listeners for first user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      enableSound();
    };
    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("scroll", handleUserInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, [soundEnabled]);

  return (
    <div
      className={`container-fluid d-flex justify-content-center align-items-center 
        ${styles.heroSection} ${pixelify.variable} ${redHat.variable} ${rubikPixels.variable}`}
    >
      <div className={styles.line}>
        {/* Topbar */}
        <div className={styles.topbar}>
          <img
            src="icon.png"
            alt="cemetery of coins"
            className={styles.heroicon}
          />

<div className={styles.desktopMenu}>
  <Link href="/believers" className={styles.menuItem}>
    <Believers className={styles.menuicon} aria-label="Believer" />
    Believers
  </Link>

  <Link href="/Tokenomics" className={styles.menuItem}>
    <Tokenomics className={styles.menuicon} aria-label="Tokenomics" />
    Tokenomics
  </Link>

  <span className={`${styles.menuItem} ${styles.disabled}`}>Dapp Soon</span>

  <Link href="/Whitelist" className={styles.minbutton}>
    Join Whitelist
  </Link>
</div>

          {/* Mobile Menu Button */}
          <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

           {/* Mobile Menu Overlay */}
{menuOpen && (
  <>
    <div
      className={styles.mobileMenuOverlay}
      onClick={() => setMenuOpen(false)}
    ></div>

    <div className={styles.mobileMenu}>
      {/* Top row: dApp Soon left, Join Whitelist right */}
      <div className={styles.mobileTopRow}>
        <span className={`${styles.menuItem} ${styles.disabled}`}>dApp Soon</span>
        <Link href="/Whitelist" className={styles.minbutton}>
    Join Whitelist
  </Link>
      </div>

      {/* Links below */}
      <div className={styles.mobilelink}>
      <Link
        href="/believers"
        className={styles.menuItem}
        onClick={() => setMenuOpen(false)}
      >
        <Believers className={styles.menuicon} aria-label="Believer" /> Believers
      </Link>

      <Link
        href="/Tokenomics"
        className={styles.menuItem}
        onClick={() => setMenuOpen(false)}
      >
        <Tokenomics className={styles.menuicon} aria-label="Tokenomics" /> Tokenomics
      </Link>
      
    
      </div>
    </div>
  </>
)}
</div>
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        >
          <source src="Cemetery.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Title */}
        <h1 className={styles.title}>CEMETERY OF COINS</h1>

        {/* Countdown */}
        <div className={styles.countdown}>
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
            const values = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.minutes,
              timeLeft.seconds,
            ];
            const formatTime = (num) => String(num ?? 0).padStart(2, "0");
            let extraLabel = "—";
            if (label === "Days") extraLabel = "Countdown";
            if (label === "Seconds") extraLabel = "Solana";

            return (
              <div key={label} className={styles.timeBox}>
                <p
                  className={`${styles.extraLabel} ${
                    extraLabel === "—" ? styles.hiddenLabel : ""
                  }`}
                >
                  {extraLabel}
                </p>
                <div className={styles.timeIconWrapper}>
                  <img src="Box.png" alt={label} className={styles.timeIcon} />
                  <span className={styles.timeValue}>
                    {formatTime(values[i])}
                  </span>
                </div>
                <p>{label}</p>
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <h1 className={styles.subtitle}>
          We don’t speak to the dead – We just bury them.
        </h1>
        <p className={styles.ticker}>Contract Address $TICKER</p>

        {/* Contract Copy Button */}
        <div className={styles.contractWrapper}>
          <button onClick={handleCopy} className={styles.contractButton}>
            Soon Token Address
          </button>
          {copied && <span className={styles.copiedText}>¡Contract Copied!</span>}
        </div>

        {/* Socials */}
        <div className={styles.socials}>
          <p className={styles.name}>Cemetery of Coins</p>
          <div className={styles.icons}>
            <Link href="#" target="_blank">
              <Dexscreener className={styles.icon} />
            </Link>
            <Link href="https://x.com/cemeteryofcoins" target="_blank">
              <AkarIconsXFill className={styles.icon} />
            </Link>
            <Link href="#" target="_blank">
              <BxBxlTelegram className={styles.icon} />
            </Link>
            <Link href="#" target="_blank">
              <Paper className={styles.icon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}