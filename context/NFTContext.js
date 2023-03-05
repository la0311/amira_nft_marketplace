import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressABI } from './constants';

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;

const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'MATIC';

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return alert('Please install Metamask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No account found.');
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install Metamask');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file, setFileURL) => {
    const subdomain = 'https://amira.infura-ipfs.io';

    try {
      const added = await client.add({ content: file });

      const url = `${subdomain}/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading file to IPFS.', error);
    }
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}>
      {children}
    </NFTContext.Provider>
  );
};
