const { ContractFactory, utils, ethers } = require('ethers');
require('dotenv').config();

const usdcAddress = process.env.TOKEN_A_ADDRESS; // Replace with the actual USDC token address
const usdtAddress = process.env.TOKEN_B_ADDRESS; // Replace with the actual USDT token address
const ownerAddress = process.env.PRIVATE_KEY; // Replace with the address that deployed the contracts

async function main() {
  const owner = new ethers.Wallet(ownerAddress);

  const Router = new ContractFactory(routerArtifact.abi, routerArtifact.bytecode, owner);
  const router = Router.attach(process.env.ROUTER_ADDRESS); // Replace with the actual router address

  // Specify the desired amount of tokens to add
  const amountUSDC = utils.parseUnits('100', 6); // Replace with your desired amount
  const amountUSDT = utils.parseUnits('200', 6); // Replace with your desired amount
  const amountMinLP = 0; // Set a minimum acceptable amount of LP tokens
  const to = ownerAddress;
  const deadline = Math.floor(Date.now() / 1000) + 60; // Set a deadline for the transaction

  // Create the USDC/USDT pair (if it doesn't exist)
  const pairAddress = await router.getPair(usdcAddress, usdtAddress);
  if (pairAddress === '0x0000000000000000000000000000000000000000') {
    await router.addLiquidity(
      usdcAddress,
      usdtAddress,
      amountUSDC,
      amountUSDT,
      amountMinLP,
      amountMinLP,
      to,
      deadline
    );

    console.log('USDC/USDT pair created and liquidity added.');
  } else {
    console.log('USDC/USDT pair already exists. No action taken.');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
