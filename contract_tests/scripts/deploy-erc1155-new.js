const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const ERC1155Contract = await ethers.getContractFactory("MyExtendedERC1155Token");
  const erc1155 = await ERC1155Contract.deploy();
  await erc1155.deployed();

  console.log('CONTRACT_ADDRESS=' + erc1155.address);
  const contractInfo = {
    address: erc1155.address,
    abi: erc1155.interface.format("json"),
  };
  const contractAddress = erc1155.address;
  fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
  fs.writeFileSync('erc1155-contract-address.txt', contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
