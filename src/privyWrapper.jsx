"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId="cmgdbex2800uil70cw8diq9kx"
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "dark",
          accentColor: "#6C63FF",
          showWalletLoginFirst: true,
        },
        embeddedWallets: {
          createOnLogin: "all-users",
        },
        walletConnect: {
          projectId: "7c4ac28d76f21a2b7ad46e6e82091fcf", // ✅ Move here
        },
        walletConnectors: {
          evm: {
            chains: [56], // ✅ Binance Smart Chain
            defaultChain: 56,
          },
          solana: null,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
