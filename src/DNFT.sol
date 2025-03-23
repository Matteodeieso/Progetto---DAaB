// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IWeatherContract {
    function temp() external view returns (uint256);
}

contract DNFT is ERC721URIStorage, Ownable {
    IWeatherContract public externalContract;
    uint256 public tokenIdCounter;

    string private semeURI = "ipfs://bafkreiea2s4u5vesrbbgbqmbaazvhievo4l4kpzmbdznpyxjnq7nheljie";
    string private germURI = "ipfs://bafkreidzuplh3cvouuttasdciegsssnnzdvezqceaajoidmgqfmjigmgty";
    string private fioreURI = "ipfs://bafkreiea2s4u5vesrbbgbqmbaazvhievo4l4kpzmbdznpyxjnq7nheljie";

    mapping(uint256 => address) public tokenOwners;

   constructor(address _weatherContract) ERC721("DFlower", "DNFTf") Ownable(msg.sender) {
    externalContract = IWeatherContract(_weatherContract);
}

    function mintNFT(address recipient) public onlyOwner {
        uint256 newTokenId = tokenIdCounter;
        _mint(recipient, newTokenId);
        tokenOwners[newTokenId] = recipient;
        tokenIdCounter++;
    }

    function updateState(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        uint256 mood = externalContract.temp(); // Prendiamo il valore di temp
        string memory newURI;

        if (mood < 10) {
            newURI = semeURI;
        } else if (mood >= 11 && mood <= 19) {
            newURI = germURI;
        } else {
            newURI = fioreURI;
        }

        _setTokenURI(tokenId, newURI);
    }
}