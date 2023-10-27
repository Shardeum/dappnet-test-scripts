// scripts/deploy_uniswap_router.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const factoryAddress = process.env.UNISWAP_FACTORY;

  const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router");
  const uniswapRouter = await UniswapV2Router.deploy(factoryAddress, deployer.address);

  await uniswapRouter.deployed();

  console.log("Uniswap V2 Router deployed to:", uniswapRouter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
