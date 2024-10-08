import { createSignal} from "solid-js";
import {Clipboard} from '@8pond/interfaces';

export const [currentFolder, setCurrentFolder] = createSignal<number>();
export const [path, setPath] = createSignal<number[]>([])

/**
 * ClipBoard Section
 */


const [clipboard, setClipboard] = createSignal<Clipboard>()

export const clipFile = (fileId: number, operation: 'cut' | 'copy', parentFolder: number) =>
    setClipboard({id: fileId, parentFolder, operation, type: 'file'})
export const clipFolder = (folderId: number, operation: 'cut' | 'copy', parentFolder: number) =>
    setClipboard({id: folderId,parentFolder, operation,  type: 'folder'})
export const clearClipboard = () =>
    setClipboard(undefined);
export {clipboard};


