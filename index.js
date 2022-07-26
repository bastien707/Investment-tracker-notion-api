import { Client } from "@notionhq/client";
import * as config from "./utility/index.js";
import {updateBitcoinToDatabase, updateEGoldToDatabase, updateEthereumToDatabase} from "./src/database.js";
import {updateBitcoinBlock, updateEGoldBlock, updateEthereumBlock} from "./src/blocks.js";

const notion = new Client({ auth: config.env.notionKey });

const run = () => {
    try {
        setInterval(() => {
            updateBitcoinBlock(notion, config.env.btcBlock).then();
            updateBitcoinToDatabase(notion, config.env.btcTable).then();
            updateEthereumBlock(notion, config.env.ethBlock).then();
            updateEthereumToDatabase(notion, config.env.ethTable).then();
            updateEGoldBlock(notion, config.env.egldBlock).then();
            updateEGoldToDatabase(notion, config.env.egldTable).then();
        }, 5000);
    } catch (error) {
        console.log("Error in main: " + error);
    }
}

run();


