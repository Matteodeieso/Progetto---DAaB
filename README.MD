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
L'architettura si suddivide in due componenti principali: on-chain e off-chain.


**On-chain**: comprende gli smart contract che gestiscono il DNFT (Dynamic NFT) e il consumer, responsabile dell'invio di richieste di temperatura tramite le Chainlink Functions.


**Off-chain**: include l'infrastruttura degli oracoli (Decentralized Oracle Network) e la piattaforma che fornisce i dati relativi alla temperatura.


Questa separazione garantisce un'interazione efficiente tra la blockchain e le fonti di dati esterne, assicurando l'aggiornamento dinamico del DNFT.


<p align="center">
<img width="350" src="https://github.com/Matteodeieso/Progetto---DAaB/blob/main/function.png">
</p>

Tramite una chiamata dallo smart contract DNFT, viene richiesta l'ultima temperatura memorizzata dal consumer.


Il consumer, a sua volta, aggiorna il valore della temperatura effettuando una chiamata a un'API esterna. Una volta ottenuto il dato, procede con l'aggiornamento della temperatura.

<h1 align="center">FRONTEND</h1>


<p align="center">
<img width="150" src="https://github.com/Matteodeieso/Progetto---DAaB/blob/main/reqTokenUri.png">
<img width="150" src="https://github.com/Matteodeieso/Progetto---DAaB/blob/main/DNFTImage.png">
</p>



Nella cartella IPFS possiamo vedere le immagini associate ai 3 stati che il token può assumere.
