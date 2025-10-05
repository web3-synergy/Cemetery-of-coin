"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId={"cmgdbex2800uil70cw8diq9kx"} // ✅ your Privy App ID
      config={{
        loginMethods: ["wallet"],
        appearance: {
          theme: "dark", // use "dark" or "light" (not "black")
          accentColor: "#6C63FF",
          showWalletLoginFirst: true,
        },

        // ✅ WalletConnect setup for mobile browsers (Chrome/Safari)
        walletConnect: {
          projectId: "7c4ac28d76f21a2b7ad46e6e82091fcf", // from https://cloud.walletconnect.com
        },

        // ✅ Limit to only BSC (EVM chain 56)
        walletConnectors: {
          evm: {
            chains: [56],
            defaultChain: 56,
          },
          solana: null, // disable Solana
        },

        // ✅ Optional: Automatically create embedded wallet for new users
        embeddedWallets: {
          createOnLogin: "all-users",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}