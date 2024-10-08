import { filesystem} from "./init";
import {Accessor, createMemo} from "solid-js";
import {Folder} from "@8pond/interfaces";
import {PushFolder} from "./PushFolder";

// only to detect if the folder is a valid destination
export const FolderExplorer = (props: {
    rootId: number,
    useClipped: boolean ,
    onSelect: (f: Folder, p: number[]) => void,
    selected: Accessor<Folder>,
    activePath: Accessor<number[]>}) => {
    const folder = createMemo<Folder>(() => {
      return filesystem()?.Folders[props.rootId];
    })

    if (!folder()) {
        return <span>No rootId folder found {props.rootId}</span>;
    }
    return <PushFolder id={folder().id}
                              path={[folder().id]}
                              onSelect={props.onSelect}
                              selected={props.selected}
                              activePath={props.activePath}/>
}