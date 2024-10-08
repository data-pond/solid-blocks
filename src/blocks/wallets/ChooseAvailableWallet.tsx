import {createSignal} from "solid-js";
import { List, ListItem, ListItemContent } from "../list";
import { emitWalletEvent, WalletEvent } from "./commons";
import { selectedWallet, setConnected, setSelctedWallet } from "./signals";


export const ChooseInstalledWallet = (props: {activeWallets: Array<Wallet>}) => {

    const [loadingWallet, setLoadingWallet] = createSignal<Wallet>()


    return <div class={"row center"}>
            <List padding bordered>
                {props.activeWallets.map((w) =>  <ListItem 
                    disabled={loadingWallet().name == w.name}  
                    active={selectedWallet().name==w.name}
                    onClick={() => {
                        setLoadingWallet(w)
                        emitWalletEvent(WalletEvent.onWalletSelected, {
                            wallet: w,
                            onConnect() {
                                setConnected(true)
                                setSelctedWallet(w)
                                setLoadingWallet(null)
                            }
                        })
                    
                    }} >                    
                    <ListItemContent>
                        {JSON.stringify(w)}
                    </ListItemContent>
                    
                </ListItem> )}
            </List>    
        </div>
}
