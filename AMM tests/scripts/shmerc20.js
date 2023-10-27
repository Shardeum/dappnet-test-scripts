const ethers = require('ethers');

const PRIVATE_KEY = '';
const PROVIDER = new ethers.providers.JsonRpcProvider('http://72.14.190.50:8090/');

const UNISWAP_ROUTER_ADDRESS = '0xA079e0d0e1f37E7256869B87ecF7fD90127c0292';  
const ERC20_TOKEN_ADDRESS = '0x6977CD576125687C21350B503C9b220C44f63848';
const USER_ADDRESS = '0x245E2395712F888CeD1033C924115105dC32e388';

const UNISWAP_ROUTER_ABI = [
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
];

const wallet = new ethers.Wallet(PRIVATE_KEY, PROVIDER);
const uniswapRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, wallet);

async function swapEthForErc20() {
    try {
        const DEADLINE = Math.floor((Date.now() / 1000) + 60 * 20); 
        const PATH = [
            '0xe26048E166D1A49f27a0Ecab77a6C22010B29c76', // WETH address
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
