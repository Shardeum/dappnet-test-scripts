const { ethers } = require('ethers');
require('dotenv').config();

const ERC20_ABI = [
    // Standard ERC-20 ABI
    'function balanceOf(address owner) view returns (uint256)',
];

const ERC20_TOKEN_ADDRESS = process.env.TOKEN_B_ADDRESS; // Replace with your ERC-20 token address
const USER_ADDRESS = '0x4aC460bAa00Eae9CB367EDFC87E1ef4749b49405'; // Replace with your Ethereum address
const RPC_URL = process.env.RPC; // Replace with your Ethereum RPC URL

async function checkTokenBalance() {
    // Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const erc20TokenContract = new ethers.Contract(ERC20_TOKEN_ADDRESS, ERC20_ABI, provider);

    try {
        // Check the balance of the user's address
        const balance = await erc20TokenContract.balanceOf(USER_ADDRESS);

        // Convert the balance to a human-readable format (assuming 18 decimals)
        const tokenBalance = ethers.utils.formatUnits(balance, 18);

        console.log(`Token Balance: ${tokenBalance} ERC-20 Tokens`);
    } catch (error) {
        console.error(`Error checking token balance: ${error.message}`);
    }
}

checkTokenBalance();
