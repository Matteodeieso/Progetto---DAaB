// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IWeatherContract {
    function temp() external view returns (uint256);
}

interface IFunctionsConsumer {
    function sendRequest(uint64 subscriptionId, string[] calldata args) external returns (bytes32);
}

contract DNFT is ERC721URIStorage, Ownable {
    IWeatherContract public externalContract;
    IFunctionsConsumer public functionsConsumer;
    uint256 public tokenIdCounter;

    string private semeURI = "Seme";
    string private germURI = "Germoglio";
    string private fioreURI = "Fioritura";

    mapping(uint256 => address) public tokenOwners;

    constructor(address _weatherContract, address _functionsConsumer) 
        ERC721("DynamicMoodNFT", "DMNFT") Ownable(msg.sender) 
    {
        externalContract = IWeatherContract(_weatherContract);
        functionsConsumer = IFunctionsConsumer(_functionsConsumer);
    }

    function mintNFT(address recipient) public onlyOwner {
        uint256 newTokenId = tokenIdCounter;
        _mint(recipient, newTokenId);
        tokenOwners[newTokenId] = recipient;
        tokenIdCounter++;
    }

    function updateMood(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this NFT");
        uint256 mood = externalContract.temp(); // Ottiene la temperatura
        string memory newURI;

        if (mood < 10) {
            newURI = semeURI;
        } else if (mood >= 10 && mood <= 19) {
            newURI = germURI;
        } else {
            newURI = fioreURI;
        }

        _setTokenURI(tokenId, newURI);
    }

    function requestWeatherData(uint64 subscriptionId, string[] calldata args) public onlyOwner {
        functionsConsumer.sendRequest(subscriptionId, args);
    }
}
