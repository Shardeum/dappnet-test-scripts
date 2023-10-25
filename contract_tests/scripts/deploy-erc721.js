const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const ERC721Contract = await ethers.getContractFactory("MyExtendedERC721Token");
  const erc721 = await ERC721Contract.deploy();
  await erc721.deployed();

  console.log('CONTRACT_ADDRESS=' + erc721.address);
  const contractInfo = {
    address: erc721.address,
    abi: erc721.interface.format("json"),
  };
  const contractAddress = erc721.address;
  fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
  fs.writeFileSync('erc721-contract-address.txt', contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
