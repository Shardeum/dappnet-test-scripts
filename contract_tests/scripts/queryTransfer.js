const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('http://45.79.5.17:8090');

const erc721Owner = async () => {
    try {
        const logs = await provider.getLogs({
            fromBlock: 187625,
            toBlock: 190625,
            topics: [ethers.utils.id('Transfer(address,address,uint256)')],
        });
        console.log(logs.length);
    } catch (error) {
        console.error('Error fetching logs:', error);
    }
};

erc721Owner();
