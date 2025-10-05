"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId="cmgdbex2800uil70cw8diq9kx"
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "black",
          accentColor: "#6C63FF",
          showWalletLoginFirst: true,
        },
        embeddedWallets: {
          createOnLogin: "all-users",
        },
        walletConnectors: {
          evm: {
            chains: [56], // BSC
            defaultChain: 56,
            walletConnectProjectId: "7c4ac28d76f21a2b7ad46e6e82091fcf", // 👈 Your WalletConnect project ID
          },
          solana: null,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
