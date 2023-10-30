const { ethers } = require("ethers");
require("dotenv").config();

const providerUrl = process.env.RPC;
const privateKey = process.env.PRIVATE_KEY;
const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D0"; // Uniswap Router contract address
const tokenInAddress = process.env.TokenInAddress; // Address of the token you want to swap
const tokenOutAddress = process.env.TokenOutAddress; // Address of the token you want to receive
const amountIn = ethers.utils.parseUnits("1", 18); // Amount to swap (1 token in this case)
const minAmountOut = 0; // Minimum amount of the output token you want to receive

async function swapTokens() {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const router = new ethers.Contract(routerAddress, [
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  ], wallet);

  const deadline = Math.floor(Date.now() / 1000) + 120; // 2 minutes from now

  const tx = await router.swapExactTokensForTokens(
    amountIn,
    minAmountOut,
    [tokenInAddress, tokenOutAddress],
    wallet.address, // You'll receive the output tokens in the same wallet
    deadline
  );

  const receipt = await tx.wait();
  console.log("Swap transaction hash:", receipt.transactionHash);

  if (receipt.status === 1) {
    console.log("Swap successful!");
  } else {
    console.error("Swap failed. Check the transaction details.");
  }
}

swapTokens().catch((error) => {
  console.error("Error:", error);
});
