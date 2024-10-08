
import {createSignal, For, JSXElement, Show} from "solid-js";
import { MimeTypes } from "./arweaveUploadBtn/contentTypes";
import { createFileUploader } from "@solid-primitives/upload";
import { ArweaveConfig } from "./arweaveUploadBtn/config";
import Arweave from 'arweave';

export const ArConnect = (props: { children: JSXElement, notDetected: JSXElement }) => {
    const [connected, setConnected] = createSignal(false)
    const [address, setAddress] = createSignal<string>()


    const [detected, setDetected] = createSignal(false)

    addEventListener("arweaveWalletLoaded", async () => {
        setDetected(true);

        // now we can interact with ArConnect
        const permissions = await window.arweaveWallet.getPermissions();

    

        if (permissions.length < 6) {
            await window.arweaveWallet.connect(["ACCESS_ADDRESS", 'SIGN_TRANSACTION', 'ENCRYPT', 'DECRYPT', 'SIGNATURE', 'DISPATCH'], {
                name: "Move File System dp1",
                logo: "https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk",
            }).catch(console.error).finally(() => {
                console.log('Permissions Setup' )
                setConnected(true)
            });
        } else {
            setConnected(true)
            setAddress(await window.arweaveWallet.getActiveAddress());
        }
    });

    return <>
        <Show when={detected()}>
            <Show when={!connected()}>
                Not Connected
            </Show>
            <Show when={connected()}>
                Wallet Address: {address()}                
                {props.children}            
            </Show>
        </Show>
        <Show when={!detected()}>
            {props.notDetected}
            
        </Show>
    </>
}

export enum UploadEvent  {
    Started,
    Transactioncreated,
    Error,
}


