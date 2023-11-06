const ethers = require('ethers');
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Replace with your private key

const uniswapFactoryAddress = process.env.FACTORY_ADDRESS; // Uniswap V2 Factory Address
const tokenAddress = process.env.TOKEN_A_ADDRESS; // Replace with your ERC-20 token address

const uniswapFactoryAbi = [
  'function createPair(address tokenA, address tokenB) external returns (address pair)'
];

const uniswapFactory = new ethers.Contract(uniswapFactoryAddress, uniswapFactoryAbi, signer);

async function createEthTokenPair() {
  try {
    const pairAddress = await uniswapFactory.createPair(ethers.constants.AddressZero, tokenAddress);
    console.log(`Pair created at address: ${pairAddress}`);
  } catch (error) {
    console.error('Pair creation failed:', error);
  }
}

// Call the function to create a new ETH-ERC20 token pair
createEthTokenPair();
