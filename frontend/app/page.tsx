"use client"

import { Appbar } from "@/componments/appbar";
import WalletContextProvider from "@/componments/walletContextProvider";
import { InitializeToggle } from "@/componments/initToggle";
import { RecoilRoot } from "recoil";
import "@solana/wallet-adapter-react-ui/styles.css"
import { InteractBox } from "@/componments/interactBox";

export default function Home() {
  return (
    <div className="bg-blue-100">
      <RecoilRoot>
        <WalletContextProvider>
          <Appbar />
          <InitializeToggle />
          <InteractBox />
          hi there
        </WalletContextProvider>
      </RecoilRoot>
    </div>
  );
}
