"use client"

import { Initialize } from "./initCounter";
import { useWallet } from "@solana/wallet-adapter-react";

export function InitializeToggle() {
  const wallet = useWallet()
  return (
    <div>
      {wallet.connected ? (
        <Initialize />
      ) : (
        <div>please connect your wallet</div>
      )}
    </div>
  )
}
