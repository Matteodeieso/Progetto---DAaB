# DAaB---Chainlink
**Obiettivo**: Sviluppare un NFT dinamico rappresentante lo stato d'animo di una persona. I valori assunti variano a seconda di 3 stati:

-Triste: Se Temperatura < 10°

-Normale: Se temperatura(T) 11<T<19

-Felice: Se Temperatura >19



I valori in input vengono presi da API esterne la quale forniscono la temperatura di una specifica città(Specificando latitudine e longitudine). API utilizzate: https://open-meteo.com/en/docs


Per permettere al contratto di interagire con l'API esterna viene fatto uso degli oracoli tramite le **chainlink functions**: https://docs.chain.link/chainlink-functions

Strumenti utilizzati:


**-Sepolia** ->Blockchain di prova;


**-Solidity**->Linguaggio per la scrittura degli smart contract;


**-Chainlink funcitons**->Utilizzate per implementare gli oracoli per effettuare interazioni con API esterne alla blockchain;


**-Remix**->Utilizzato per lo svilippo e il deploy degli smart contract;


**-React**->Integrazione frontend;


**-Pinata**->Per utilizzare gli IPFS.



![alt text](https://github.com/Matteodeieso/Progetto---DAaB/blob/main/architecture2.png)
