const { ethers } = require("hardhat");
require("dotenv").config();

const factoryAddress = process.env.FACTORY_ADDRESS;
const routerAddress = process.env.ROUTER_ADDRESS;
const wethAddress = process.env.WETH_ADDRESS;
const tokenAddress = process.env.TOKEN_ADDRESS;
const privateKey = process.env.PRIVATE_KEY; // Replace with your private key

async function addLiquidity() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC); // Replace with your Ethereum provider URL
  const wallet = new ethers.Wallet(privateKey, provider);

  // Load Uniswap V2 contracts
  const factory = new ethers.Contract(factoryAddress, [
    "function getPair(address tokenA, address tokenB) external view returns (address pair)",
  ], wallet);

  const router = new ethers.Contract(routerAddress, [
    "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
  ], wallet);

  // Get the pair address for WETH and your token
  const pairAddress = await factory.getPair(wethAddress, tokenAddress);

  // Define the amount of liquidity you want to add
  const amountToAdd = ethers.utils.parseEther("1"); // Replace with the desired amount

  // Approve Router to spend your tokens
  const tokenContract = new ethers.Contract(tokenAddress, ["function approve(address spender, uint amount)"], wallet);
  await tokenContract.approve(routerAddress, amountToAdd);

  // Set a reasonable amountTokenMin and amountETHMin
  const amountTokenMin = 1; // No minimum
  const amountETHMin = 1; // No minimum

  // Add liquidity to the pair
  const deadline = Math.floor(Date.now() / 1000) + 60; // Set a reasonable deadline
  const tx = await router.addLiquidityETH(
    tokenAddress,
    amountToAdd,
    amountTokenMin,
    amountETHMin,
    wallet.address,
    deadline,
    {
      value: amountToAdd,
      gasLimit: 2000000,
    }
  );

  // Wait for the transaction to be mined
  await tx.wait();
}

addLiquidity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
