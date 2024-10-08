import {createMemo,  Show, Accessor} from "solid-js";

import {clearClipboard,  clipboard, clipFile, clipFolder} from "./signals";
import {Folder} from "@8pond/interfaces";

import {currentFolder, path, setCurrentFolder} from "./signals";
import {filesystem, onPaste} from "./init";


export const FolderFileView = () => {

    const folderMapper = (id: number): Folder => filesystem()?.Folders[id]
    const fileMapper = (id: number): Folder => filesystem()?.Files[id]

    const folders = createMemo(() => {
        const list = filesystem()?.Folders[currentFolder()]?.folders.map(folderMapper)
        return list
    }, [])

    const files = createMemo(() => {
        const list = filesystem()?.Folders[currentFolder()]?.files.map(fileMapper)

        return list
    }, [])

    const iconStyle = {
        "font-size": "10rem"
    }
    const actionIconStyle ={
        "font-size": "1.25rem"
    }
    const isFileFolderDisabled = f => clipboard() && clipboard()?.id===f.id;


    return <>
        <div class={"row"}>
            <Show when={folders().length > 0}>


                {currentFolder() === filesystem()?.RootId
                    ? null
                    : <div class={"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-md row center"}
                           tabIndex={"0"}
                        >
                        <button onClick={() => {
                            setCurrentFolder(path()[path().length-2])
                        }}>
                            <i class={"icon arrow alternate circle up outline"} style={iconStyle}/>
                            <h5>Up to Parent Folder</h5>
                        </button>
                    </div>}

                {folders().map(folder =>
                            <div class={"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-md row center"}
                                 tabIndex={"0"}
                            >
                                <button onClick={() => {
                                    setCurrentFolder(folder.id)
                                }}>
                                    <i class={"icon folder"} style={iconStyle}/>
                                    <h5>{folder.name}</h5>
                                </button>
                                <div class={"row"}>
                                    <button  onClick={() => {
                                        clipFolder(folder.id, 'copy', currentFolder());
                                    }} disabled={isFileFolderDisabled(folder)}>
                                        <i class={"icon copy"} style={actionIconStyle}/>
                                        Copy
                                    </button>
                                    <button  onClick={() => {
                                        clipFolder(folder.id, 'cut', currentFolder())
                                    }}
                                            disabled={isFileFolderDisabled(folder)}>
                                        <i class={"icon cut"} style={"font-size: 2rem"}/>
                                        Cut
                                    </button>
                                    <button onClick={() => {
                                        alert('Confirm delete ?')
                                    }} disabled={isFileFolderDisabled(folder)}>
                                        <i class={"icon delete"} style={actionIconStyle}/>
                                        Delete
                                    </button>

                                    {clipboard() && !isFileFolderDisabled(folder) ?
                                        <button onClick={() => {
                                            onPaste(folder, clipboard())
                                            clearClipboard();
                                        }}>
                                            <i class={"icon paste"} style={actionIconStyle}/>
                                            Paste
                                        </button> : null}


                                    {isFileFolderDisabled(folder)
                                        ? <button  onClick={() => {
                                            clearClipboard()
                                        }}>Cancel</button>
                                        : null}
                                </div>

                            </div>
                        )}
            </Show>
            <Show when={files().length > 0}>
                {files().map(file =>
                    <div class={"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-md row center"}
                         tabIndex={"0"}
                    >
                        <button>
                            <i class={"icon file yellow"} style={iconStyle}/>
                            <h5>{file.name}</h5>
                        </button>

                        <div class={"row"}>

                            <button class={"ui button"} onClick={() => {
                                clipFile(file.id, 'copy', currentFolder())
                            }} disabled={isFileFolderDisabled(file)}>
                                <i class={"icon copy"} style={actionIconStyle} />
                                Copy
                            </button>

                            <button class={"ui button"} onClick={() => {
                                clipFile(file.id, 'cut', currentFolder())
                            }}  disabled={isFileFolderDisabled(file)}>
                                <i class={"icon cut"} style={actionIconStyle}/>
                                Cut
                            </button>

                            <button class={"ui button"} onClick={() => {
                                alert('todo')
                            }}  disabled={isFileFolderDisabled(file)}>
                                <i class={"icon delete"} style={actionIconStyle}/>
                                Delete
                            </button>

                            {isFileFolderDisabled(file)
                                ? <button class={"ui button"} onClick={() => {
                                    clearClipboard()
                                }}>Cancel</button>
                                : null}
                        </div>

                    </div>
                )}
            </Show>
        </div>

    </>


}