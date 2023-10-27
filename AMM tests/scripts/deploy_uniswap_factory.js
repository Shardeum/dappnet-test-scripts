// scripts/deploy_uniswap_factory.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const uniswapFactory = await UniswapV2Factory.deploy(deployer.address);

  await uniswapFactory.deployed();

  console.log("Uniswap V2 Factory deployed to:", uniswapFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
