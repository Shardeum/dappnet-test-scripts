const { Contract, ContractFactory, utils, constants } = require('ethers');
const factoryArtifact = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const routerArtifact = require('@uniswap/v2-periphery/build/UniswapV2Router02.json')
const pairArtifact = require('@uniswap/v2-periphery/build/IUniswapV2Pair.json')
const usdtArtifact = require('../artifacts/contracts/Tether.sol/Tether.json');
const usdcArtifact = require('../artifacts/contracts/UsdCoin.sol/UsdCoin.json');

async function addLiquidity() {
  const [owner] = await ethers.getSigners();

  // Define the addresses of the already deployed Factory and Router
  const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
  const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;

  // Load existing Factory and Router contracts
  const factory = new Contract(FACTORY_ADDRESS, factoryArtifact.abi, owner);
  const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, owner);
   // Define the addresses and deploy the token contracts
   const usdtAddress = process.env.TOKEN_A_ADDRESS;
   const usdcAddress = process.env.TOKEN_B_ADDRESS;
 
   const usdt = new Contract(usdtAddress, usdtArtifact.abi, owner);
   const usdc = new Contract(usdcAddress, usdcArtifact.abi, owner);

  // Approve tokens for the router
  await usdt.connect(owner).approve(router.address, constants.MaxUint256);
  await usdc.connect(owner).approve(router.address, constants.MaxUint256);

  // Define token amounts, deadline, and other parameters
  const token0Amount = utils.parseUnits('10000');
  const token1Amount = utils.parseUnits('10000');
  const deadline = Math.floor(Date.now() / 1000 + 600); // 10-minute deadline

  // Add liquidity
  const addLiquidityTx = await router.connect(owner).addLiquidity(
    usdt.address,
    usdc.address,
    token0Amount,
    token1Amount,
    0,
    0,
    owner.address,
    deadline,
    { gasLimit: utils.hexlify(1000000) }
  );

  // Wait for the transaction to be confirmed
const receipt = await addLiquidityTx.wait();

// Get the transaction hash from the receipt
const txHash = receipt.transactionHash;
console.log('Transaction Hash:', txHash);

  // Check the updated reserves
  /*const pairAddress = await factory.getPair(usdt.address, usdc.address);
  const pair = new Contract(pairAddress, pairArtifact.abi, owner);
  const reserves = await pair.getReserves();
  console.log('Reserves after adding liquidity:', reserves);*/
}

addLiquidity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
