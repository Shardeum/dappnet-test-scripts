const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddress = "0xddf1362eeb5c6c839ed59012079476edd6873cd9"; // Replace with your contract's address

  const MyERC1155 = await ethers.getContractFactory("MyERC1155");
  const myERC1155 = await MyERC1155.attach(contractAddress);

  // Mint an ERC1155 token
  const tokenIdToMint = 1;
  const amountToMint = 10;
  await myERC1155.mint(deployer.address, tokenIdToMint, amountToMint, "0x");

  console.log(`Minted ${amountToMint} tokens of ID ${tokenIdToMint}`);

  // Check the balance of the deployer
  const balance = await myERC1155.balanceOf(deployer.address, tokenIdToMint);
  console.log(`Deployer's balance of token ${tokenIdToMint}: ${balance.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
