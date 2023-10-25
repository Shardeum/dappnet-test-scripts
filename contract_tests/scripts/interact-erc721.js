const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace with the address of the deployed ERC-721 contract
  const contractAddress = process.env.CONTRACT_ADDRESS || process.argv[2];
  if (!contractAddress) {
    console.error('Contract address not provided.');
    process.exit(1);
  }
  console.log("contractAddress:", contractAddress);

  // Connect to the ERC-721 contract
  const erc721Contract = await ethers.getContractAt("MyExtendedERC721Token", contractAddress);

  // Call the mint function
  const mintTx = await erc721Contract.mint(process.env.Your_Address, 1);
  await mintTx.wait();
  console.log("Minted a new ERC-721 token");

  // Call the burn function
  const tokenIdToBurn = 1; // Replace with the actual token ID
  const burnTx = await erc721Contract.burn(tokenIdToBurn);
  await burnTx.wait();
  console.log(`Burned ERC-721 token with ID ${tokenIdToBurn}`);


}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
