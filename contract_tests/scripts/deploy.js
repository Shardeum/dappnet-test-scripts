// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
 

  // We get the contract to deploy
  const TestToken = await hre.ethers.getContractFactory("testToken");
  const testToken = await TestToken.deploy("100000000000000000000");

  await testToken.deployed();
  
  console.log('CONTRACT_ADDRESS=' + testToken.address);
  const contractInfo = {
    address: testToken.address,
    abi: testToken.interface.format("json"),
  };
  const contractAddress = testToken.address;
  fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
  fs.writeFileSync('contract-address.txt', contractAddress);
  //console.log("Contract address and ABI saved to contract-info.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });