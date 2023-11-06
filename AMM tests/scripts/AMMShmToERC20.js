const { Contract, utils, constants, Wallet, providers } = require('ethers');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Replace with your private key
const PROVIDER_URL = process.env.RPC; // Replace with your RPC URL

const UNISWAP_ROUTER_ADDRESS = process.env.ROUTER_ADDRESS; // Replace with the Uniswap Router address
const ERC20_TOKEN_ADDRESS = process.env.TOKEN_A_ADDRESS; // Replace with your ERC20 token address
const USER_ADDRESS = '0x4aC460bAa00Eae9CB367EDFC87E1ef4749b49405'; // Replace with the user's Ethereum address

const provider = new providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

const UNISWAP_ROUTER_ABI = [
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
];

async function swapEthForErc20() {
    const uniswapRouter = new Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, wallet);

    const DEADLINE = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
    const PATH = [constants.AddressZero, ERC20_TOKEN_ADDRESS];
    const AMOUNT_OUT_MIN = utils.parseEther('1', 18); // Minimum amount of ERC20 tokens to receive
    const AMOUNT_IN = utils.parseEther('50', 18); // Amount of ETH to swap (0.1 ETH)

    // Swap ETH for ERC20 token
    const tx = await uniswapRouter.swapExactETHForTokens(
        AMOUNT_OUT_MIN,
        PATH,
        USER_ADDRESS,
        DEADLINE,
        {
            value: AMOUNT_IN,
            gasLimit: utils.hexlify(1000000)
        }
    );

    const receipt = await tx.wait();
    console.log('Transaction Hash:', receipt.transactionHash);
}

swapEthForErc20()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
