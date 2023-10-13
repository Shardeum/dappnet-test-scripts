from web3 import Web3
from unittest.mock import patch, MagicMock
import unittest

# Mocked transaction data
transaction_data = {
  "blockHash": "0x21558059b337a8ff290fb4c5b86926902951eb21b0a7e4ee2fc6695cf166912a",
  "blockNumber": "0x2656",
  "contractAddress": "null",
  "cumulativeGasUsed": "0x5208",
  "data": "0x",
  "from": "0x4ac460baa00eae9cb367edfc87e1ef4749b49405",
  "gasRefund": "0x0",
  "gasUsed": "0x5208",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x0",
  "status": 1,
  "to": "0x738b2b2153d78fc8e690b160a6fc919b2c88b6a4",
  "transactionHash": "0x6410b7912ff5894c7a1b7acd65b3aa20892d2d3681102b15e0f51ab7c7aeef0f",
  "transactionIndex": "0x1",
  "value": "0x21e19e0c9bab2400000"
}
# Mocked Data from https://sphinx.shardeum.org/
"""transaction_data = {
  "blockHash": "0x237ea983db982f07a9785f007cb7c0806a90cdf49481652faf9f48096b1ce74a",
  "blockNumber": "0x3a17d",
  "contractAddress": "null",
  "cumulativeGasUsed": "0x5208",
  "data": "0x",
  "from": "0x1240b86db5987cbe1a2ee071472fc9ac10a1f97a",
  "gasUsed": "0x5208",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "2c9",
  "status": 1,
  "to": "0xddbcf4998ed12da6de11823751c3fb8d6222baab",
  "transactionHash": "0x57a43a8640a47c54439114895dd63faa1b841d2cab25eaac4f052cd0749ab62e",
  "transactionIndex": "0x1",
  "value": "d02ab486cedc0000"
}"""

