
"use client"

import { useEffect, useState } from "react"
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react"
import { Program, Idl, AnchorProvider, setProvider } from "@coral-xyz/anchor"
import idl from "../../target/idl/counter_sol.json"
import { Keypair, SystemProgram } from "@solana/web3.js"
import { Wallet } from "@coral-xyz/anchor"
import { useSetRecoilState } from "recoil"
import { counterAccountAtom } from "@/store/atoms"

export function Initialize() {

  const [program, setProgram] = useState<Program | null>(null)
  const { connection } = useConnection()
  const anchorWallet = useAnchorWallet()
  const setCounterAccount = useSetRecoilState(counterAccountAtom)

  useEffect(() => {
    let provider: AnchorProvider
    provider = new AnchorProvider(connection, anchorWallet as Wallet)
    setProvider(provider)
    console.log("provider\n" + provider)
    console.log("connection\n" + connection)
    console.log("anchroWallet\n" + anchorWallet)

    const newProgram = new Program(idl as Idl, provider)
    setProgram(newProgram)
    console.log("program\n" + newProgram)
  }, [])

  return (
    <div className="text-2xl"
      onClick={onClickHandler}>
      Initialize
    </div>
  )

  async function onClickHandler() {

    console.log("clicked")
    console.log("Wallet Public Key:", anchorWallet?.publicKey?.toString());
    const newAccount = Keypair.generate()
    setCounterAccount(newAccount)
    if (!program) {
      console.log("no program found")
      return;
    }
    const sig = await program.methods
      .initialize()
      .accounts({
        counter: newAccount.publicKey,
        user: [anchorWallet?.publicKey],
        systemAccount: SystemProgram.programId,
      })
      .signers([newAccount])
      .rpc()
    console.log("initialized")
    console.log("signature: " + sig)
  }

}
