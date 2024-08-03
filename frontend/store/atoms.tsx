import { Keypair } from "@solana/web3.js";
import { atom } from "recoil";

export const counterAccountAtom = atom<Keypair | null>({
  key: "counterAccountAtom",
  default: null
})
