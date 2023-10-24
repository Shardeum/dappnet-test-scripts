const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying NFT contract with the account:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  await myNFT.deployed();
  const contractAddress = myNFT.address;
  console.log("CONTRACT_ADDRESS=", myNFT.address);
  fs.writeFileSync('erc721-contract-address.txt', contractAddress);
  const contractInfo = {
    address: myNFT.address,
    abi: MyNFT.interface.format("json"),
  };

  fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));

  //console.log("Contract address and ABI saved to contract-info.json");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
