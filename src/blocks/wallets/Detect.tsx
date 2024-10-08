import {Component, Show, Accessor, createEffect, createSelector} from "solid-js";
import {InstallableWallets} from "./InstallWallet";
import {ChooseInstalledWallet} from "./ChooseAvailableWallet";
import { emitWalletEvent, WalletEvent } from "./commons";
import { setConnected, setSelctedWallet } from "./signals";


export const DetectWallets: Component = (props: {
    children: any,  
    activeWallets: Array<Wallet>, 
    installableWallets: Array<Wallet>
}) => {
    if (props.activeWallets.length ===1) {
        emitWalletEvent(WalletEvent.onWalletSelected, {
            wallet: props.activeWallets[0],
            onConnect() {
                setConnected(true)
                setSelctedWallet(props.activeWallets[0])
            }
        })
        return  <>{props.children}</>
    }
    return (<>
        <Show when={props.activeWallets.length ==0}>
            <InstallableWallets installableWallets={props.installableWallets}/>
        </Show>
        <Show when={props.activeWallets.length>1}>
            <ChooseInstalledWallet activeWallets={props.activeWallets}/>
        </Show>            
    </>)
}