class TestEthMethods(unittest.TestCase):

    def setUp(self):
        # Replace with the actual RPC URL
        #rpc_url = "https://dapps.shardeum.org"
        #rpc_url = "http://45.79.5.17:8090"
        rpc_url = "http://72.14.190.50:8090/"
        #rpc_url = "https://sphinx.shardeum.org"
        self.web3 = Web3(Web3.HTTPProvider(rpc_url))

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_blockNumber(self, mock_http_provider):
        block_number = 100000  # Replace with the expected block number
        self.web3.eth.blockNumber = block_number
        fetched_block_number = self.web3.eth.blockNumber
        self.assertEqual(fetched_block_number, block_number)
        print("Fetched block number:", fetched_block_number)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getBlockByHash(self, mock_http_provider):
        block_hash = transaction_data["blockHash"]
        mock_get_block = MagicMock(return_value=transaction_data)
        self.web3.eth.get_block = mock_get_block
        fetched_block = self.web3.eth.get_block(block_hash)
        self.assertTrue(isinstance(fetched_block, dict))
        self.assertEqual(fetched_block, transaction_data)
        print("Fetched block by hash:", fetched_block)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getBlockByNumber(self, mock_http_provider):
        block_number = int(transaction_data["blockNumber"], 16)
        mock_get_block = MagicMock(return_value=transaction_data)
        self.web3.eth.get_block = mock_get_block
        fetched_block = self.web3.eth.get_block(block_number)
        self.assertTrue(isinstance(fetched_block, dict))
        self.assertEqual(fetched_block, transaction_data)
        print("Fetched block by number:", fetched_block)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getBlockTransactionCountByHash(self, mock_http_provider):
        block_hash = transaction_data["blockHash"]
        transaction_count = len(transaction_data.get("transactions", []))
        mock_get_block_transaction_count = MagicMock(return_value=transaction_count)
        self.web3.eth.get_block_transaction_count = mock_get_block_transaction_count
        fetched_transaction_count = self.web3.eth.get_block_transaction_count(block_hash)
        self.assertEqual(fetched_transaction_count, transaction_count)
        print("Fetched transaction count by hash:", fetched_transaction_count)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getBlockTransactionCountByNumber(self, mock_http_provider):
        block_number = int(transaction_data["blockNumber"], 16)
        transaction_count = len(transaction_data.get("transactions", []))
        mock_get_block_transaction_count = MagicMock(return_value=transaction_count)
        self.web3.eth.get_block_transaction_count = mock_get_block_transaction_count
        fetched_transaction_count = self.web3.eth.get_block_transaction_count(block_number)
        self.assertEqual(fetched_transaction_count, transaction_count)
        print("Fetched transaction count by number:", fetched_transaction_count)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getBalance(self, mock_http_provider):
        address = transaction_data["from"]
        balance = int(transaction_data["value"], 16)
        mock_get_balance = MagicMock(return_value=balance)
        self.web3.eth.get_balance = mock_get_balance
        fetched_balance = self.web3.eth.get_balance(address)
        self.assertEqual(fetched_balance, balance)
        print("Fetched balance:", fetched_balance)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getCode(self, mock_http_provider):
        address = transaction_data["to"]
        code = "0xabcdef"  # Replace with the expected code
        mock_get_code = MagicMock(return_value=code)
        self.web3.eth.get_code = mock_get_code
        fetched_code = self.web3.eth.get_code(address)
        self.assertEqual(fetched_code, code)
        print("Fetched code:", fetched_code)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_gasPrice(self, mock_http_provider):
        gas_price = "0x12345"  # Replace with the expected gas price
        mock_gas_price = MagicMock(return_value=gas_price)
        self.web3.eth.gasPrice = mock_gas_price
        fetched_gas_price = self.web3.eth.gasPrice
        self.assertEqual(fetched_gas_price, gas_price)
        print("Fetched gas price:", fetched_gas_price)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_estimateGas(self, mock_http_provider):
        gas_estimate = 21000  # Replace with the expected gas estimate
        mock_estimate_gas = MagicMock(return_value=gas_estimate)
        self.web3.eth.estimateGas = mock_estimate_gas
        fetched_gas_estimate = self.web3.eth.estimateGas(transaction_data)
        self.assertEqual(fetched_gas_estimate, gas_estimate)
        print("Fetched gas estimate:", fetched_gas_estimate)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_newFilter(self, mock_http_provider):
        filter_data = {
            "id": 1,
            "jsonrpc": "2.0",
            "result": "0x1234567890abcdef"  # Replace with the expected filter ID
        }
        mock_new_filter = MagicMock(return_value=filter_data["result"])
        self.web3.eth.new_filter = mock_new_filter
        new_filter_id = self.web3.eth.new_filter({})
        self.assertEqual(new_filter_id, filter_data["result"])
        print("Created new filter:", new_filter_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_newBlockFilter(self, mock_http_provider):
        filter_data = {
            "id": 1,
            "jsonrpc": "2.0",
            "result": "0x1234567890abcdef"  # Replace with the expected filter ID
        }
        mock_new_block_filter = MagicMock(return_value=filter_data["result"])
        self.web3.eth.new_block_filter = mock_new_block_filter
        new_filter_id = self.web3.eth.new_block_filter()
        self.assertEqual(new_filter_id, filter_data["result"])
        print("Created new block filter:", new_filter_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_newPendingTransactionFilter(self, mock_http_provider):
        filter_data = {
            "id": 1,
            "jsonrpc": "2.0",
            "result": "0x1234567890abcdef"  # Replace with the expected filter ID
        }
        mock_new_pending_tx_filter = MagicMock(return_value=filter_data["result"])
        self.web3.eth.new_pending_transaction_filter = mock_new_pending_tx_filter
        new_filter_id = self.web3.eth.new_pending_transaction_filter()
        self.assertEqual(new_filter_id, filter_data["result"])
        print("Created new pending transaction filter:", new_filter_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_uninstallFilter(self, mock_http_provider):
        filter_id = "0x1234567890abcdef"  # Replace with the filter ID to uninstall
        mock_uninstall_filter = MagicMock(return_value=True)
        self.web3.eth.uninstall_filter = mock_uninstall_filter
        result = self.web3.eth.uninstall_filter(filter_id)
        self.assertTrue(result)
        print("Uninstalled filter:", filter_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getFilterChanges(self, mock_http_provider):
        filter_id = "0x1234567890abcdef"  # Replace with the filter ID
        filter_changes = [transaction_data]  # Replace with the expected filter changes
        mock_get_filter_changes = MagicMock(return_value=filter_changes)
        self.web3.eth.get_filter_changes = mock_get_filter_changes
        fetched_changes = self.web3.eth.get_filter_changes(filter_id)
        self.assertEqual(fetched_changes, filter_changes)
        print("Fetched filter changes:", fetched_changes)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getFilterLogs(self, mock_http_provider):
        filter_id = "0x1234567890abcdef"  # Replace with the filter ID
        filter_logs = [transaction_data]  # Replace with the expected filter logs
        mock_get_filter_logs = MagicMock(return_value=filter_logs)
        self.web3.eth.get_filter_logs = mock_get_filter_logs
        fetched_logs = self.web3.eth.get_filter_logs(filter_id)
        self.assertEqual(fetched_logs, filter_logs)
        print("Fetched filter logs:", fetched_logs)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getLogs(self, mock_http_provider):
        filter_params = {
            "address": "0x532346666ba10ba5a505efbc2a89544b8e3d2574",
            "fromBlock": "latest",
            "toBlock": "latest"
        }
        filter_logs = [transaction_data]  # Replace with the expected filter logs
        mock_get_logs = MagicMock(return_value=filter_logs)
        self.web3.eth.getLogs = mock_get_logs
        fetched_logs = self.web3.eth.getLogs(filter_params)
        self.assertEqual(fetched_logs, filter_logs)
        print("Fetched logs:", fetched_logs)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_web3_clientVersion(self, mock_http_provider):
        client_version = "MyWeb3Client/v1.0.0"  # Replace with the expected client version
        mock_client_version = MagicMock(return_value=client_version)
        self.web3.clientVersion = mock_client_version
        fetched_client_version = self.web3.clientVersion
        self.assertEqual(fetched_client_version, client_version)
        print("Fetched client version:", fetched_client_version)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_web3_sha3(self, mock_http_provider):
        input_data = "0x68656c6c6f20776f726c64"  # Replace with the input data
        sha3_hash = "0x1234567890abcdef"  # Replace with the expected SHA3 hash
        mock_sha3 = MagicMock(return_value=sha3_hash)
        self.web3.sha3 = mock_sha3
        fetched_sha3_hash = self.web3.sha3(text=input_data)
        self.assertEqual(fetched_sha3_hash, sha3_hash)
        print("Fetched SHA3 hash:", fetched_sha3_hash)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_net_version(self, mock_http_provider):
        network_version = "8081"  # Replace with the expected network version
        mock_net_version = MagicMock(return_value=network_version)
        self.web3.net.version = mock_net_version
        fetched_network_version = self.web3.net.version
        self.assertEqual(fetched_network_version, network_version)
        print("Fetched network version:", fetched_network_version)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_net_peerCount(self, mock_http_provider):
        peer_count = "2"  # Replace with the expected peer count
        mock_net_peer_count = MagicMock(return_value=str(peer_count))
        self.web3.net.peerCount = mock_net_peer_count
        fetched_peer_count = self.web3.net.peerCount
        self.assertEqual(int(fetched_peer_count, 16), peer_count)
        print("Fetched peer count:", fetched_peer_count)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_net_listening(self, mock_http_provider):
        listening_status = True  # Replace with the expected listening status
        mock_net_listening = MagicMock(return_value=listening_status)
        self.web3.net.listening = mock_net_listening
        fetched_listening_status = self.web3.net.listening
        self.assertEqual(fetched_listening_status, listening_status)
        print("Listening status:", fetched_listening_status)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getTransactionByHash(self, mock_http_provider):
        transaction_hash = transaction_data["transactionHash"]
        mock_get_transaction = MagicMock(return_value=transaction_data)
        self.web3.eth.getTransaction = mock_get_transaction
        fetched_transaction = self.web3.eth.getTransaction(transaction_hash)
        self.assertEqual(fetched_transaction, transaction_data)
        print("Fetched transaction by hash:", fetched_transaction)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getTransactionByBlockHashAndIndex(self, mock_http_provider):
        block_hash = transaction_data["blockHash"]
        transaction_index = transaction_data["transactionIndex"]
        mock_get_transaction = MagicMock(return_value=transaction_data)
        self.web3.eth.getTransactionByBlock = mock_get_transaction
        fetched_transaction = self.web3.eth.getTransactionByBlock(
            block_hash, transaction_index)
        self.assertEqual(fetched_transaction, transaction_data)
        print("Fetched transaction by block hash and index:", fetched_transaction)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getTransactionByBlockNumberAndIndex(self, mock_http_provider):
        block_number = int(transaction_data["blockNumber"], 16)
        transaction_index = transaction_data["transactionIndex"]
        mock_get_transaction = MagicMock(return_value=transaction_data)
        self.web3.eth.getTransactionByBlock = mock_get_transaction
        fetched_transaction = self.web3.eth.getTransactionByBlock(
            block_number, transaction_index)
        self.assertEqual(fetched_transaction, transaction_data)
        print("Fetched transaction by block number and index:", fetched_transaction)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getTransactionReceipt(self, mock_http_provider):
        transaction_hash = transaction_data["transactionHash"]
        mock_get_transaction_receipt = MagicMock(return_value=transaction_data)
        self.web3.eth.getTransactionReceipt = mock_get_transaction_receipt
        fetched_receipt = self.web3.eth.getTransactionReceipt(transaction_hash)
        self.assertEqual(fetched_receipt, transaction_data)
        print("Fetched transaction receipt:", fetched_receipt)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_accounts(self, mock_http_provider):
        mock_accounts = MagicMock(return_value=["0x12345", "0x67890"])
        self.web3.eth.accounts = mock_accounts
        accounts = self.web3.eth.accounts
        self.assertEqual(accounts, ["0x12345", "0x67890"])
        print("Fetched accounts:", accounts)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_chainId(self, mock_http_provider):
        chain_id = 1
        mock_chain_id = MagicMock(return_value=chain_id)
        self.web3.eth.chainId = mock_chain_id
        fetched_chain_id = self.web3.eth.chainId
        self.assertEqual(fetched_chain_id, chain_id)
        print("Fetched chain ID:", fetched_chain_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_feeHistory(self, mock_http_provider):
        fee_history = [transaction_data]  # Replace with a list of fee history data
        mock_fee_history = MagicMock(return_value=fee_history)
        self.web3.eth.feeHistory = mock_fee_history
        fetched_fee_history = self.web3.eth.feeHistory({})
        self.assertEqual(fetched_fee_history, fee_history)
        print("Fetched fee history:", fetched_fee_history)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getProof(self, mock_http_provider):
        account = "0x12345"
        storage_keys = ["0xabcdef"]
        block_number = 100000
        mock_get_proof = MagicMock(return_value=transaction_data)
        self.web3.eth.getProof = mock_get_proof
        fetched_proof = self.web3.eth.getProof(account, storage_keys, block_number)
        self.assertEqual(fetched_proof, transaction_data)
        print("Fetched proof:", fetched_proof)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getUncleCountByBlockHash(self, mock_http_provider):
        block_hash = "0x0f34790b7f746b5b5dd6c281126853b27ab6436ff1ac733c9fa191e6fdcceb9f"
        mock_get_uncle_count = MagicMock(return_value=2)
        self.web3.eth.getUncleCountByBlock = mock_get_uncle_count
        fetched_uncle_count = self.web3.eth.getUncleCountByBlock(block_hash)
        self.assertEqual(fetched_uncle_count, 2)
        print("Fetched uncle count by block hash:", fetched_uncle_count)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_getUncleCountByBlockNumber(self, mock_http_provider):
        block_number = 100000
        mock_get_uncle_count = MagicMock(return_value=3)
        self.web3.eth.getUncleCountByBlock = mock_get_uncle_count
        fetched_uncle_count = self.web3.eth.getUncleCountByBlock(block_number)
        self.assertEqual(fetched_uncle_count, 3)
        print("Fetched uncle count by block number:", fetched_uncle_count)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_maxPriorityFeePerGas(self, mock_http_provider):
        max_priority_fee = "0x98765"
        mock_max_priority_fee = MagicMock(return_value=max_priority_fee)
        self.web3.eth.maxPriorityFeePerGas = mock_max_priority_fee
        fetched_max_priority_fee = self.web3.eth.maxPriorityFeePerGas
        self.assertEqual(fetched_max_priority_fee, max_priority_fee)
        print("Fetched max priority fee per gas:", fetched_max_priority_fee)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_signTransaction(self, mock_http_provider):
        transaction = {
            # ... (transaction details)
        }
        mock_sign_transaction = MagicMock(return_value=transaction_data)
        self.web3.eth.signTransaction = mock_sign_transaction
        signed_transaction = self.web3.eth.signTransaction(transaction)
        self.assertEqual(signed_transaction, transaction_data)
        print("Signed transaction:", signed_transaction)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_submitWork(self, mock_http_provider):
        work = ["0x123456", "0xabcdef"]
        mock_submit_work = MagicMock(return_value=True)
        self.web3.eth.submitWork = mock_submit_work
        submitted = self.web3.eth.submitWork(*work)
        self.assertTrue(submitted)
        print("Submitted work:", work)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_subscribe(self, mock_http_provider):
        subscription_id = "0x1234567890abcdef"
        mock_subscribe = MagicMock(return_value=subscription_id)
        self.web3.eth.subscribe = mock_subscribe
        subscribed_id = self.web3.eth.subscribe("newHeads", {})
        self.assertEqual(subscribed_id, subscription_id)
        print("Subscribed with ID:", subscribed_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_syncing(self, mock_http_provider):
        syncing_data = {
            # ... (syncing data)
        }
        mock_syncing = MagicMock(return_value=syncing_data)
        self.web3.eth.syncing = mock_syncing
        fetched_syncing_data = self.web3.eth.syncing
        self.assertEqual(fetched_syncing_data, syncing_data)
        print("Fetched syncing data:", fetched_syncing_data)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_eth_unsubscribe(self, mock_http_provider):
        subscription_id = "0x1234567890abcdef"
        mock_unsubscribe = MagicMock(return_value=True)
        self.web3.eth.unsubscribe = mock_unsubscribe
        unsubscribed = self.web3.eth.unsubscribe(subscription_id)
        self.assertTrue(unsubscribed)
        print("Unsubscribed with ID:", subscription_id)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_txpool_content(self, mock_http_provider):
        txpool_content_data = {
            # ... (transaction pool content data)
        }
        mock_txpool_content = MagicMock(return_value=txpool_content_data)
        self.web3.txpool.content = mock_txpool_content
        fetched_txpool_content = self.web3.txpool.content
        self.assertEqual(fetched_txpool_content, txpool_content_data)
        print("Fetched transaction pool content:", fetched_txpool_content)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_txpool_inspect(self, mock_http_provider):
        txpool_inspect_data = {
            # ... (transaction pool inspect data)
        }
        mock_txpool_inspect = MagicMock(return_value=txpool_inspect_data)
        self.web3.txpool.inspect = mock_txpool_inspect
        fetched_txpool_inspect = self.web3.txpool.inspect
        self.assertEqual(fetched_txpool_inspect, txpool_inspect_data)
        print("Fetched transaction pool inspect data:", fetched_txpool_inspect)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_txpool_status(self, mock_http_provider):
        txpool_status_data = {
            # ... (transaction pool status data)
        }
        mock_txpool_status = MagicMock(return_value=txpool_status_data)
        self.web3.txpool.status = mock_txpool_status
        fetched_txpool_status = self.web3.txpool.status
        self.assertEqual(fetched_txpool_status, txpool_status_data)
        print("Fetched transaction pool status data:", fetched_txpool_status)

    @patch.object(Web3, 'HTTPProvider')
    def test_mock_txpool_contentFrom(self, mock_http_provider):
        address = "0x12345"
        txpool_content_data = {
            # ... (transaction pool content data for address)
        }
        mock_txpool_content_from = MagicMock(return_value=txpool_content_data)
        self.web3.txpool.content = mock_txpool_content_from
        fetched_txpool_content = self.web3.txpool.content(address)
        self.assertEqual(fetched_txpool_content, txpool_content_data)
        print("Fetched transaction pool content for address:", fetched_txpool_content)

if __name__ == '__main__':
    unittest.main()