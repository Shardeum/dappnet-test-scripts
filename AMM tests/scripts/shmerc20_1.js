const ethers = require('ethers');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROVIDER = new ethers.providers.JsonRpcProvider(process.env.RPC);

const UNISWAP_ROUTER_ADDRESS = '0x4e0E57754929F3A4FA44113D205774a61b91F87a';  
const ERC20_TOKEN_ADDRESS = '0x1653c7477c3aaFc943d326B6025F144f46e3B275';
const USER_ADDRESS = '0x4aC460bAa00Eae9CB367EDFC87E1ef4749b49405';

const UNISWAP_ROUTER_ABI = [
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
];

const wallet = new ethers.Wallet(PRIVATE_KEY, PROVIDER);
const uniswapRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, wallet);

async function swapEthForErc20() {
    try {
        const DEADLINE = Math.floor((Date.now() / 1000) + 60 * 20); 
        const PATH = [
            '0xD65F3076B8E7252417C3a6c80705Da2402E523a2', // WETH address
            ERC20_TOKEN_ADDRESS
        ];
        const AMOUNT_OUT_MIN = 1;  

        const tx = await uniswapRouter.swapExactETHForTokens(
            AMOUNT_OUT_MIN,
            PATH,
            USER_ADDRESS,
            DEADLINE,
          
        );
        
        const receipt = await tx.wait();
        console.log(`Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

swapEthForErc20();
