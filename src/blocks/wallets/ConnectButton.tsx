import { createMemo, createSignal } from "solid-js"
import { connected, selectedWallet, setConnected, setSelctedWallet } from "./signals"
import { emitWalletEvent, WalletEvent } from "./commons"

export const ConnectButton = (props: {wallet: WalletInfo}) => {

    const [loading, setLoading] = createSignal(false)
    const active = createMemo(() => {
        return selectedWallet()?.name == props.wallet.name
    })
    return connected() && active() ? <span>Connected</span> : <button onClick={() => {
        setSelctedWallet(props.wallet);
        setLoading(true)
        emitWalletEvent(WalletEvent.onWalletSelected, {
            wallet: props.wallet,
            onConnect: () => {
                setConnected(true)
                setLoading(false)
            },            
        });
    }}>Connect</button>
}
