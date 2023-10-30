const { ethers } = require("hardhat");

const routerAddress = "0xEF3b77F384461CA9F357fAAe1Dae0d005671c46B";
const tokenAddress = "0x7D94d8E6d588cCa2307cB6B37830733a05370480";
const accountPrivateKey = process.env.PRIVATE_KEY; // Replace with your private key

async function removeLiquidity() {
  const [account] = await ethers.getSigners();

  const router = new ethers.Contract(routerAddress, [
    "function removeLiquidityETHWithPermit(address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline, bool approveMax, uint8 v, bytes32 r, bytes32 s) external returns (uint amountToken, uint amountETH)"
  ], account);

  // Define the amount of liquidity you want to remove
  const amountToRemove = ethers.utils.parseEther("0.5"); // Replace with the desired amount

  // Remove liquidity from the pair
  const deadline = Math.floor(Date.now() / 1000) + 60; // Set a reasonable deadline
  const liquidity = await router.removeLiquidityETHWithPermit(
    tokenAddress,
    amountToRemove,
    0, // amountTokenMin (0 means no minimum)
    0, // amountETHMin (0 means no minimum)
    account.address,
    deadline,
    false, // approveMax
    0, // v
    "0x", // r
    "0x"  // s
  );

  // Wait for the transaction to be mined
  await liquidity.wait();
}

removeLiquidity()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
