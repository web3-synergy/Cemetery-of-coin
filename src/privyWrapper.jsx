"use client";

import { PrivyProvider } from "@privy-io/react-auth";

// Detect mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(
  typeof navigator !== "undefined" ? navigator.userAgent : ""
);

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId={"cmgdbex2800uil70cw8diq9kx"} // ✅ your Privy App ID
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#6C63FF",
          showWalletLoginFirst: true,
        },

        walletConnect: {
          projectId: "7c4ac28d76f21a2b7ad46e6e82091fcf",
        },

        walletConnectors: {
          evm: {
            chains: [56],
            defaultChain: 56,
          },
          solana: null, // disable Solana
        },

        // ✅ Automatically create embedded wallet on mobile
        embeddedWallets: {
          createOnLogin: isMobile ? "all-users" : "none",
        },

        // ✅ Enable/disable external wallets dynamically
        externalWallets: {
          disableAllExternalWallets: isMobile, // true for mobile, false for desktop
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
