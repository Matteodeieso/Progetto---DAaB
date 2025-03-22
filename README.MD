# DAaB---Chainlink
**Obiettivo**: Creare un NFT dinamico che rappresenti le fasi di crescita di una pianta in base alla temperatura rilevata. I dati vengono acquisiti tramite API esterne, che forniscono la temperatura di una città specificata tramite latitudine e longitudine. Lo stato dell’NFT varia secondo le seguenti condizioni:

-Seme: quando la temperatura è inferiore a 10°C

-Germoglio: quando la temperatura è compresa tra 11°C e 19°C

Fioritura: quando la temperatura supera i 19°C


API utilizzate: https://open-meteo.com/en/docs


Per permettere al contratto di interagire con l'API esterna viene fatto uso degli oracoli tramite le **chainlink functions**: https://docs.chain.link/chainlink-functions

Tool utilizzati:


**-Sepolia** ->Testnet utilizzata;


**-Solidity**->Linguaggio per la scrittura degli smart contract;


**-Chainlink funcitons**->Utilizzate per implementare il consumer che comunica con gli oracoli e recupera i dati di temperatura;


**-Remix**->Utilizzato per lo svilippo e il deploy degli smart contract;


**-React**->Integrazione frontend;


**-Pinata**->Per utilizzare gli IPFS.



![alt text](https://github.com/Matteodeieso/Progetto---DAaB/blob/main/architectureV2.png)
