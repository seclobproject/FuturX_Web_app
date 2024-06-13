import dotenv from 'dotenv';
dotenv.config();

import { ethers } from "ethers";
import { ERC20_ABI } from "./ERC20_ABI.js"

// const RPC_URI = process.env.RPC_URI;
const RPC_URI = "https://bsc-dataseed.binance.org/";
// const KEY = process.env.KEY;

const mnemonic = "put inmate alcohol body give cannon erosion essence reform island feel shift";
const mnemonicWallet=ethers.Wallet.fromPhrase(mnemonic)
const KEY=mnemonicWallet.privateKey
// const USDT_ADDRESS = process.env.USDT_ADDRESS;
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

const provider = new ethers.JsonRpcProvider(RPC_URI);
const signer = new ethers.Wallet(KEY, provider);

const contract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);

export const sendUSDT=async(user_wallet_address)=> {
    // Balance check and other conditions
    // ...

    // const BNBPriceInUSDT = 615.17;
    const amount = ethers.parseUnits("9.5", 18);

    try {
        // Gas fee estimation
        // const gas = contract.transfer.estimateGas(user_wallet_address, amount)
        // const BNBTokens = ethers.formatUnits(gas, 18);
        // const InUSDT = parseFloat(BNBTokens) * BNBPriceInUSDT;
        // const gasInUSDT = ethers.parseUnits(InUSDT.toString(), 18);
        // const amountToSend = amount.sub(gasInUSDT);

        // console.log(amount, amountToSend)
        const txn = await contract.transfer(user_wallet_address, amount);
        const reciept = await txn.wait()
        return reciept // If reciept.status = 1, success
    } catch (e) {
        console.log(e);
        throw Error("transaction Failed!")
    }
}


