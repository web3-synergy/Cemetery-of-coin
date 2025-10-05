"use client";

import { PrivyProvider } from "@privy-io/react-auth";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId={"cmgdbex2800uil70cw8diq9kx"}
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
          solana: null,
        },
        // ✅ Automatically use embedded wallet on mobile
        embeddedWallets: {
          createOnLogin: isMobile ? "all-users" : "none",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}