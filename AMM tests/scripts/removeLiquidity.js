const { Contract, ContractFactory, utils, constants } = require('ethers');
const factoryArtifact = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const routerArtifact = require('@uniswap/v2-periphery/build/UniswapV2Router02.json')
const pairArtifact = require('@uniswap/v2-periphery/build/IUniswapV2Pair.json')
const usdtArtifact = require('../artifacts/contracts/Tether.sol/Tether.json');
const usdcArtifact = require('../artifacts/contracts/UsdCoin.sol/UsdCoin.json');

async function removeLiquidity() {
  const [owner] = await ethers.getSigners();

  // Define the addresses of the already deployed Factory and Router
  const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
  const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;

  // Load existing Factory and Router contracts
  const factory = new Contract(FACTORY_ADDRESS, factoryArtifact.abi, owner);
  const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, owner);

  // Define the addresses of the tokens
  const usdtAddress = process.env.TOKEN_A_ADDRESS;
  const usdcAddress = process.env.TOKEN_B_ADDRESS;

  // Load the token contracts
  const usdt = new Contract(usdtAddress, usdtArtifact.abi, owner);
  const usdc = new Contract(usdcAddress, usdcArtifact.abi, owner);

  // Define token amounts and other parameters
  const liquidityAmount = utils.parseUnits('50'); // Adjust to the amount of liquidity you want to remove
  const minAmountA = 0; // Adjust to your desired minimum amount of token A
  const minAmountB = 0; // Adjust to your desired minimum amount of token B
  const deadline = Math.floor(Date.now() / 1000 + 600); // 10-minute deadline

  // Get the pair address
  const pairAddress = await factory.getPair(usdt.address, usdc.address);
  const pair = new Contract(pairAddress, pairArtifact.abi, owner);

  // Approve the router to spend your LP tokens
  await pair.connect(owner).approve(router.address, liquidityAmount);

  // Remove liquidity
  const removeLiquidityTx = await router.connect(owner).removeLiquidity(
    usdt.address,
    usdc.address,
    liquidityAmount,
    minAmountA,
    minAmountB,
    owner.address,
    deadline,
    { gasLimit: utils.hexlify(1000000) }
  );

  // Wait for the transaction to be confirmed
  const receipt = await removeLiquidityTx.wait();

  // Get the transaction hash from the receipt
  const txHash = receipt.transactionHash;
  console.log('Remove Liquidity Transaction Hash:', txHash);
}

removeLiquidity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
