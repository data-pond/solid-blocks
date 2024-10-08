import {createEffect, createMemo, createSignal, For, Show} from "solid-js";
import Arweave from 'arweave'
import {UploadFile, fileUploader, createDropzone, createFileUploader} from "@solid-primitives/upload";
import {MimeTypes} from "../contentTypes.js";
import {ArweaveConfig} from "../config.js";


export 