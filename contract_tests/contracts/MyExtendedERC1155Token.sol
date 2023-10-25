// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyExtendedERC1155Token is ERC1155, Ownable {
    constructor() ERC1155("MyExtendedERC1155Token") {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function burn(address account, uint256 id, uint256 amount) public onlyOwner {
        _burn(account, id, amount);
    }

    function balanceOfAccount(address account, uint256 id) public view returns (uint256) {
        return balanceOf(account, id);
    }

    function isApprovedForAllOwner(address account, address operator) public view returns (bool) {
        return isApprovedForAll(account, operator);
    }
}
