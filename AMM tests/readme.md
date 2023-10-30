# Automated AMM GitHub Action

This GitHub Action automates Automated Market Maker (AMM) tasks using Hardhat and Node.js. It allows you to perform AMM-related operations like adding liquidity, swapping, and removing liquidity on the Ethereum blockchain.

## Prerequisites

Before using this GitHub Action, make sure you have the following prerequisites in place:

- **Node.js**: This Action uses Node.js, so ensure that you have Node.js installed. The specific version used is 18.14.2.

- **GitHub Repository**: This Action should be used within a GitHub repository where you have the necessary permissions to create and run workflows.

- **Alchemy API Key**: Obtain an Alchemy API Key and replace the `RPC` value in your `.env` file with your Alchemy RPC URL.

- **Ethereum Wallet Configuration**: Update the `.env` file with your Ethereum wallet configuration, including your `PRIVATE_KEY`, `Your_Address`, `Receiver_Address`, `Spender_Address`, and `Operator_Address`.

- **Token Addresses**: Update the `.env` file with the addresses of your relevant tokens, including `TokenInAddress`, `TokenOutAddress`, `FACTORY_ADDRESS`, `ROUTER_ADDRESS`, `WETH_ADDRESS`, and `TOKEN_ADDRESS`.

## Usage

To use this GitHub Action, follow these steps:

1. Create a `.env` file in your repository with your Ethereum wallet and contract configuration as provided in your question.

2. Commit these changes to your repository.

3. Now, whenever you want to run the Automated AMM workflow, follow these steps:

   - Go to your GitHub repository.

   - Click on the "Actions" tab.

   - Select the "Automated AMM" workflow.

   - Click the "Run workflow" button.

The workflow will start and execute the AMM tasks as specified in the GitHub Actions workflow, using the configuration from your `.env` file.

**Important Note**: Make sure to keep your `.env` file secure and never share it publicly, as it contains sensitive information.

## Security Considerations

Since this Action involves private keys and sensitive information, be cautious when sharing your repository with others. It's recommended to use GitHub Secrets to store sensitive data securely and avoid exposing sensitive information in your repository.

With this GitHub Action, you can easily automate AMM tasks in your Ethereum project, making it more efficient and less error-prone.
