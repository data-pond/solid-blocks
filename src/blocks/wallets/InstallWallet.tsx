import { List, ListItem, ListItemContent, ListItemSide } from "../list";

export const InstallableWallets = (props: {
    installableWallets: Array<Wallet>
}) => {
    return <List>
        {props.installableWallets.map( w => 
            <ListItem clickable={false}>
                <ListItemContent>
                    <div class="title">
                    {w.name}
                    </div>
                    
                </ListItemContent>
                <ListItemSide>
                    <a href={w.url} target="_blank">Link</a>
                </ListItemSide>            
            </ListItem>)}
    </List>
};