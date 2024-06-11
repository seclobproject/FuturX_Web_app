import dotenv from 'dotenv';
dotenv.config();

import { ethers } from "ethers";
import { ERC20_ABI } from "./ERC20_ABI.js"

const RPC_URI = process.env.RPC_URI;
const KEY = process.env.KEY;
const USDT_ADDRESS = process.env.USDT_ADDRESS;

const provider = new ethers.JsonRpcProvider(RPC_URI);
const signer = new ethers.Wallet(KEY, provider);

const contract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);

async function sendUSDT(user_wallet_address) {
    // Balance check and other conditions
    // ...

    const amount = ethers.parseUnits("10", 6);

    try {
        // Gas fee estimation
        const gas = await contract.transfer(user_wallet_address, amount).estimateGas();
        const amountToSend = amount.sub(gas);

        // console.log(amount, amountToSend)
        const txn = await contract.transfer(user_wallet_address, amountToSend);
        const reciept = await txn.wait()

        return reciept // If reciept.status = 1, success
    } catch (e) {
        throw Error("transaction Failed!")
    }
}

export {
    sendUSDT
}
