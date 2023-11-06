require("@nomiclabs/hardhat-waffle");
require('dotenv').config()


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url:"http://127.0.0.1:8545/"
    },
    sphinx: {
        url: process.env.RPC, // Specify the URL for the testnet
        chainId: parseInt(process.env.CHAIN_ID), // Parse the chain ID as an integer
        accounts: [process.env.PRIVATE_KEY],
        gas: 20000000,
        }
  },

  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    }
  },
};