import { createSignal, Show } from "solid-js"
import { ArConnect, Upload, UploadEvent } from "./arweaveUploadButton"

export const ArweaveButtonDocs = () => {

    const [events, setEvents] = createSignal<Array<{event: UploadEvent, data: any}>>([]);

    const onUploaded = (event: UploadEvent, data: any) => {
        setEvents(evt => {
            return evt.concat([{event, data}])
        })
    }

    const fileTitle = "Test Image";
    const fileDescription = "Any file will do - this is for demo only - You will still pay for the transasction - so please save the transaction if needed.";
    const fileExtension = ".jpg"


    const unDetectedWallet = <>
    <p>Error - The wallet is not detected</p>
    <p> You wont be able to upload <strong>{fileTitle}</strong></p>
    <p>If you need to upload <strong>{fileTitle}</strong>, pleasse install <a href="https://www.arconnect.io/" target="_blank">Ar connect</a> in your browser now. </p>
    </>;

    return (
      <>
        <h2 id="arweave-btn-docs">ArWeave Upload Button</h2>
        <p>
          This Upload button will connect to ArConnect, and then will launch an upload, the transaction is the passed to the callback.
        </p>

        <h3>Properties</h3>       

<pre>{`
<ArConnect>
    <h1>Wallet ArConnect Is nOw connected</h1>

    <h3>List of Upload actions:</h3>

    {events().length == 0 ? <h4>No Events recorded yet</h4> : ''} 
    
    <ul>
        {events().map(evt => <li>{evt.event}  : {JSON.stringify(evt.data)}</li>)}
    </ul>


    <h3>Action: Upload unlocked</h3>
    <Upload contentType=".json" description="" title="" onUploaded={onUploaded} />
</ArConnect>

`}</pre>


        <ArConnect notDetected={unDetectedWallet}>

            <h1>Wallet ArConnect Is nOw connected</h1>

            <h3>List of Upload actions:</h3>

            <Show when={events().length == 0}>
                <h4>No Events recorded yet</h4>
            </Show>
            <Show when={events().length > 0}>
                <ul>
                    {events().map(evt => <li>{evt.event}  : {JSON.stringify(evt.data)}</li>)}
                </ul>
            </Show>
            

            <h3>Action: Upload unlocked</h3>
            <Upload contentType={fileExtension} description={fileDescription} title={fileTitle} onUploaded={onUploaded} />
        </ArConnect>

    </>
    )
}
  