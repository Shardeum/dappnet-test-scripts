const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Make sure to replace with your private key

const uniswapFactoryAddress = process.env.FACTORY_ADDRESS; // Uniswap V2 Factory Address
const tokenAddress = process.env.TOKEN_A_ADDRESS; // Replace with your token's address

const uniswapFactoryAbi = ['function getPair(address tokenA, address tokenB) external view returns (address pair)'];
const uniswapPairAbi = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
];

const uniswapFactory = new ethers.Contract(uniswapFactoryAddress, uniswapFactoryAbi, signer);
const token = new ethers.Contract(tokenAddress, ['function transfer(address to, uint256 value)'], signer);

async function swapEthForTokens(ethAmount) {
  const uniswapPairAddress = await uniswapFactory.getPair(tokenAddress, ethers.constants.AddressZero); // Assuming WETH as the other side of the pair
  if (uniswapPairAddress === ethers.constants.AddressZero) {
    console.error('Pair does not exist.');
    return;
  }

  const uniswapPair = new ethers.Contract(uniswapPairAddress, uniswapPairAbi, signer);

  const [reserve0, reserve1] = await uniswapPair.getReserves();
  const tokenAmountOut = (ethAmount * reserve1) / reserve0;

  const path = [ethers.constants.AddressZero, tokenAddress]; // WETH to Token
  const uniswapRouterAddress = process.env.ROUTER_ADDRESS; // Replace with the Uniswap Router address
  const uniswapRouter = new ethers.Contract(uniswapRouterAddress, ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable'], signer);

  const deadline = Math.floor(Date.now() / 1000) + 600; // 10-minute deadline

  try {
    const tx = await uniswapRouter.swapExactETHForTokens(
      tokenAmountOut,
      path,
      signer.address,
      deadline,
      { value: ethers.utils.parseEther(ethAmount.toString()) }
    );

    await tx.wait();
    console.log(`Swapped ${ethAmount} ETH for ${tokenAmountOut} tokens.`);
  } catch (error) {
    console.error('Swap failed:', error);
  }
}

// Call the function to swap ETH for tokens
swapEthForTokens(1); // Replace with the amount of ETH you want to swap
