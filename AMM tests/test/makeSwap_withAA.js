const { ethers } = require('ethers');
require('dotenv').config()


// Define private key, and providers
const privateKey = process.env.PRIVATE_KEY; // Replace with your wallet's private key
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC); // Replace with your RPC URL (e.g., Infura)
const wallet = new ethers.Wallet(privateKey, provider);

// Define contract addresses
const tokenAAddress = process.env.TOKEN_A_ADDRESS; // Replace with Token A's address
const tokenBAddress = process.env.TOKEN_B_ADDRESS; // Replace with Token B's address
const uniswapRouterAddress = process.env.ROUTER_ADDRESS; // Uniswap V2 router address

// Define ABI for ERC20, Uniswap, and the mint function
const erc20Abi = [
  'function approve(address spender, uint256 amount) public returns (bool)',
];
const uniswapRouterAbi = [
  'function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external',
];
const tokenAMintAbi = [
  'function mint(address to, uint256 amount) public',
];

// Create contract instances
const tokenA = new ethers.Contract(tokenAAddress, erc20Abi, wallet);
const tokenAMint = new ethers.Contract(tokenAAddress, tokenAMintAbi, wallet);
const uniswapRouter = new ethers.Contract(uniswapRouterAddress, uniswapRouterAbi, wallet);

// Define swap parameters
const amountIn = ethers.utils.parseUnits('1', 18); // Amount of Token A to mint and swap
const amountOutMin = 0; // Minimum amount of Token B to receive
const path = [tokenAAddress, tokenBAddress];
const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current timestamp
const toAddress = wallet.address; // Wallet address to receive Token B

async function mintAndSwapTokens() {
  // Mint Token A
  const mintTx = await tokenAMint.mint(wallet.address, amountIn);
  await mintTx.wait();

  // Approve Uniswap Router to spend Token A
  const approveTx = await tokenA.approve(uniswapRouterAddress, amountIn);
  await approveTx.wait();

  // Generate access list for the swap transaction
  const accessList = [
    {
      address: tokenAAddress,
      storageKeys: [],
    },
    {
      address: tokenBAddress,
      storageKeys: [],
    },
    {
      address: uniswapRouterAddress,
      storageKeys: [],
    },
  ];

  // Swap tokens on Uniswap using EIP-2930
  const swapTx = await uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
    amountIn,
    amountOutMin,
    path,
    toAddress,
    deadline,
    {type:1, gasLimit: 500000, gasPrice: ethers.utils.parseUnits('20', 'gwei'), accessList }
  );
  const receipt = await swapTx.wait();
  console.log(`Swap completed in transaction ${receipt.transactionHash}`);
}

mintAndSwapTokens().catch((err) => console.error(err));
