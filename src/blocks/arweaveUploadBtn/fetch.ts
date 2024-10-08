import Arweave from 'arweave'
import {ArweaveConfig} from "./config.js";


export const Download = async (arweaveAddress: string, options: {transaction: boolean, data: boolean} = {transaction: true, data: true}) => {
    const arweave = new Arweave(ArweaveConfig);

    const status = await arweave.transactions.getStatus(arweaveAddress);
    if (status.status === 200) {
        // @ts-ignore
        const data: string = await arweave.transactions.getData(arweaveAddress, {decode: true, string: true})
        try {
            const json = JSON.parse(data)
            console.log('json parsed from Arweave JSON FS: ', json);
            return json;
        } catch (e) {
            console.error('error parsing json ', e)
            console.log(data)
            throw new Error('error downloading data '+arweaveAddress)
        }
    } else {
        throw new Error('error downloading data '+arweaveAddress)
    }

}