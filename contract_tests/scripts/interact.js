const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace with the address of the deployed testToken contract
  const contractAddress = "0xaa63428dd119ca80e1f5618b5239b407e56c6bf6";

  // Connect to the contract
  const testTokenContract = await ethers.getContractAt("testToken", contractAddress);

  // Replace with the Ethereum address you want to check the balance for
  const addressToCheck = "0x805274B7553b7096d1235f512A37d8a591d37a47";

  // Check the balance of the address
  const balance = await testTokenContract.balanceOf(addressToCheck);
  console.log(`Balance of ${addressToCheck}: ${balance.toString()} SHM`);

  // Replace with the recipient address
  const recipientAddress = "0x805274B7553b7096d1235f512A37d8a591d37a47";

  // Replace with the amount of tokens to send
  const amountToSend = ethers.utils.parseUnits("10", 18); // 100 STT (assuming 18 decimals)

  // Send tokens
  const tx = await testTokenContract.transfer(recipientAddress, amountToSend);
  await tx.wait();

  console.log(`Sent ${amountToSend.toString()} SHM to ${recipientAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
