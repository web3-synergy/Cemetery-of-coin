"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyWrapper({ children }) {
  return (
    <PrivyProvider
      appId="cmgdbex2800uil70cw8diq9kx"
      config={{
        loginMethods: ["wallet"], // you can also add 'email', 'google', etc.
        appearance: {
          theme: "dark",
          accentColor: "#6C63FF",
          showWalletLoginFirst: true,
        },
        walletConnect: {
          projectId: "7c4ac28d76f21a2b7ad46e6e82091fcf",
        },

        // ✅ Correct structure for wallet connectors
        walletConnectors: {
          evm: {
            // Supported EVM chains (use chain objects, not just numbers)
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
          solana: false, // explicitly disable Solana if not needed
        },

        // ✅ Embedded wallets are supported (optional)
        embeddedWallets: {
          createOnLogin: false, // set to true only if you want auto-wallet creation
        },

        // ✅ Allow external wallets (MetaMask, Phantom, etc.)
        externalWallets: {
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