"use client";

import { PrivyProvider } from "@privy-io/react-auth";

// Detect mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(
  typeof navigator !== "undefined" ? navigator.userAgent : ""
);

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId="cmgdbex2800uil70cw8diq9kx"
      config={{
        loginMethods: ["wallet"], // you can also add 'email', 'google', etc.
        appearance: {
          theme: "dark",
          accentColor: "#6C63FF",
          showWalletLoginFirst: false, // ❌ prevents embedded wallet from blocking mobile external wallets
        },
        walletConnect: {
          projectId: "7c4ac28d76f21a2b7ad46e6e82091fcf",
        },
        walletConnectors: {
          evm: {
            chains: [
              {
                id: 56,
                name: "Binance Smart Chain",
                rpcUrls: ["https://bsc-dataseed.binance.org/"],
                nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              },
            ],
            defaultChain: 56,
          },
          solana: isMobile ? null : { network: "mainnet-beta" }, // optional: disable on mobile if needed
        },
        embeddedWallets: {
          createOnLogin: false, // ⚠ optional, prevents auto-creation on mobile
        },
        externalWallets: isMobile
          ? {
              phantom: {}, // mobile-supported wallets only
              walletConnect: {},
            }
          : {
              coinbaseWallet: {},
              phantom: {},
              walletConnect: {},
            },
      }}
    >
      {children}
    </PrivyProvider>
  );
}