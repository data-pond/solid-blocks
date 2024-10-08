import {createSignal, Accessor} from "solid-js";
import { Folder,  FileSystem} from "@8pond/interfaces";

export const [ready, setReady] = createSignal(false)

export let filesystem = null;
export let onPaste = createSignal(null);


export const InitializeFsView = (_filesystem: Accessor<FileSystem>, _onPaste: (destFolder: Folder, clipboard: Clipboard) => void) => {
    onPaste = _onPaste;
    filesystem= _filesystem
    setReady(true)
}

