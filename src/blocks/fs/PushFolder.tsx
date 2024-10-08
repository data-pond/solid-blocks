import {Accessor, createMemo, createSignal,  Show} from "solid-js";

import {Clipboard,Folder} from "@8pond/interfaces";
import { filesystem, onPaste} from "./init";
import {currentFolder} from "./Explorer";
import {clearClipboard,  clipboard, } from "./signals";


export interface PushFolderProps {
    id: number,
    path: number[],
    onSelect: (f: Folder, p: number[]) => void,
    selected: Accessor<Folder>,
    activePath: Accessor<number[]>
}

/**
 *
 * @param props: PushFolderProps
 * @constructor
 */
export const PushFolder = (props: PushFolderProps) => {
    const _f = filesystem()?.Folders[props.id]

    const [extended, setExtended] = createSignal(_f?.id == props.path[0])

    const isActive = createMemo(() => {
        return _f && _f.id == currentFolder()
    }, [currentFolder(), _f]);

    const isRoot = _f && _f.id==filesystem()?.RootId


    return _f ? <>
        <div class={`ui button ${isActive() ? 'primary' : 'secondary'}`} tabIndex="0" onClick={() => {
            props.onSelect(_f, props.path)
        }}>
            <Show when={_f.folders.length > 0 && !isRoot}>
                <div tabIndex="0" onClick={() => {

                    setExtended(e => {
                        if (e && !isActive()) {
                            // when clicking it, and it is already extended but not selected,
                            // override - don't collapse it
                            return true
                        }
                        return !e}
                    )
                }}>
                    <Show when={extended()}>
                        <div class="visible content">
                            <i class={"icon angle down"}/>  <i class={"icon folder"}/> {_f.name}
                        </div>
                    </Show>
                    <Show when={!extended()}>
                        <div class="visible content">
                            <i class={"icon angle right"}/> <i class={"icon folder"}/>  {_f.name}
                        </div>
                    </Show>
                </div>
            </Show>
            <Show when={_f.folders.length == 0 && !isRoot}>
                <div class="visible content">
                    <i class={"icon folder"}/>  {_f.name}
                </div>
            </Show>
            <Show when={isRoot}>
                <div class="visible content">
                    <i class={"icon angle down"}/> <i class={"icon folder"}/> {_f.name}
                </div>
            </Show>


        </div>

        <Show when={clipboard() && clipboard()?.id!=_f.id}>
            <button class={"ui purple button small"} onClick={() => {
                onPaste(_f, clipboard());
                clearClipboard();
            }}>
                <i class={"icon paste"} />
                Paste
            </button>

        </Show>

        <Show when={extended()}>
        <ul style={{"margin-left": "1rem"}}>
                {_f.folders.map(u =>
                    <li>
                        <PushFolder id={u}
                                    path={props.path.concat([u])}
                                    onSelect={props.onSelect}
                                    selected={props.selected}
                                    activePath={props.activePath}/>
                    </li>)}
            </ul>
        </Show>
    </> : null
}
