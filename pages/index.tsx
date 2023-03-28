import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
const inter = Inter({ subsets: ['latin'] })

import React from 'react';
import { Input, Button, notification, Result, Card } from 'antd';
import { ethers } from 'ethers'
import keccak256 from 'keccak256'
import { FrownOutlined } from '@ant-design/icons'

const { TextArea  } = Input;

const contractAddress = "0x6BcaC22E6Db0A34C160C53B49c35bEAD6cD4e7C6";
const abi = [{"inputs":[{"internalType":"bytes32","name":"_merkleRoot","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_proof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"leaf","type":"bytes32"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"verifyLeaf","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

let signer;
let contract;

if (typeof window !== 'undefined') {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(contract);
    });
  });
}

const openNotification = (check) => {
  if(check == true) {
    notification.open({
      message: <Result
      status="success"
      title="You have successfully proved your membership in an airdrop"
    />,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
  else {
    notification.open({
      message: <Result
      status="error"
      title="Unfortunately, this address does not belong to the airdrop or an error was made in the input data."
    />,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
 
};

function encodePackedKeccak256(value: string): string {
  const bytes = ethers.utils.arrayify(value);
  const hash = ethers.utils.keccak256(bytes);
  const hex = ethers.utils.hexlify(hash);
  return hex;
}

function parseHexArray(hexArrayString: string): string[] {
    const hexArray = JSON.parse(hexArrayString) as string[];
    return hexArray;
}

async function claimIn() {
  const proofs = (document.getElementById("proof2") as HTMLInputElement).value;
  var noErrors = true;
  try {
    await contract.claim(parseHexArray(proofs));
  }
  catch {
    noErrors = false;
  }
  finally {
    openNotification(noErrors);
  }

  
}

async function verifyLeafIn() {
  const leaf = (document.getElementById("address") as HTMLInputElement).value;
  let proof = (document.getElementById("proof") as HTMLInputElement).value;
  try {
  var leff = encodePackedKeccak256(leaf);
  var proofs = parseHexArray(proof);
  if(contract != null) {
    
      const verifLeaf = await contract.verifyLeaf(leff, proofs);
      openNotification(verifLeaf);
  }
}
catch {
  openNotification(false);
}
}


export default function Home() {
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",

    }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{display: 'flex',boxShadow: '10px 10px 20px #C4C4C4, -10px -10px 20px #FFFFFF', borderRadius: '20px', padding: "30px", height: "12%",alignItems: 'center',backgroundColor: '#F3F5F9', justifyContent: "space-between"}}>

<svg width="100" height="100" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
  <circle cx="75" cy="75" r="60" fill="#E0E5EC" filter="url(#neon)" />
  <circle cx="75" cy="75" r="50" fill="#F3F5F9" filter="url(#neon)" />
  <text x="50%" y="50%" fill="#3D3D3D" fontSize="40" fontFamily="Roboto, sans-serif" textAnchor="middle" dominantBaseline="middle">T</text>
  <text x="50%" y="62%" fill="#3D3D3D" fontSize="40" fontFamily="Roboto, sans-serif" textAnchor="middle" dominantBaseline="middle">D</text>
  <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
    <feOffset result="offOut" in="SourceGraphic" dx="5" dy="5" />
    <feColorMatrix result="matrixOut" in="offOut" type="matrix"
      values="0.85  0     0     0    0
              0     0.85  0     0    0
              0     0     0.85  0    0
              0     0     0     1    0" />
    <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
  </filter>
</svg>


      <ConnectButton />
      </div>
      <div className='container' style={{display: "flex", height: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
      <Card
      className='neomorphic-card'
      bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h3 style={{ marginBottom: '20px' }}>Verify leaf</h3>
      <Input
        placeholder='address'
        id='address'
        style={{ marginBottom: '20px' }}
      />
      <TextArea
        showCount
        id='proof'
        placeholder='proofs'
        style={{ marginBottom: '20px' }}
      />
      <Button type='primary' onClick={verifyLeafIn}>
        Submit
      </Button>
    </Card>
    <Card
      className='neomorphic-card'
      bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h3 style={{ marginBottom: '20px' }}>Claim</h3>
      <TextArea
        showCount
        id='proof2'
        placeholder='proofs'
        style={{ marginBottom: '20px' }}
      />
      <Button type='primary' onClick={claimIn}>
        Submit
      </Button>
    </Card>
      </div>

    
      
    </div>
  );
}
