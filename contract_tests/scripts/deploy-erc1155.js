const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying ERC1155 contract with the account:", deployer.address);

  const MyERC1155 = await ethers.getContractFactory("MyERC1155");
  const myERC1155 = await MyERC1155.deploy();

  await myERC1155.deployed();
  const contractAddress = myERC1155.address;
  console.log("CONTRACT_ADDRESS=", myERC1155.address);
  fs.writeFileSync('erc1155-contract-address.txt', contractAddress);
  // Save contract address and ABI to a JSON file
  const contractInfo = {
    address: myERC1155.address,
    abi: MyERC1155.interface.format("json"),
  };

  fs.writeFileSync("contract-info.json", JSON.stringify(contractInfo, null, 2));

  //console.log("Contract address and ABI saved to contract-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
