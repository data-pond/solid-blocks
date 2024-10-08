import {Show} from "solid-js";
import { List, ListItem, ListItemContent, ListItemSide } from "../list";


export const AvailableWallets = (props: {
    activeWallets: Array<Wallet>,
    installableWallets: Array<Wallet>
}) => {

    return <Show when={props.activeWallets.length>0}>
        <List bordered>            
            { props.activeWallets.map((wallet) => <ListItem clickable={false}>                
                    <ListItemSide>
                        <img src={wallet.icon} />
                    </ListItemSide>
                    <ListItemContent>
                        <div class={"title"}>{wallet.name}</div>
                    </ListItemContent>
                    <ListItemSide>
                    {selectedWallet()?.name == wallet.name
                            ? <span>Linked</span>
                            : <button onClick={() => {                                
                                alert("Coming soon - this action will clear your previous library and replace it with an empty one")
                                return;                    
                            }}>Select & Unlink</button>}
                    </ListItemSide>
                </ListItem>)}
            

            {props.installableWallets.map((wallet) => <ListItem clickable={false}>
                    <ListItemContent>
                        <div class="title">
                            {wallet.name}
                        </div>
                    </ListItemContent>
                    <ListItemSide>
                        <a href={wallet.url} target={"_blank"}>install</a>
                    </ListItemSide>
                    
                </ListItem>)}
        </List>
    </Show>
}