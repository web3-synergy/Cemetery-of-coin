"use client";

import React from "react";
import { createAppKit } from "@reown/appkit/react";
import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiProvider } from "wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// ✅ 1. React Query client
const queryClient = new QueryClient();

// ✅ 2. WalletConnect Cloud project ID
const projectId = "7c4ac28d76f21a2b7ad46e6e82091fcf";

// ✅ 3. App metadata
const metadata = {
  name: "Cemetery of Coin",
  description: "Whitelist dApp for EVM wallets",
  url: "https://cemetery-of-coin.vercel.app", // must be live HTTPS
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// ✅ 4. Define BSC network
const bsc = {
  id: 56,
  name: "Binance Smart Chain",
  network: "bsc",
  nativeCurrency: { decimals: 18, name: "Binance Coin", symbol: "BNB" },
  rpcUrls: { default: { http: ["https://bsc-dataseed.binance.org/"] } },
  blockExplorers: { default: { name: "BscScan", url: "https://bscscan.com" } },
};

// ✅ 5. Supported networks
const networks = [mainnet, arbitrum, bsc];

// ✅ 6. Create Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  projectId,
  networks,
  ssr: true,
});

// ✅ 7. Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
    walletConnect: true, 
  },
});

// ✅ 8. Provider
export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
