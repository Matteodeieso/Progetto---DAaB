import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { ABI } from './abi';
import { otherContractABI } from './consumer'; // Importa l'ABI del secondo contratto
function App() {
  const [tokenId, setTokenId] = useState('');
  const [metadata, setMetadata] = useState('');
  const [imageCid, setImageCid] = useState(''); // Qui memorizziamo il CID
  const [contract, setContract] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState('');
  const [requestArgs, setRequestArgs] = useState('');
  const [requestId, setRequestId] = useState('');
  const [otherContract, setOtherContract] = useState(null);
  const contractAddress = '0x5Bcc7d518ECBea14f0a254D89Db4110020A522DF';
  
  const otherContractAddress = '0x62Ec5D280ce05d0c660736cAf9Ac6C88932433Ea'; // Aggiungi l'indirizzo dell'altro contratto

  useEffect(() => {
    const initContracts = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          // Inizializza entrambi i contratti
          setContract(new ethers.Contract(contractAddress, ABI, signer));
          setOtherContract(new ethers.Contract(otherContractAddress, otherContractABI, signer));
        } catch (error) {
          console.error("Errore nel connettersi a MetaMask:", error);
        }
      } else {
        console.error("MetaMask non è installato!");
      }
    };
    initContracts();
  }, []);

  const callSendRequest = async () => {
    if (!otherContract) return;
    
    try {
      // Converti gli argomenti in un array
      const argsArray = requestArgs.split(',').map(arg => arg.trim());
      
      // Converti subscriptionId a BigInt (uint64)
      const subId = ethers.toBigInt(subscriptionId);
      
      // Chiama la funzione
      const tx = await otherContract.sendRequest(
        subId,
        argsArray,
        {
          // gasLimit: ethers.toBigInt('500000') // Opzionale: specifica gas limit se necessario
        }
      );
      
      await tx.wait(); // Aspetta che la transazione sia minata
      
      // Ottieni il requestId (adatta questa parte in base a come il tuo contratto lo restituisce)
      // Esempio se la funzione ritorna direttamente il requestId:
      const receipt = await tx.wait();
      const event = receipt.logs.find(l => l.fragment?.name === "RequestSent");
      if (event) {
        const requestId = event.args.requestId;
        setRequestId(requestId);
        alert(`Richiesta inviata con successo! Request ID: ${requestId}`);
      } else {
        throw new Error("Evento RequestSent non trovato");
      }
    } catch (error) {
      console.error("Errore nel chiamare sendRequest:", error);
      alert(`Errore: ${error.message}`);
    }
  };
  const fetchMetadata = async () => {
    if (!contract || !tokenId) return;
    try {
      console.log("Fetching metadata for Token ID:", tokenId); // Debug
      const data = await contract.tokenURI(tokenId);
      setMetadata(data); // Salva i metadati nel state
      fetchImageCidFromMetadata(data); // Passa i metadati per estrarre il CID dell'immagine
    } catch (error) {
      console.error("Errore nel recupero dei metadati:", error);
    }
  };

  const fetchImageCidFromMetadata = async (metadataUrl) => {
    try {
      console.log("Fetching metadata JSON from URL:", metadataUrl); // Debug
      const response = await fetch(metadataUrl);
      const metadataJson = await response.json();
      console.log('Metadata JSON:', metadataJson); // Debug

      // Estrai il CID dell'immagine (assumendo che il campo "image" contenga un CID ipfs://)
      const ipfsCid = metadataJson.image.startsWith("ipfs://")
        ? metadataJson.image.slice(7) // Rimuovi "ipfs://"
        : metadataJson.image;

      // Salva il CID dell'immagine
      setImageCid(ipfsCid);
    } catch (error) {
      console.error("Errore nel recupero dell'immagine IPFS:", error);
    }
  };

  const mintNFT = async () => {
    if (!contract) return;
    try {
      const tx = await contract.mintNFT(await contract.signer.getAddress());
      await tx.wait();
      alert("NFT Mintato con successo!");
    } catch (error) {
      console.error("Errore nel minting:", error);
    }
  };

  const updateState = async () => {
    if (!contract || !tokenId) return;
    try {
      const tx = await contract.updateState(tokenId);
      await tx.wait();
      alert("Stato dell'NFT aggiornato con successo!");
      fetchMetadata(); // Ricarica i metadati aggiornati
    } catch (error) {
      console.error("Errore nell'aggiornamento dello stato:", error);
    }
  };

  const redirectToImage = () => {
    if (imageCid) {
      // Reindirizza all'immagine usando il gateway Pinata
      const gatewayUrl = `https://amaranth-worldwide-smelt-209.mypinata.cloud/ipfs/${imageCid}`;
      window.open(gatewayUrl, "_blank"); // Apre l'immagine nel gateway Pinata
    }
  };

  // Stile per i bottoni per mantenerli uguali
  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  return (
    <div className="container">
      <h3>Dynamic NFT Interface</h3>
      
      {/* Sezione esistente per gli NFT */}
      <div>
        <label>Token ID:</label>
        <input 
          type="text" 
          value={tokenId} 
          onChange={(e) => setTokenId(e.target.value)} 
        />
        <button onClick={fetchMetadata} style={buttonStyle}>Get Metadata</button>
      </div>

      <p>Metadata: {metadata}</p>

      <div>
        <label>Image CID (da token metadata):</label>
        <input 
          type="text" 
          value={imageCid} 
          onChange={(e) => setImageCid(e.target.value)} 
          placeholder="Inserisci CID immagine"
        />
        <button onClick={redirectToImage} style={buttonStyle}>View Image in Gateway</button>
      </div>

      <button onClick={mintNFT} style={buttonStyle}>Mint NFT</button>
      <button onClick={updateState} style={buttonStyle}>Update State</button>

      {/* Nuova sezione per sendRequest */}
      <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h3>Chainlink Functions Request</h3>
        
        <div>
          <label>Subscription ID:</label>
          <input
            type="text"
            value={subscriptionId}
            onChange={(e) => setSubscriptionId(e.target.value)}
            placeholder="Inserisci Subscription ID"
          />
        </div>
        
        <div>
          <label>Argomenti (separati da virgola):</label>
          <input
            type="text"
            value={requestArgs}
            onChange={(e) => setRequestArgs(e.target.value)}
            placeholder="arg1, arg2, arg3"
          />
        </div>
        
        <button onClick={callSendRequest} style={buttonStyle}>Invia Richiesta</button>
        
        {requestId && (
          <div>
            <p>Ultimo Request ID: {requestId}</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default App;


