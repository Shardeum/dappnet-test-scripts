const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace with the address of the deployed ERC-20 contract
  const contractAddress = process.env.CONTRACT_ADDRESS || process.argv[2];
  if (!contractAddress) {
    console.error('Contract address not provided.');
    process.exit(1);
  }
  console.log("contractAddress:", contractAddress);

  // Connect to the ERC-20 contract
  const erc20Contract = await ethers.getContractAt("MyExtendedERC20Token", contractAddress);

  // Replace with the Ethereum address you want to check the balance for
  const addressToCheck = process.env.Your_Address;

  // Check the balance of the address
  const balance = await erc20Contract.balanceOf(addressToCheck);
  console.log(`Balance of ${addressToCheck}: ${balance.toString()} ERC-20 tokens`);

  // Replace with the recipient address
  const recipientAddress = process.env.Receiver_Address;

  // Replace with the amount of tokens to send
  const amountToSend = ethers.utils.parseUnits("10", 18); // 10 ERC-20 tokens (assuming 18 decimals)

  // Call the mint function
  const mintTx = await erc20Contract.mint(addressToCheck, amountToSend);
  await mintTx.wait();
  console.log(`Minted ${amountToSend.toString()} ERC-20 tokens for ${addressToCheck}`);

  // Call the transfer function
  const transferTx = await erc20Contract.transfer(recipientAddress, amountToSend);
  await transferTx.wait();
  console.log(`Sent ${amountToSend.toString()} ERC-20 tokens to ${recipientAddress}`);

  // Call the approve function
  const spenderAddress = process.env.Spender_Address;
  const approveTx = await erc20Contract.approve(spenderAddress, amountToSend);
  await approveTx.wait();
  console.log(`Approved ${spenderAddress} to spend ${amountToSend.toString()} ERC-20 tokens`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
