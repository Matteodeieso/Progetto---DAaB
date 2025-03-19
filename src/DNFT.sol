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

    string private sadURI = "ipfs://bafkreicfben673w3kzfyge6f6tyt7usn77xkzmunmmaxusbd6imz7fxlmu";
    string private normalURI = "ipfs://bafkreigvuhmsfiawqj7kc7vy6ixmto5vouadnwsr3gcazc2v24w4wam7eu";
    string private happyURI = "ipfs://bafkreigt72sjzj33gasjtksyz2qvccn4ijr6weq4t2fmgh232ywflpg2gm";

    mapping(uint256 => address) public tokenOwners;

   constructor(address _weatherContract) ERC721("DynamicMoodNFT", "DMNFT") Ownable(msg.sender) {
    externalContract = IWeatherContract(_weatherContract);
}

    function mintNFT(address recipient) public onlyOwner {
        uint256 newTokenId = tokenIdCounter;
        _mint(recipient, newTokenId);
        tokenOwners[newTokenId] = recipient;
        tokenIdCounter++;
    }

    function updateMood(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        uint256 mood = externalContract.temp(); // Prendiamo il valore di temp
        string memory newURI;

        if (mood < 10) {
            newURI = sadURI;
        } else if (mood >= 11 && mood <= 19) {
            newURI = normalURI;
        } else {
            newURI = happyURI;
        }

        _setTokenURI(tokenId, newURI);
    }
}