# Automated Contract Deployment and Interaction

This GitHub Actions workflow allows you to automate the deployment and interaction with ERC20, ERC721, and ERC1155 smart contracts on the TESTNET network. The workflow runs sequentially, ensuring that each contract is deployed before interaction.

## Getting Started

To use this workflow, follow the steps below:

### Prerequisites

- You need a GitHub repository containing your contract code and deployment scripts.
- Ensure you have configured your `hardhat.config.js` and script files accordingly.

### Usage

1. **Push Code to the Repository:**

    - Push your code, including your smart contract code and deployment scripts, to your GitHub repository.
    - Make sure to set up your project with the necessary dependencies.

2. **Create GitHub Secrets:**

    - Go to your GitHub repository and navigate to the "Settings" tab.
    - In the left sidebar, click on "Secrets."
    - Add the following secrets:
        - `PRIVATE_KEY`: Your Ethereum wallet private key for contract deployment.
        - `NETWORK_NAME`: The network name (e.g., "TESTNET") where you want to deploy your contracts.
        - Add any other secrets required by your scripts.

3. **Run the Workflow:**

    - Click on the "Actions" tab in your GitHub repository.
    - Select "Automated Contract Deployment and Interaction."
    - Click the "Run workflow" button.
    - Choose the branch (e.g., "master") where your code is located.
    - Click the "Run workflow" button to trigger the deployment and interaction process.

4. **Monitor the Workflow:**

    - The workflow will automatically compile, deploy, and interact with your ERC20, ERC721, and ERC1155 contracts.
    - You can check the progress and see the logs in the GitHub Actions workflow dashboard.

5. **Access Contract Addresses:**

    - The workflow captures the contract addresses and sets them as environment variables:
        - `CONTRACT_ADDRESS`: General contract address.
        - `ERC20_CONTRACT_ADDRESS`: ERC20 contract address.
        - `ERC721_CONTRACT_ADDRESS`: ERC721 contract address.
        - `ERC1155_CONTRACT_ADDRESS`: ERC1155 contract address.
    - You can access these addresses in your subsequent actions or scripts.


