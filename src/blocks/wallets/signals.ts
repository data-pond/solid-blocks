import { createSignal } from "solid-js"

export const [selectedWallet, setSelctedWallet] = createSignal<Wallet>()
export const [connected, setConnected] = createSignal(false)