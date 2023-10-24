// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TestToken = await hre.ethers.getContractFactory("testToken");
  const testToken = await TestToken.deploy("100000000000000000000");

  await testToken.deployed();
  console.log("testToken deployed to:", testToken.address);
   // Handle file exception for contract-address.txt
    try {
      fs.writeFileSync('contract-address.txt', contractAddress);
      console.log("Contract address saved to contract-address.txt");
    } catch (err) {
      console.error("Error writing to contract-address.txt:", err);
    }

    //console.log("Contract address and ABI saved to contract-info.json");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
