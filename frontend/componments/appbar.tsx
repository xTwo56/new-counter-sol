"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export function Appbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-purple-200">
      <div className="text-purple-700 text-4xl">Solana</div>
      <WalletMultiButton />
    </div>
  )
}
