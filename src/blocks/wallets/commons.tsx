
export interface onWalletConnectedData {
    tech: 'tron' | 'move',
    wallet: WalletInfo, 
    account: AccountInfo
}

export enum WalletEvent  {
    onWalletSelected = 'onWalletSelected',
    onWalletNotFound= 'onWalletNotFound',
    onWalletConnectError = 'onWalletConnectError'
}


export const emitWalletEvent = (event: WalletEvent, data: any) => {
    const evt = new CustomEvent(event, {
        detail: data
    });
    window.dispatchEvent(evt)
}


export const onWalletUXSideSelected = (data: Wallet) => {


    window.addEventListener(WalletEvent.onWalletSelected, e => {
        const {wallet, onSelect} = e.detail;


        const {name, icon, url} = wallet;
        
        /**
         * Do the connect(name) logic here
         */
        onSelect(); // when the connect is sucessfull

    });


    window.addEventListener(WalletEvent.onWalletNotFound, e => {


        
    })

    

}