"use client";

import React from "react";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// ✅ 1. Create query client
const queryClient = new QueryClient();

// ✅ 2. WalletConnect Cloud project ID
const projectId = "7c4ac28d76f21a2b7ad46e6e82091fcf"; 

// ✅ 3. App metadata (shown in wallet connection modal)
const metadata = {
  name: "Cemetery of Coin",
  description: "Whitelist dApp for EVM wallets",
  url: "https://yourdomain.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// ✅ 4. Define supported networks — including BSC
const bsc = {
  id: 56,
  name: "Binance Smart Chain",
  network: "bsc",
  nativeCurrency: {
    decimals: 18,
    name: "Binance Coin",
    symbol: "BNB",
  },
  rpcUrls: {
    default: { http: ["https://bsc-dataseed.binance.org/"] },
    public: { http: ["https://bsc-dataseed.binance.org/"] },
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
};

// ✅ 5. List of chains
const networks = [mainnet, arbitrum, bsc];

// ✅ 6. Create Wagmi adapter (no defaultWagmiConfig anymore)
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: true,
});

// ✅ 7. Initialize Reown AppKit
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  features: {
    analytics: true,
  },
});

// ✅ 8. Export provider
export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}