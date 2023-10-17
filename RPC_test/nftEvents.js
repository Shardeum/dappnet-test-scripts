const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://dapps.shardeum.org');

const contractAddress = '0x7fb24C8eDECF8Ea181aA064F18Ef0a588c8Ff6c1';

const abi = [
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
];

const contract = new ethers.Contract(contractAddress, abi, provider);

async function getLogs() {
    try {
        const currentBlockNumber = await provider.getBlockNumber();
        
        const fromBlock = Math.max(currentBlockNumber - 60, 0);
        const toBlock = currentBlockNumber;

        const filter = {
            address: contractAddress,
            fromBlock: fromBlock,
            toBlock: toBlock,
        };
        
        const logs = await provider.getLogs(filter);
        
        logs.forEach(log => {
            const parsedLog = contract.interface.parseLog(log);
            console.log(parsedLog);
        });
    } catch (error) {
        console.error(error);
    }
}

setInterval(getLogs, 10000);