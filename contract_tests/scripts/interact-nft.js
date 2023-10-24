const { ethers } = require("hardhat");
require("dotenv").config();
async function main() {
  const [deployer] = await ethers.getSigners();
  const chainId = 8081; // Replace with your chain ID if needed
  const contractAddress = process.env.CONTRACT_ADDRESS;
  console.log("contractAddress:", contractAddress);
  // Use Hardhat's provider for the Shard chain
  const provider = ethers.provider;

  const myNFTContract = await ethers.getContractAt("MyNFT", contractAddress);

  console.log("Deployer's NFT balance:", await myNFTContract.balanceOf(deployer.address));

  // Mint an NFT
  const tokenIdToMint = 1;
  await myNFTContract.mint(deployer.address, tokenIdToMint);

  console.log("Minted NFT with Token ID:", tokenIdToMint);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
