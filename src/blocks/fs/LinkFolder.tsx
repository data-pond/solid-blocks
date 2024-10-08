import {setCurrentFolder, setPath} from "./Explorer";
import {Browsing} from "@8pond/interfaces";
import {date2Str} from "../utils";

export const LinkFolder = (props: { action: Browsing, name: string }) => {
    const lastIndex = props.action.path.length>0 ? props.action.path[props.action.path.length-1] : -1;
    return lastIndex!== -1 ? <div class={"item"}>
        <div class="content" tabIndex={0} onClick={() => {
            setPath(props.action.path)
            setCurrentFolder(lastIndex)
        }}>
            <div class="header">
                {name}
            </div>
            <small>{date2Str(props.action.ts)} ago</small>
        </div>
    </div>: null
}
