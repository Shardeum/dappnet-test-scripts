const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const UniswapV2Router = "ADDRESS_OF_UNISWAP_V2_ROUTER_CONTRACT";
  const tokenA = "ADDRESS_OF_TOKEN_A";
  const tokenB = "ADDRESS_OF_TOKEN_B";
  const amountADesired = ethers.utils.parseUnits("100", 18); // Amount of Token A to add
  const amountBDesired = ethers.utils.parseUnits("200", 18); // Amount of Token B to add
  const amountAMin = ethers.utils.parseUnits("90", 18); // Minimum accepted amount of Token A
  const amountBMin = ethers.utils.parseUnits("180", 18); // Minimum accepted amount of Token B
  const to = deployer.address;
  const deadline = Math.floor(Date.now() / 1000) + 300; // Set a deadline for the transaction

  const uniswapRouter = await ethers.getContractAt("IUniswapV2Router02", UniswapV2Router);

  await uniswapRouter.addLiquidity(
    tokenA,
    tokenB,
    amountADesired,
    amountBDesired,
    amountAMin,
    amountBMin,
    to,
    deadline,
    { value: 0 } // If you're providing ETH, set the correct value here
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