export const Upload = (props: {
    contentType: string,
    title: string,
    description: string,
    onUploaded: (eventName: UploadEvent, value) =>void
}) => {


    const upload = async (buffer: Buffer): Promise<any> => {

        

        return new Promise(async (resolve, reject) => {
            const arweave = new Arweave(ArweaveConfig);

            // Buffer
            let transactionB
            try {
                transactionB = await arweave.createTransaction({
                    data: buffer
                });
                
                console.log('transaction created', transactionB)

            } catch (e) {
                console.error(e);
                reject(e)
                return
            }


            transactionB.addTag('Content-Type', props.contentType);
            transactionB.addTag('App-Name', 'DataPond-Move');
            transactionB.addTag('App-Version', "was, is and always will be");
            transactionB.addTag('Title', props.title);
            transactionB.addTag('Description', props.description);

            console.log('transaction created with tags', transactionB)

            try {
                await arweave.transactions.sign(transactionB);
                props.onUploaded(UploadEvent.Started, {props});
                

                console.log('transaction signed ok', transactionB.signature);

                let uploader = await arweave.transactions.getUploader(transactionB);

                while (!uploader.isComplete) {
                    await uploader.uploadChunk();
                    console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
                }
                props.onUploaded(UploadEvent.Transactioncreated, {props, transaction: transactionB});
                resolve(transactionB);

            } catch (e) {
                console.error(e);
                props.onUploaded(UploadEvent.Error, {props, e});
                reject(e)
                return
            }
        })

    }

    const [uploadedData, setUplaodedData] = createSignal<any>();
    const onUpload = (file) => {
        console.log('slected file', file)

        file.file.arrayBuffer().then(buf => {
            console.log(file);
            console.log('Array buffer for file is ', buf)
            // @ts-ignore
            upload(buf).then((data) => {
                setUplaodedData(data)
                console.log('uplaoded')
            }).catch(console.error)
        }).catch(console.error)
    }

    const {files, selectFiles} = createFileUploader({
        accept: MimeTypes[".json"]
    });
    const {files: filesAsync, selectFiles: selectFilesAsync} = createFileUploader({
        accept: MimeTypes[".json"]
    });

    /*
     "format": 2, "id": "xDby2yaljhX2IE9J6sJnKn-oLQEyIca4p7bPDtL2E08", "last_tx": "4Mko16C0LUQfUW0xYUNIXdhlmyEB5j1l2d3UPUwN4bT6ToJ4a_52UuYIJUSLEht8", "owner": "qM3Fj6lJ-EIvm2jWGUazGPc9-ocSw10nq47tfPYvgIDlQHvNLpzAXhDyrabpVzXvraAaan82KLuZD_81OC7KD_Fy0OLUFgRyZcNaB696Bx-VISoBQl3WXK4c7vi_7m2tTreR_q5qxcTtfPCBkB8inrKyYYHvdLf2xdwo7-f7-o_jqg5-lRxR7haiup9yyXK3ZgwXiuf-1LoyyXIiIZVFOEFGRduko3XrPfSFRI5awUqDwRo_sh_-JqVF3UXhlN3eJkBxy2G_a6LxlQF8uUNc-Nsj5RTgPCpJNu7vc8llt06zUAWd0n_MILIlftQao1ACePYVQyNH8wepCvsOyG_lPAg7iN67Dp0pIWKDNqamGTYRaDkD0lZIQkkjkQKlmQ5Gdg_nMvukaA1GanOyBA5-tbJFl-qr4wcetpjAgucvLSBMs-St4Nm0zRrFEsTpc9aviqzI5UCqSDpQ2U94bIVXFBZfQ05JQnHaluApHpm9d3bHsOy0d_NmpBS1k8FksK8_A_lUANTiQIng9usS-lsFuw0d8qc6RLiZKzE1Z5Vq3ykednnGjpTI9xSv-SgAoIi8zgbydP2mAtivvLz0EqeI-aY2hLkJi43fd0qI4xhtNgRsUHhHpMmpGTL9HGkyFUGqne6xyeTixhQagJWz-r86RSG0Hxz1X1DZVJ_7oABmaV0", "tags": [ { "name": "Q29udGVudC1UeXBl", "value": "YXBwbGljYXRpb24vanNvbg" }, { "name": "QXBwLU5hbWU", "value": "RGF0YVBvbmQtTW92ZQ" }, { "name": "QXBwLVZlcnNpb24", "value": "d2FzLCBpcyBhbmQgYWx3YXlzIHdpbGwgYmU" }, { "name": "VGl0bGU", "value": "SnNvbiBJbmRleA" }, { "name": "RGVzY3JpcHRpb24", "value": "VGhlIEpzb24gaW5kZXggZmlsZSBmb3IgdGhlIGNvb2wgTU92ZSBBcHAgSGFja2F0aG9u" }, { "name": "U2lnbmluZy1DbGllbnQ", "value": "QXJDb25uZWN0" }, { "name": "U2lnbmluZy1DbGllbnQtVmVyc2lvbg", "value": "MC41LjU" } ], "target": "", "quantity": "0", "data":
     */
    return <>
        <div>


            <Show when={uploadedData()}>

                <h5>Upload results</h5>

                id: {uploadedData().id}
                <hr/>
                last_tx: {uploadedData().last_tx}
                <hr/>
                data_root: {uploadedData().data_root}
                <hr/>
                owner: {uploadedData().owner}
                <hr/>
                reward: {uploadedData().reward}
            </Show>

            <h5>Select a single file</h5>
            <button
                onClick={() => {
                    selectFiles(([{source, name, size, file}]) => {
                        onUpload({source, name, size, file})
                    });
                }}
            >
                Select
            </button>
            <For each={files()}>{file => <p>{file.name}</p>}</For>
        </div>


        <div>
            <h5>Select a single file with async callback</h5>
            <button
                onClick={() => {
                    selectFilesAsync(async ([{source, name, size, file}]) => {

                        console.log({source, name, size, file});
                    });
                }}
            >
                Select
            </button>
            <For each={filesAsync()}>{file => <p>{file.name}</p>}</For>
        </div>
    </>;

}