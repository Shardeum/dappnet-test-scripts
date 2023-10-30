const { ethers } = require("hardhat");
require("dotenv").config();

const factoryAddress = "0x7c405447584366BC77f7ec9CbF867fc31b22ab9e";
const routerAddress = "0xEF3b77F384461CA9F357fAAe1Dae0d005671c46B";
const wethAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const tokenAddress = "0x7D94d8E6d588cCa2307cB6B37830733a05370480";
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
