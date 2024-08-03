
"use client"

import { Provider, useEffect, useState } from "react";
import { AnchorProvider, getProvider, Idl, Program, setProvider, Wallet } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import idl from "../../target/idl/counter_sol.json"
import { Initialize } from "./initCounter";
import { useRecoilValue } from "recoil";
import { counterAccountAtom } from "@/store/atoms";

export function InteractBox() {

  const { connected } = useWallet()
  return (
    <div>
      {connected ? (<InteractFn />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export function InteractFn() {

  const [count, setCount] = useState<number | null>(null)
  const [program, setProgram] = useState<Program | null>(null)
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const counterAccount = useRecoilValue(counterAccountAtom)

  useEffect(() => {
    let provider: AnchorProvider
    try {
      provider = getProvider()
      console.log("current provider")
    } catch (err) {
      provider = new AnchorProvider(connection, wallet as Wallet)
      setProvider(provider)
      console.log("new provider")
    }
    const newProgram = new Program(idl as Idl, provider)
    setProgram(newProgram)
  }, [])

  return (
    <div>
      <div onClick={onIncrement}>increment</div>
      <div>{count ? count : ("refresh")} </div>
      <div onClick={onDecrement}>decrement</div>
      <div onClick={onRefresh}>refresh</div>
    </div>
  )

  async function onIncrement() {
    console.log("incrementing")
    setCount(count ? count + 1 : 1)

    await program?.methods
      .increment()
      .accounts({
        counter: [counterAccount?.publicKey],
        user: [wallet?.publicKey]
      })
      .rpc()
  }
  async function onDecrement() {
    console.log("decrementing")
    await program?.methods
      .decrement()
      .accounts({
        counter: [counterAccount?.publicKey],
        user: [wallet?.publicKey]
      })
      .rpc()
  }

  async function onRefresh() {
    console.log("refreshing")
    console.log(count)
    const value = await program?.account.counter.fetch(count)
    setCount(Number(value))
    console.log(value)
  }
}
