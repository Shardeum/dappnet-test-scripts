const { Contract, ContractFactory, utils, constants } = require('ethers');
const routerArtifact = require('@uniswap/v2-periphery/build/UniswapV2Router02.json');
const usdtArtifact = require('../artifacts/contracts/Tether.sol/Tether.json');

async function ammSwap() {
  const [owner] = await ethers.getSigners();

  // Define the address of the already deployed Router
  const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;

  // Load the existing Router contract
  const router = new Contract(ROUTER_ADDRESS, routerArtifact.abi, owner);

  // Define the addresses of the tokens
  const usdtAddress = process.env.TOKEN_A_ADDRESS;
  const tokenToSwapForAddress = process.env.TOKEN_B_ADDRESS; // Replace with the target token address

  // Load the token contracts
  const usdt = new Contract(usdtAddress, usdtArtifact.abi, owner);

  // Approve USDT for the router to spend
  await usdt.connect(owner).approve(router.address, constants.MaxUint256);

  // Define the amount of USDT to swap
  const amountToSwap = utils.parseUnits('50'); // Adjust the amount as needed

  // Define other parameters
  const path = [usdt.address, tokenToSwapForAddress]; // Swap from USDT to the target token
  const minAmountOut = 0; // Minimum amount of target tokens to receive
  const deadline = Math.floor(Date.now() / 1000 + 600); // 10-minute deadline

  // Perform the AMM swap
  const swapTx = await router.connect(owner).swapExactTokensForTokens(
    amountToSwap,
    minAmountOut,
    path,
    owner.address,
    deadline,
    { gasLimit: utils.hexlify(1000000) }
  );

  // Wait for the transaction to be confirmed
  const receipt = await swapTx.wait();

  // Get the transaction hash from the receipt
  const txHash = receipt.transactionHash;
  console.log('AMM Swap Transaction Hash:', txHash);
}

ammSwap()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
