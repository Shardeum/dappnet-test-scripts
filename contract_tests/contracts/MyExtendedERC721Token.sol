// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyExtendedERC721Token is ERC721, Ownable {
    constructor() ERC721("MyExtendedERC721Token", "MET721") {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public {
        _burn(tokenId);
    }

    function ownerOfToken(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function safeTransferFromOwner(address from, address to, uint256 tokenId) public onlyOwner {
        safeTransferFrom(from, to, tokenId, "");
    }
}
