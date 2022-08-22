import {ethers} from "ethers";
import {CONTRACT_ADDRESS} from "../config";
import CONTRACT_ABI from '../contracts/UTT.abi.json';

async function getContract(provider: ethers.providers.Provider) {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}


export async function getBalance(address: string, provider: ethers.providers.Provider) {
    const contract = await getContract(provider);
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 0);
}