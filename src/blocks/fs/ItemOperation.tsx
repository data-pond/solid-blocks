import {createMemo, Show} from "solid-js";

import {Action, Operation} from "@8pond/interfaces";
import {filesystem} from "./init";

import {MintAction} from "../wallet/api";

import {dbFs} from "../db/src/db";
import {date2Str} from "../utils";


export const  OperationAction = (props: {action: Action, mintable: boolean}) => {


    const target =  props.action.targetType === 'file'
        ? filesystem()?.Files[props.action.targetId]
        : filesystem()?.Folders[props.action.targetId];

    const dest = createMemo(() =>
        props.action.dest_folder_id ? filesystem()?.Folders[props.action.dest_folder_id] : null, props.action.dest_folder_id ? filesystem()?.Folders[props.action.dest_folder_id] : null);
    const parent = createMemo(() =>
        props.action.parentFolderId ? filesystem()?.Folders[props.action.parentFolderId] : null, props.action.parentFolderId ? filesystem()?.Folders[props.action.parentFolderId] : null);

    return <div class="item">
        <div class="content">
            {props.action.action == Operation.MOVE ?
                <div class={"header"}>MOVE {target?.name} from {parent()?.name} into {dest()?.name}</div> : null}
            {props.action.action == Operation.DELETE ?
                <div class={"header"}>DELETE {target?.name} from {parent()?.name} </div> : null}
            {props.action.action == Operation.COPY ?
                <div class={"header"}>COPY {target?.name} into {dest()?.name} </div> : null}
            {props.action.action == Operation.RENAME ?
                <div class={"header"}>RENAME {target?.name} TODO</div> : null}
            {props.action.action == Operation.CREATE ?
                <div class={"header"}>CREATE {target?.name} TODO</div> : null}

            <div class="header">
                {date2Str(props.action.ts)}
            </div>


            <Show when={props.mintable}>
                <button class={"ui button large primary"} onClick={async () => {
                    const data = await MintAction(props.action)
                    console.log('Mint Action successfull', data)

                    const evt = new CustomEvent('onMintSuccess', {
                        detail: props.action
                    })
                    window.dispatchEvent(evt)

                    dbFs.pendingActions.delete(props.action.ts)
                    dbFs.actionsHistory.add(props.action)

                }}>
                    Mint on Move
                </button>
            </Show>
            {/*<div class={"ui button large"} tabIndex={0} onClick={() => revert(props.action)}>*/}
            {/*    Revert*/}
            {/*</div>*/}
        </div>

    </div>
}
